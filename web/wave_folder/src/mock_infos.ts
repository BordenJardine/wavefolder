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
      title: "FoldAmount",
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
      title: "FoldGain",
      type_specific: {
        t: "numeric",
        default: -0.5,
        valid_range: [-1.0, -0.0],
        units: "None",
      },
    },
    feedback: {
      title: "Feedback",
      type_specific: {
        t: "numeric",
        default: 0.0,
        valid_range: [0.0, 0.9],
        units: "None",
      },
    },
  }),
)

export default infos
