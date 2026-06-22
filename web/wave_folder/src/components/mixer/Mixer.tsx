import {  useNumericParam } from "@conformal/plugin"
import Slider from '../slider/Slider.tsx'
import classNames from 'classnames'
import styles from './Mixer.module.css'

const Mixer = () => {
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

  return (
      <section className={styles.mixer}>
        <div className={styles.sliderContainer}>
          <label className={classNames(styles.sliderLabel, styles.a)}>
            fold
          </label>
          <Slider
            label="fold"
            min={foldGainMin}
            max={foldGainMax}
            value={foldGain}
            setValue={setFoldGain}
          />
        </div>
        <div className={styles.sliderContainer}>
          <label className={classNames(styles.sliderLabel, styles.b)}>
            sat
          </label>
          <Slider
            label="saturate"
            min={saturateGainMin}
            max={saturateGainMax}
            value={saturateGain}
            setValue={setSaturateGain}
          />
        </div>
        <div className={styles.sliderContainer}>
          <label className={classNames(styles.sliderLabel, styles.c)}>
            fb
          </label>
          <Slider
            label="feedback"
            min={feedbackGainMin}
            max={feedbackGainMax}
            value={feedbackGain}
            setValue={setFeedbackGain}
          />
        </div>
      </section>
  )
}

export default Mixer
