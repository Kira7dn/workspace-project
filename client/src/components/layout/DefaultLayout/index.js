import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Header from "~/components/layout/components/Header";
import Sidebar from "~/components/layout/components/SideBar";
import ChatBox from "~/components/layout/components/Chatbox";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("left-content")}>
          <Sidebar />
        </div>
        <div className={cx("content")}>{children}</div>
        <div className={cx("right-content")}>
          <ChatBox />
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
