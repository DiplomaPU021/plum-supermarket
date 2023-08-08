import styles from "./style.module.scss";
import { useState, useEffect } from "react";

export default function RangeSlider({
  min,
  max,
  value,
  step,
  onChange,
  setPriceChecked,
}) {
  const [minValue, setMinValue] = useState(value ? value.min : min);
  const [maxValue, setMaxValue] = useState(value ? value.max : max);

  useEffect(() => {
    if (value) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value]);

  const handleMinChange = (e) => {
    e.preventDefault();
    const newMinVal = Math.min(+e.target.value, maxValue - step);
    if (!value) setMinValue(newMinVal);
    onChange({ min: newMinVal, max: maxValue });
    setPriceChecked(false);
  };

  const handleMaxChange = (e) => {
    e.preventDefault();
    const newMaxVal = Math.max(+e.target.value, minValue + step);
    if (!value) setMaxValue(newMaxVal);
    onChange({ min: minValue, max: newMaxVal });
    setPriceChecked(false);
  };
  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={styles.wrapper}>
      <div className={styles.input_wrapper}>
        <input
          className={styles.input}
          type="range"
          value={minValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
        />
        <input
          className={styles.input}
          type="range"
          value={maxValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
        />
      </div>

      <div className={styles.contorl_wrapper}>
        <div className={styles.contorl} style={{ left: `${minPos}%` }} />
        <div className={styles.rail}>
          <div
            className={styles.inner_rail}
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </div>
        <div className={styles.contorl} style={{ left: `${maxPos}%` }} />
      </div>
    </div>
  );
}
