import { useNumericParam } from '@conformal/plugin'
import classNames from 'classnames'

import WaveSelector from '../waveSelector/WaveSelector.tsx'
import Knob from '../knob/Knob.tsx'
import Mixer from '../mixer/Mixer.tsx'
import styles from './ControlPanel.module.css'

const ControlPanel = () => {
  const {
    value: foldAmount,
    info: {
      valid_range: [foldAmountMin, foldAmountMax],
    },
    set: setFoldAmount,
  } = useNumericParam("fold_amount")

  return (
    <section className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.controlSection}>
          <WaveSelector />
        </div>
        <div className={classNames(styles.bigKnob, styles.controlSection)}>
          { /* FOLD */ }
          <Knob
            label="折"
            min={foldAmountMin}
            max={foldAmountMax}
            value={foldAmount}
            setValue={setFoldAmount}
            color="red"
            size="l"
          />
        </div>
        <div>
          <Mixer />
        </div>
    </div>
  </section>
  )

}

export default ControlPanel
