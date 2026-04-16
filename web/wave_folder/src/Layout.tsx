import { useEnumParam, useNumericParam } from "@conformal/plugin"

const FOLD_INCREMENT = 0.01;

const Layout = () => {
  const {
    value: foldGain,
    info: {
      valid_range: [foldGainMin, foldGainMax],
    },
    set: setFoldGain,
  } = useNumericParam("fold_gain")

  const {
    value: foldType,
    info: {
      values: foldTypeOptions,
    },
    set: setFoldType,
  } = useEnumParam("fold_type")

  return (
    <div>
      <h1>WAVE HELLO</h1>
      <p>Fold: {foldGain}</p>
      <p>
        <span
          onClick={() => {
            setFoldGain(Math.max(foldGainMin, foldGain - FOLD_INCREMENT))
          }}
        >
          -
        </span>
        <span
          onClick={() => {
            setFoldGain(Math.min(foldGainMax, foldGain + FOLD_INCREMENT))
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
    </div>
  )
}

export default Layout
