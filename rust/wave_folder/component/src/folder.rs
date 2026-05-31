const SIN_TYPE: u32 = 0;

#[derive(Clone, Debug, Default)]
pub(crate) struct Folder {
    prev_output: f32,
}

impl Folder {
    pub(crate) fn fold(
        &mut self,
        sampling_rate: f32,
        sample: f32,
        fold_type: u32,
        fold_amount: f32,
        fold_gain: f32,
        saturate_gain: f32,
        feedback_gain: f32,
    ) -> f32 {
        let fold_wave = if fold_type == SIN_TYPE { sine_wave } else { triangle_wave };

        let mut result = 0.0f32;

        if fold_gain > 0. {
            result = result + (-fold_gain * fold_wave(sample * fold_amount, sampling_rate / 2.5, sampling_rate));
        }

        if saturate_gain > 0. {
            result = result + (saturate_gain * sample.tanh());
        }

        if feedback_gain > 0. {
            result = result + (feedback_gain * self.prev_output.tanh());
        }

        self.prev_output = result;

        result
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
