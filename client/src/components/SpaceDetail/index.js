import { useQuery } from "@apollo/client";
import { GET_SPACE } from "~/api/queries";
import Spinner from "~/components/Spinner";
import styles from "./SpaceDetail.module.scss";
import classNames from "classnames/bind";
import TippyAction from "./component/TippyAction";

const cx = classNames.bind(styles);
function SpaceDetail({ spaceId }) {
  const { data, loading } = useQuery(GET_SPACE, {
    variables: {
      spaceId: spaceId,
    },
  });
  if (loading) return <Spinner />;
  const { id, title, description, image, members, user } = data.space;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("avatar-container")}>
          <img src={user.avatar} alt="avatar"></img>
        </div>
        <div className={cx("space-container")}>
          <div className={cx("space-header-container")}>
            <div className={cx("space-header")}>
              <div className={cx("user-info")}>
                <div className={cx("fullname")}>
                  {user.fullname}
                  <div className={cx("username-icon")}>
                    <img src={user.icon} alt="user icon"></img>
                  </div>
                </div>
                <div className={cx("username")}>@{user.username}</div>
              </div>
              <TippyAction id={id}>
                <div className={cx("space-action")}>
                  <i className="fa-solid fa-ellipsis"></i>
                </div>
              </TippyAction>
            </div>
            <div className={cx("space-title")}>
              <span>{title}</span>
            </div>
          </div>
          <div className={cx("space-content")}>{description}</div>
          <div className={cx("space-media")}>
            {image && <img src={image} alt="space media" />}
          </div>
          <div className={cx("space-footer")}>
            <div className={cx("space-members")}>
              <div className={cx("members-title")}>
                <span>{`Members(${members.length}):`}</span>
              </div>
              <div className={cx("team-list")}>
                {members.map((member) => {
                  return (
                    <span key={member.id} className={cx("member-info")}>
                      <img
                        src={member.avatar}
                        className={cx("member-avatar")}
                        alt=""
                      />
                      <div className={cx("member-name")}>{member.fullname}</div>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpaceDetail;
