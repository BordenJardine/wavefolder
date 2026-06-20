import Knob from '../knob/Knob.tsx';
import styles from './ControlPanel.module.css'

const ControlPanel = () => {

return (
  <section className={styles.parent}>
    <div className={styles.container}>
      <Knob />
    </div>
  </section>
)

}

export default ControlPanel
