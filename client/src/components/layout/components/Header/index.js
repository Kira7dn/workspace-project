import Logo from "~/assets/img/svg/logo.svg";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Button to="/" className={cx("logo")}>
          <img src={Logo} alt="WorkSpace" />
        </Button>
        <div className={cx("action")}>
          <Button className={cx("action-item")} to="/user-info">
            <i className="fa-solid fa-user"></i>
          </Button>
          <Button className={cx("action-item")} to="/">
            <i className="fas fa-bell" />
          </Button>
          <Button className={cx("action-item")} to="/">
            <i className="fa-solid fa-gear"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
