import styles from "./Button.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Button({ className, children, ...props }) {
  let Component = "button";
  const classes = cx("wrapper", {
    [className]: className,
  });
  if (props.to) {
    Component = Link;
  } else if (props.href) {
    Component = "a";
  }
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export default Button;
