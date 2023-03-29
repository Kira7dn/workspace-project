import styles from "./SideBar.module.scss";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import WorkSpaces from "./component/WorkSpaces";

const cx = classNames.bind(styles);
const MENU_ITEMS = [
  {
    icon: <i className="fas fa-home" />,
    name: "Home",
    to: "/",
  },
  {
    icon: <i className="fas fa-envelope" />,
    name: "Messages",
    to: "/",
  },
  {
    icon: <i className="fa-solid fa-list-check"></i>,
    name: "Task",
    to: "/",
  },
  {
    icon: <i className="fas fa-ellipsis-h" />,
    name: "More",
    to: "/",
  },
];

function NavbarMenu() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("sidebar")}>
          {MENU_ITEMS.map((item, index) => {
            return (
              <Button className={cx("menuItem")} to={item.to} key={index}>
                {item.icon}
                <div className={cx("menuTitle")}>{item.name}</div>
              </Button>
            );
          })}
        </div>
        <div className={cx("work-space")}>
          <WorkSpaces />
        </div>
      </div>
    </div>
  );
}

export default NavbarMenu;
