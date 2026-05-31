mod folder;

use conformal_component::audio::{Buffer, BufferMut, channels, channels_mut};
use conformal_component::effect::{Effect as EffectTrait, HandleParametersContext, ProcessContext};
use conformal_component::parameters::{self, Flags, InfoRef, TypeSpecificInfoRef};
use conformal_component::pzip;
use conformal_component::{Component as ComponentTrait, ProcessingEnvironment, Processor};

use folder::Folder;

const PARAMETERS: [InfoRef<'static, &'static str>; 6] = [
    InfoRef {
        title: "Bypass",
        short_title: "Bypass",
        unique_id: "bypass",
        flags: Flags { automatable: true },
        type_specific: TypeSpecificInfoRef::Switch { default: false },
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
        title: "FoldGain",
        short_title: "FoldGain",
        unique_id: "fold_gain",
        flags: Flags { automatable: true },
        type_specific: TypeSpecificInfoRef::Numeric {
            default: 0.5,
            valid_range: 0.0f32..=1.0,
            units: Some("Db"),
        },
    },
    InfoRef {
        title: "SaturateGain",
        short_title: "SaturateGain",
        unique_id: "saturate_gain",
        flags: Flags { automatable: true },
        type_specific: TypeSpecificInfoRef::Numeric {
            default: 0.5,
            valid_range: 0.0f32..=1.0,
            units:  Some("Db"),
        },
    },
    InfoRef {
        title: "FeedbackGain",
        short_title: "FeedbackGain",
        unique_id: "feedback_gain",
        flags: Flags { automatable: true },
        type_specific: TypeSpecificInfoRef::Numeric {
            default: 0.0,
            valid_range: 0.0f32..=0.9,
            units: Some("Db"),
        },
    },
];

#[derive(Clone, Debug, Default)]
pub struct Component {}

#[derive(Clone, Debug)]
pub struct Effect {
    sampling_rate: f32,
    folders: Vec<Folder>,
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
        for ((input_channel, output_channel), folder) in channels(input).zip(channels_mut(output)).zip(self.folders.iter_mut()) {
            for (
                (input_sample, output_sample),
                (bypass, fold_type, fold_amount, fold_gain, saturate_gain, feedback_gain)
            ) in input_channel
                .iter()
                .zip(output_channel.iter_mut())
                .zip(pzip!(parameters[
                    switch "bypass",
                    enum "fold_type",
                    numeric "fold_amount",
                    numeric "fold_gain",
                    numeric "saturate_gain",
                    numeric "feedback_gain"
                ]))
            {
                *output_sample = if bypass {
                    *input_sample
                } else {
                    folder.fold(
                        self.sampling_rate,
                        *input_sample,
                        fold_type,
                        fold_amount,
                        fold_gain,
                        saturate_gain,
                        feedback_gain,
                    )
                }
            }
        }
    }
}

impl ComponentTrait for Component {
    type Processor = Effect;

    fn parameter_infos(&self) -> Vec<parameters::Info> {
        parameters::to_infos(&PARAMETERS)
    }

    fn create_processor(&self, env: &ProcessingEnvironment) -> Self::Processor {
        let num_channels = env.channel_layout.num_channels();
        Effect {
            sampling_rate: env.sampling_rate,
            folders: vec![Folder::default(); num_channels],
        }
    }
}
