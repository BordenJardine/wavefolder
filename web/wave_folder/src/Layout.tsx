import { useEnumParam, useNumericParam } from "@conformal/plugin"
import Visualizer from './visualizer/Visualizer'

const FOLD_INCREMENT = 0.01;

const Layout = () => {
  const {
    value: foldAmount,
    info: {
      valid_range: [foldAmountMin, foldAmountMax],
    },
    set: setFoldAmount,
  } = useNumericParam("fold_amount")

  const {
    value: foldType,
    info: {
      values: foldTypeOptions,
    },
    set: setFoldType,
  } = useEnumParam("fold_type")

  return (
    <div>
      <p>Fold: {foldAmount}</p>
      <p>
        <span
          onClick={() => {
            setFoldAmount(Math.max(foldAmountMin, foldAmount - FOLD_INCREMENT))
          }}
        >
          -
        </span>
        <span
          onClick={() => {
            setFoldAmount(Math.min(foldAmountMax, foldAmount + FOLD_INCREMENT))
          }}
        >
          +
        </span>
      </p>
      <p>Type: {foldType}</p>
      <p>
      {
        foldTypeOptions.map(opt => {
          return <input
            type="radio"
            id={opt}
            name="modOptions" // Same name for all in the group
            value={opt}
            checked={foldType === opt}
            onChange={() => setFoldType(opt)}
          />
        })
      }
      </p>
      <Visualizer />
    </div>
  )
}

export default Layout
