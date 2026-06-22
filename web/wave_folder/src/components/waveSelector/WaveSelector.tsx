import {  useEnumParam } from "@conformal/plugin"

import Slider from '../slider/Slider.tsx'
import SineIcon from './SineIcon.tsx'
import TriIcon from './TriIcon.tsx'
import styles from './WaveSelector.module.css'

const WaveSelector = () => {
  const {
    value: foldType,
    info: {
      values: foldTypeOptions,
    },
    set: setFoldType,
  } = useEnumParam("fold_type")

  const val = foldTypeOptions.indexOf(foldType)

  const setVal = (x: number) => {
    setFoldType(foldTypeOptions[x] ?? 'sin')
  }

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <SineIcon active={val == 0} />
      </div>
      <Slider
        label="feedback"
        min={0}
        max={1}
        value={val}
        setValue={setVal}
        step={1}
        vert={false}
        size={'s'}
        showLegend={false}
      />
      <div className={styles.iconContainer}>
        <TriIcon active={val == 1} />
      </div>
    </div>
  )

}

export default WaveSelector
