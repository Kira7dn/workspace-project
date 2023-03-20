import { Slider } from "@mui/material";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ progress, onUpdate, onChange }) => {
  const marks = [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ];
  function valuetext(value) {
    return `${value}%`;
  }
  return (
    <div className={styles.projectProgressContainer}>
      <h5>Progress</h5>
      <Slider
        aria-label="Always visible"
        value={progress}
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        step={25}
        marks={marks}
        valueLabelDisplay="auto"
        className={styles.projectProgressBar}
        name="progress"
        onChange={onChange}
        onChangeCommitted={onUpdate}
      />
    </div>
  );
};

export default ProgressBar;
