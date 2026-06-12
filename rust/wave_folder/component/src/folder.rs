const SIN_TYPE: u32 = 0;

#[derive(Clone, Debug, Default)]
pub(crate) struct Folder {
    prev_output: f32,
    prev_fold_input: f32,
    buffered_fold: f32,
}

impl Folder {
    pub(crate) fn fold(
        &mut self,
        sampling_rate: f32,
        sample: f32,
        fold_type: u32, // sin/tri wave folding
        fold_amount: f32,
        fold_gain: f32,
        saturate_gain: f32,
        feedback_gain: f32,
        anti_alias: bool,
    ) -> f32 {
        let fold_input = sample * fold_amount;
        let freq = sampling_rate / 2.5;

        let naive_fold = if fold_type == SIN_TYPE {
            sine_wave(fold_input, freq, sampling_rate)
        } else {
            triangle_wave(fold_input, freq, sampling_rate)
        };

        // When anti-aliasing is enabled for the triangle folder, the fold component
        // is buffered by 1 sample so PolyBLAMP can correct the previous sample
        // retroactively when a crossing is detected.
        let fold_output = if anti_alias && fold_type != SIN_TYPE {
            let mut current_fold = naive_fold;
            let p = sampling_rate / freq; // period in samples
            self.apply_polyblamp(fold_input, p, &mut current_fold);
            let emit = self.buffered_fold;
            self.buffered_fold = current_fold;
            self.prev_fold_input = fold_input;
            emit
        } else {
            self.prev_fold_input = fold_input;
            naive_fold
        };

        let mut result = 0.0f32;

        if fold_gain > 0. {
            result += -fold_gain * fold_output;
        }

        if saturate_gain > 0. {
            result += saturate_gain * sample.tanh();
        }

        if feedback_gain > 0. {
            result += feedback_gain * self.prev_output.tanh();
        }

        self.prev_output = result;

        result
    }

    fn apply_polyblamp(
        &mut self,
        fold_input: f32,
        p: f32,
        current_fold: &mut f32,
    ) {
        let dx = fold_input - self.prev_fold_input;
        if dx.abs() < f32::EPSILON {
            return;
        }

        let half_p = p / 2.0;
        let quarter_p = p / 4.0;
        let abs_dx = dx.abs();

        // Triangle derivative discontinuities (peaks/troughs) occur at
        // x = k * (p/2) - p/4 for all integers k.
        let (lo, hi) = if dx > 0.0 {
            (self.prev_fold_input, fold_input)
        } else {
            (fold_input, self.prev_fold_input)
        };

        #[allow(clippy::cast_possible_truncation)] // fold input is bounded, k values are small
        let k_start = ((lo + quarter_p) / half_p).ceil() as i32;
        #[allow(clippy::cast_possible_truncation)]
        let k_end = ((hi + quarter_p) / half_p).floor() as i32;

        for k in k_start..=k_end {
            #[allow(clippy::cast_precision_loss)] // k is a small integer
            let threshold = (k as f32) * half_p - quarter_p;
            let d = (threshold - self.prev_fold_input) / dx;

            if d <= 0.0 || d >= 1.0 {
                continue;
            }

            // Slope change of the triangle function at each discontinuity:
            //   even k (trough): slope goes from -4/p to +4/p → Δf' = +8/p
            //   odd k  (peak):   slope goes from +4/p to -4/p → Δf' = -8/p
            let delta_f_prime = if k & 1 == 0 { 8.0 / p } else { -8.0 / p };

            // Scale by |dx| to get the slope change of the output signal (per sample).
            let scaled = delta_f_prime * abs_dx;

            // PolyBLAMP residual: correction to the two samples straddling the crossing.
            //   previous sample (buffered): scaled * (1-d)³ / 6
            //   current sample:             scaled * d³ / 6
            self.buffered_fold += scaled * (1.0 - d).powi(3) / 6.0;
            *current_fold += scaled * d.powi(3) / 6.0;
        }
    }
}

fn sine_wave(x: f32, freq: f32, sampling_rate: f32) -> f32 {
    (2. * std::f32::consts::PI * x * freq / sampling_rate).sin()
}

fn triangle_wave(x: f32, freq: f32, sampling_rate: f32) -> f32 {
    let p = (1. / freq) * sampling_rate;
    let x2 = x + p / 4.;
    4. * ((x2 / p) - ((x2 / p) + 0.5).floor()).abs() - 1.
}
