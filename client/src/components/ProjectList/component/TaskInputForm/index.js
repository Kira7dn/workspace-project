import classNames from "classnames/bind";
import styles from "./TaskInputForm.module.scss";
import { useCallback, useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "~/api/mutations";
import { GET_POSTS } from "~/api/queries";
import { ContainerClient } from "@azure/storage-blob";

const cx = classNames.bind(styles);
function TaskInputForm({ spaceId }) {
  const initState = {};
  const [value, setValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [uploadPost, { loading }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }, "getPostsQuery"],
  });

  // Handle auto Resize Text Area
  const handleChange = useCallback((event) => {
    const input = event.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setValue(input.value);
  }, []);

  // Handle Submit > Upload Image > Resize text Area
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const textarea = form.querySelector('textarea[name="idea"]');
    uploadPost({
      variables: {
        input: {
          content: value,
        },
      },
    }).then(() => {});
    setValue("");
    setSelectedFile(null);
    textarea.style.height = "auto";
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <form className={cx("post-container")} onSubmit={handleSubmit}>
          <div className={cx("input-container")}>
            <div className={cx("input-item")}>
              <span>Task name</span>
              <input
                type="text"
                placeholder="Write your Idea"
                name="task-name"
                value={value}
                onChange={handleChange}
              />
            </div>
            <div className={cx("input-item")}>
              <span>Target</span>
              <textarea
                className={cx("target-textarea")}
                placeholder="Write your Idea"
                name="task-description"
                value={value}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={cx("action-buttons-container")}>
            <button
              type="submit"
              disabled={loading}
              className={cx("action-button-post")}
            >
              POST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskInputForm;
