import classNames from "classnames/bind";
import styles from "./SpaceItem.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function SpaceItem({ space }) {
  const { id, image, members, title } = space;
  return (
    <Link to={`/work-space/${id}`}>
      <div className={cx("wrapper")}>
        <div className={cx("inner")}>
          <div className={cx("space-title")}>{title}</div>
          <div className={cx("space-image")}>
            <img src={image} alt="space" />
          </div>

          <div className={cx("team-list")}>
            {members.map((member) => {
              return (
                <img
                  key={member.id}
                  src={member.avatar}
                  className={cx("team-icon")}
                  alt=""
                />
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SpaceItem;
