import styles from "./FriendList.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function FriendList({ friends }) {
  return (
    <div className={cx("contactList")}>
      {friends.map((item, index) => {
        const { id, username, fullname, avatar } = item;
        return (
          <div className={cx("friendItem")} key={index}>
            <div className={cx("friendAvatar")}>
              <div className={cx("AvatarContainer")}>
                <img src={avatar} alt="" className={cx("friendImg")} />
                <div className={cx("friendStatus", "online")}>
                  <i className="fa-solid fa-circle"></i>
                </div>
              </div>
            </div>
            <div className={cx("friendInfo")}>
              <div className={cx("friendName")}>{fullname}</div>
              <div className={cx("friendUsername")}>{username}</div>
            </div>
            <div className={cx("friendAdd")}>
              <i className="fas fa-user-plus"></i>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FriendList;
