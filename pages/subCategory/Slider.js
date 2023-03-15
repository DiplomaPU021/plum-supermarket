import styles from "../../styles/subCategory.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useLayoutEffect, useState } from "react";

export default function Slider() {
  var thumbsize = 14;
  const Slider = ({ min, max }) => {
    const [avg, setAvg] = useState((min + max) / 2);
    const [minVal, setMinVal] = useState(avg);
    const [maxVal, setMaxVal] = useState(avg);

    const width = 300;
    const minWidth =
      thumbsize + ((avg - min) / (max - min)) * (width - 2 * thumbsize);
    const minPercent = ((minVal - min) / (avg - min)) * 100;
    const maxPercent = ((maxVal - avg) / (max - avg)) * 100;
    const styles = {
      min: {
        width: minWidth,
        left: 0,
        "--minRangePercent": `${minPercent}%`,
      },
      max: {
        width:
          thumbsize + ((max - avg) / (max - min)) * (width - 2 * thumbsize),
        left: minWidth,
        "--maxRangePercent": `${maxPercent}%`,
      },
    };

    useLayoutEffect(() => {
      setAvg((maxVal + minVal) / 2);
    }, [minVal, maxVal]);

    return (
      <div
        className={styles.min_max_slider}
        data-legendnum="2"
        data-rangemin={min}
        data-rangemax={max}
        data-thumbsize={thumbsize}
        data-rangewidth={width}
      >
        <label htmlFor="min">Minimum price</label>
        <input
          id="min"
          className="min"
          style={styles.min}
          name="min"
          type="range"
          step="1"
          min={min}
          max={avg}
          value={minVal}
          onChange={({ target }) => setMinVal(Number(target.value))}
        />
        <label htmlFor="max">Maximum price</label>
        <input
          id="max"
          className="max"
          style={styles.max}
          name="max"
          type="range"
          step="1"
          min={avg}
          max={max}
          value={maxVal}
          onChange={({ target }) => setMaxVal(Number(target.value))}
        />
      </div>
    );
  };

  return (
    <div style={{border: "2px solid red"}}>
      <Slider min={300} max={3000} />
    </div>
  );
}
