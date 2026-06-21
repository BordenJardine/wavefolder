import { useEnumParam, useNumericParam } from "@conformal/plugin"

import Knob from '../knob/Knob.tsx';
import styles from './ControlPanel.module.css'

const ControlPanel = () => {
  const {
    value: foldAmount,
    info: {
      valid_range: [foldAmountMin, foldAmountMax],
    },
    set: setFoldAmount,
  } = useNumericParam("fold_amount")

  const {
    value: foldGain,
    info: {
      valid_range: [foldGainMin, foldGainMax],
    },
    set: setFoldGain,
  } = useNumericParam("fold_gain")

  const {
    value: saturateGain,
    info: {
      valid_range: [saturateGainMin, saturateGainMax],
    },
    set: setSaturateGain,
  } = useNumericParam("saturate_gain")

  const {
    value: feedbackGain,
    info: {
      valid_range: [feedbackGainMin, feedbackGainMax],
    },
    set: setFeedbackGain,
  } = useNumericParam("feedback_gain")

//  const {
//    value: foldType,
//    info: {
//      values: foldTypeOptions,
//    },
//    set: setFoldType,
//  } = useEnumParam("fold_type")

return (
  <section className={styles.parent}>
    <div className={styles.container}>
      <div>
        <Knob
          label="fold"
          min={foldGainMin}
          max={foldGainMax}
          value={foldGain}
          setValue={setFoldGain}
          showArc={false}
          size="s"
        />
      </div>
      <Knob
        label="Fold"
        min={foldAmountMin}
        max={foldAmountMax}
        value={foldAmount}
        setValue={setFoldAmount}
        size="l"
      />
      <div className={styles.mixer}>
        <Knob
          label="fold"
          min={foldGainMin}
          max={foldGainMax}
          value={foldGain}
          setValue={setFoldGain}
          showArc={false}
          size="m"
        />
        <Knob
          label="Saturate"
          min={saturateGainMin}
          max={saturateGainMax}
          value={saturateGain}
          setValue={setSaturateGain}
          color="red"
          showArc={false}
          size="m"
        />
        <Knob
          label="feedback"
          min={feedbackGainMin}
          max={feedbackGainMax}
          value={feedbackGain}
          setValue={setFeedbackGain}
          showArc={false}
          size="m"
        />
      </div>
    </div>
  </section>
)

}

export default ControlPanel
