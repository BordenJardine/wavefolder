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
    fold_type: {
      title: "FoldType",
      type_specific: {
        t: "enum",
        default: "sin",
        values: ["sin", "tri"],
      },
    },
    fold_amount: {
      title: "FoldAmount",
      type_specific: {
        t: "numeric",
        default: 1.0,
        valid_range: [0.5, 10.0],
        units: "None",
      },
    },
    fold_gain: {
      title: "FoldGain",
      type_specific: {
        t: "numeric",
        default: 1.0,
        valid_range: [0.0, 1.0],
        units: "Db",
      },
    },
    anti_alias: {
      title: "AntiAlias",
      type_specific: {
        t: "switch",
        default: true,
      },
    },
    saturate_gain: {
      title: "SaturateGain",
      type_specific: {
        t: "numeric",
        default: 0.0,
        valid_range: [0.0, 1.0],
        units: "Db",
      },
    },
    feedback_gain: {
      title: "FeedbackGain",
      type_specific: {
        t: "numeric",
        default: 0.0,
        valid_range: [0.0, 0.9],
        units: "Db",
      },
    },
  }),
)

export default infos
