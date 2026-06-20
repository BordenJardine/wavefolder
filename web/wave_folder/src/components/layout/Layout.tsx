import ControlPanel from '../controlPanel/ControlPanel'
import Visualizer from '../visualizer/Visualizer'
import styles from './Layout.module.css'

const Layout = () => {

  return (
    <div className={styles.layout}>
      <Visualizer />
      <ControlPanel />
    </div>
  )
}

export default Layout
