import classNames from "classnames/bind";
import styles from "./PostItem.module.scss";
import Image from "~/assets/img";

import PostAction from "~/components/PostItem/component/PostAction";

const cx = classNames.bind(styles);
const { Comment, Share, Retweet, Like, Views } = Image;

// Calculate time
function getTimeDifference(timestamp) {
  const now = new Date();
  let date = new Date(timestamp).toDateString().split(" ");
  let result;
  const difference = now.getTime() - timestamp;
  let hours = Math.floor(difference / (1000 * 60 * 60));
  let minutes = Math.floor((difference / (1000 * 60)) % 60);
  if (hours > 24) {
    result = `${date[1]} ${date[2]} ${date[3]}`;
  } else if (hours > 1) {
    result = `${hours} hour ago`;
  } else {
    result = `${minutes} minute ago`;
  }
  return result;
}

function PostItem({ post }) {
  const {
    id,
    user,
    content,
    media,
    views,
    like,
    retweet,
    comments,
    createdAt,
  } = post;
  let time = getTimeDifference(createdAt);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("avatar-container")}>
          <img src={user.avatar} alt="avatar"></img>
        </div>
        <div className={cx("post-container")}>
          <div className={cx("post-header")}>
            <div className={cx("user-info")}>
              <div className={cx("fullname")}>
                {user.fullname}
                <div className={cx("username-icon")}>
                  <img src={user.icon} alt="user icon"></img>
                </div>
              </div>
              <div className={cx("username")}>@{user.username}</div>
              <div>
                <span>·</span>
              </div>
              <div className={cx("post-time")}>{time}</div>
            </div>
            <PostAction id={id}>
              <div className={cx("post-action")}>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </PostAction>
          </div>
          <div className={cx("post-content")}>{content}</div>
          <div className={cx("post-media")}>
            {media && <img src={media} alt="post media" />}
          </div>
          <div className={cx("post-interact-container")}>
            <div className={cx("post-interact")}>
              <div className={cx("post-interact-img")}>
                <Comment />
              </div>
              <span>{comments.length}</span>
            </div>
            <div className={cx("post-interact")}>
              <div className={cx("post-interact-img")}>
                <Retweet />
              </div>
              <span>{retweet}</span>
            </div>
            <div className={cx("post-interact")}>
              <div className={cx("post-interact-img")}>
                <Like />
              </div>
              <span>{like}</span>
            </div>
            <div className={cx("post-interact")}>
              <div className={cx("post-interact-img")}>
                <Views />
              </div>
              <span>{views}</span>
            </div>
            <div className={cx("post-interact")}>
              <div className={cx("post-interact-img")}>
                <Share />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
