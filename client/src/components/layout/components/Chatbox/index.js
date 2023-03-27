import FriendList from "./components/FriendList";
import styles from "./Chatbox.module.scss";
import classNames from "classnames/bind";
import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "~/api/queries";
import Spinner from "~/components/Spinner";

const cx = classNames.bind(styles);
function ChatBox() {
  const { loading, error, data } = useQuery(GET_FRIENDS);
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;
  const friends = data.users;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("chatBox")}>
        <div className={cx("chatBoxHeader")}>
          <span
            className={cx("chatBoxTitle")}
          >{`Người liên hệ (${friends.length})`}</span>
          <div className={cx("chatBoxAction")}>
            <div className={cx("chatBoxActionItem")}>
              <i className="fa-solid fa-magnifying-glass"></i>{" "}
            </div>
            <div className={cx("chatBoxActionItem")}>
              <i className="fa-solid fa-ellipsis"></i>
            </div>
          </div>
        </div>
        <FriendList friends={friends} />
      </div>
    </div>
  );
}

export default ChatBox;
