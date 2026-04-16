import { Info } from "@conformal/plugin"

const infos = new Map<string, Info>(
  Object.entries({
    bypass: {
      title: "Bypass",
      type_specific: {
        t: "switch",
        default: false,
      },
    },
    fold_gain: {
      title: "FoldGain",
      type_specific: {
        t: "numeric",
        default: 1.0,
        valid_range: [0.5, 10.0],
        units: "None",
      },
    },
    fold_type: {
      title: "FoldType",
      type_specific: {
        t: "enum",
        default: "sin",
        values: ["sin", "tri"],
      },
    },
    saturate: {
      title: "Saturate",
      type_specific: {
        t: "switch",
        default: false,
      },
    },
    saturate_gain: {
      title: "SaturatorGain",
      type_specific: {
        t: "numeric",
        default: -0.2,
        valid_range: [-0.5, -0.1],
        units: "None",
      },
    }
  }),
)

export default infos
