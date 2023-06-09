import classNames from "classnames/bind";
import styles from "./Spinner.module.scss";

const cx = classNames.bind(styles);

function Spinner() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}></div>
    </div>
  );
}

export default Spinner;
