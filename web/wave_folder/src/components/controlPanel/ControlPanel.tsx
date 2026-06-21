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
      <Knob
        label="Fold"
        min={foldAmountMin}
        max={foldAmountMax}
        value={foldAmount}
        setValue={setFoldAmount}
        size="l"
      />
    </div>
  </section>
)

}

export default ControlPanel
