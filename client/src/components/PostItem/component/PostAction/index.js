import styles from "./PostAction.module.scss";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "~/api/mutations";
import { GET_POSTS } from "~/api/queries";

const cx = classNames.bind(styles);
function PostAction({ children, id }) {
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS }, "getPostsQuery"],
  });

  const handleDetete = () => {
    deletePost({
      variables: {
        deletePostId: id,
      },
    });
  };
  return (
    <Tippy
      interactive
      delay={[0, 300]}
      placement="left-start"
      render={(attrs) => (
        <div className={cx("menu-list")}>
          <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
            <button className={cx("menu-item")} onClick={handleDetete}>
              <span className={cx("item-icon")}>
                <FontAwesomeIcon icon={faLanguage} />
              </span>
              <span>Delete</span>
            </button>
            <button className={cx("menu-item")}>
              <span className={cx("item-icon")}>
                <FontAwesomeIcon icon={faCircleQuestion} />
              </span>
              <span>Edit</span>
            </button>
          </div>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default PostAction;
