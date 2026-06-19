import Knob from '../knob/Knob.tsx';
import { useEnumParam, useNumericParam } from "@conformal/plugin"
import styles from './ControlPanel.module.css'


const ControlPanel = () => {

return (
  <section className={styles.container}>
    <Knob />
  </section>
)

}

export default ControlPanel
