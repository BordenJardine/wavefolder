use conformal_component::audio::{Buffer, BufferMut, channels, channels_mut};
use conformal_component::effect::{Effect as EffectTrait, HandleParametersContext, ProcessContext};
use conformal_component::parameters::{self, Flags, InfoRef, TypeSpecificInfoRef};
use conformal_component::pzip;
use conformal_component::{Component as ComponentTrait, ProcessingEnvironment, Processor};

const SIN_TYPE: u32 = 0;
#[allow(unused)]
const TRI_TYPE: u32 = 1;

const PARAMETERS: [InfoRef<'static, &'static str>; 6] = [
    InfoRef {
        title: "Bypass",
        short_title: "Bypass",
        unique_id: "bypass",
        flags: Flags { automatable: true },
        type_specific: TypeSpecificInfoRef::Switch { default: false },
    },
    InfoRef {
        title: "FoldAmount",
        short_title: "FoldAmount",
        unique_id: "fold_amount",
        flags: Flags { automatable: true },
        type_specific: TypeSpecificInfoRef::Numeric {
            default: 1.0,
            valid_range: 0.5f32..=10.,
            units: None,
        },
    },
    InfoRef {
        title: "FoldType",
        short_title: "FoldType",
        unique_id: "fold_type",
        flags: Flags { automatable: true },
        type_specific: TypeSpecificInfoRef::Enum {
            default: 0,
            values: &["sin", "tri"]
        },
    },
    InfoRef {
        title: "Saturate",
        short_title: "Saturate",
        unique_id: "saturate",
        flags: Flags { automatable: true },
        type_specific: TypeSpecificInfoRef::Switch { default: false },
    },
    InfoRef {
        title: "FoldGain",
        short_title: "FoldGain",
        unique_id: "fold_gain",
        flags: Flags { automatable: true },
        type_specific: TypeSpecificInfoRef::Numeric {
            default: -0.5,
            valid_range: -1.0f32..=-0.0,
            units: Some("dB"),
        },
    },
    InfoRef {
        title: "Feedback",
        short_title: "Feedback",
        unique_id: "feedback",
        flags: Flags { automatable: true },
        type_specific: TypeSpecificInfoRef::Numeric {
            default: 0.0,
            valid_range: 0.0f32..=0.9,
            units: None,
        },
    },
];

#[derive(Clone, Debug, Default)]
pub struct Component {}

#[derive(Clone, Debug, Default)]
pub struct Effect {
    sampling_rate: f32,
    prev_output: f32
}

impl Processor for Effect {
    fn set_processing(&mut self, _processing: bool) {}
}

impl EffectTrait for Effect {
    fn handle_parameters(&mut self, _context: &impl HandleParametersContext) {}
    fn process(
        &mut self,
        context: &impl ProcessContext,
        input: &impl Buffer,
        output: &mut impl BufferMut,
    ) {
        let parameters = context.parameters();
        for (input_channel, output_channel) in channels(input).zip(channels_mut(output)) {
            for (
                (input_sample, output_sample),
                (fold_amount, bypass, fold_type, saturate, fold_gain, feedback)
            ) in input_channel
                .iter()
                .zip(output_channel.iter_mut())
                .zip(pzip!(parameters[
                    numeric "fold_amount",
                    switch "bypass",
                    enum "fold_type",
                    switch "saturate",
                    numeric "fold_gain",
                    numeric "feedback"
                ]))
            {
                *output_sample = if bypass {
                    *input_sample
                } else {
                    self.fold(
                        *input_sample,
                        fold_amount,
                        fold_type,
                        saturate,
                        fold_gain,
                        self.sampling_rate,
                        feedback
                    )
                }
            }
        }
    }
}

impl Effect {
    fn fold(
        &mut self,
        sample: f32,
        fold_amount: f32,
        fold_type: u32,
        saturate: bool,
        fold_gain: f32,
        sampling_rate: f32,
        feedback: f32
    ) -> f32 {
        let fold_wave = if fold_type == SIN_TYPE { sine_wave } else { triangle_wave };

        let mut result = fold_gain * fold_wave(sample * fold_amount,  sampling_rate / 2.5, sampling_rate);

        if saturate {
            result = result + sample.tanh()
        };

        result = result + (feedback * self.prev_output.tanh());

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

impl ComponentTrait for Component {
    type Processor = Effect;

    fn parameter_infos(&self) -> Vec<parameters::Info> {
        parameters::to_infos(&PARAMETERS)
    }

    fn create_processor(&self, env: &ProcessingEnvironment) -> Self::Processor {
        Effect {
            sampling_rate: env.sampling_rate,
            prev_output: 0.
        }
    }
}
