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
    fold: {
      title: "FoldGain",
      type_specific: {
        t: "numeric",
        default: 0.5,
        valid_range: [0.5, 10.0],
        units: "None",
      },
    },
    modulator: {
      title: "FoldType",
      type_specific: {
        t: "enum",
        default: "sin",
        values: ["sin", "tri"],
      },
    },
  }),
)

export default infos
