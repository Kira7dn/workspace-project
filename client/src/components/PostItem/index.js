import classNames from "classnames/bind";
import styles from "./PostItem.module.scss";
import Image from "~/assets/img";

const cx = classNames.bind(styles);
const { Comment, Share, Retweet, Like, Views } = Image;
function getTimeDifference(timestamp) {
  const now = new Date();
  const difference = now.getTime() - timestamp;
  let hours = Math.floor(difference / (1000 * 60 * 60)) + 7;
  let minutes = Math.floor((difference / (1000 * 60)) % 60);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${hours}:${minutes}`;
}

function PostItem({ post }) {
  const { user, content, media, views, like, retweet, comments, createdAt } =
    post;
  let time = getTimeDifference(createdAt);
  console.log(time);
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
            <div className={cx("post-action")}>
              <i className="fa-solid fa-ellipsis"></i>
            </div>
          </div>
          <div className={cx("post-content")}>{content}</div>
          <div className={cx("post-media")}>
            <img src={media} alt="post media"></img>
          </div>
          <div className={cx("post-interact-container")}>
            <div className={cx("post-interact")}>
              <div className={cx("post-interact-img")}>
                {/* <img src={Image.comment} alt="comment" /> */}
                <Comment />
              </div>
              <span>{comments.length}</span>
            </div>
            <div className={cx("post-interact")}>
              <div className={cx("post-interact-img")}>
                {/* <img src={Image.retweet} alt="retweet" /> */}
                <Retweet />
              </div>
              <span>{retweet}</span>
            </div>
            <div className={cx("post-interact")}>
              <div className={cx("post-interact-img")}>
                {/* <img src={Image.like} alt="like" /> */}
                <Like />
              </div>
              <span>{like}</span>
            </div>
            <div className={cx("post-interact")}>
              <div className={cx("post-interact-img")}>
                {/* <img src={Image.views} alt="views" /> */}
                <Views />
              </div>
              <span>{views}</span>
            </div>
            <div className={cx("post-interact")}>
              <div className={cx("post-interact-img")}>
                {/* <img src={Image.share} alt="share" /> */}
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
