import styles from "./SideBar.module.scss";
import classNames from "classnames/bind";
import Button from "~/components/Button";

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
    icon: <i className="fa-solid fa-house-laptop" />,
    name: "Work Spaces",
    to: "/work-space",
  },
  {
    icon: <i className="fa-solid fa-list-check"></i>,
    name: "Task",
    to: "/",
  },
  {
    icon: <i className="fa-solid fa-user-group" />,
    name: "Friend",
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
        {MENU_ITEMS.map((item, index) => {
          return (
            <Button className={cx("menuItem")} to={item.to} key={index}>
              {item.icon}
              <div className={cx("menuTitle")}>{item.name}</div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default NavbarMenu;
