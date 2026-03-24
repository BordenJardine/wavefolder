use wave_folder_component::Component;

use conformal_vst_wrapper::{ClassID, ClassInfoBuilder, EffectClass, HostInfo, Info};

const CID: ClassID = [
    0xd7, 0x84, 0x48, 0xe1, 0xa4, 0x2a, 0x40, 0xdc, 0x8d, 0xa7, 0x3d, 0x8d, 0x24, 0x0f, 0x36, 0x4a,
];
const EDIT_CONTROLLER_CID: ClassID = [
    0x7c, 0x66, 0x36, 0x76, 0x0a, 0xd8, 0x42, 0x77, 0x85, 0x18, 0x19, 0x09, 0x71, 0xc0, 0x33, 0x4c,
];

conformal_vst_wrapper::wrap_factory!(
    &const {
        [&EffectClass {
            info: ClassInfoBuilder::new(
                "Wavefolder",
                CID,
                EDIT_CONTROLLER_CID,
                conformal_vst_wrapper::UiSize {
                    width: 400,
                    height: 400,
                },
            )
            .build(),
            factory: |_: &HostInfo| -> Component { Default::default() },
            category: "Fx",
            bypass_id: "bypass",
        }]
    },
    Info {
        vendor: "borden",
        url: "TODO add URL",
        email: "test@example.com",
        version: "1.0.0",
    }
);
