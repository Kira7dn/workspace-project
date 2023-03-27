import classNames from "classnames/bind";
import styles from "./PostInputForm.module.scss";
import { useCallback, useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "~/api/mutations";
import { GET_POSTS } from "~/api/queries";
import { ContainerClient } from "@azure/storage-blob";

const cx = classNames.bind(styles);
function PostInputForm() {
  const [value, setValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle choose Image
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
  };
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

  // Upload to Azure
  const handleUpload = async (uploadFile) => {
    const accountName = "workspacestorage21";
    const sasToken =
      "sp=racwdl&st=2023-03-27T02:23:37Z&se=2023-05-01T10:23:37Z&spr=https&sv=2021-12-02&sr=c&sig=oaF7uM5AGu1MiL7kdIMc1iCVmYKiUUogObdvUJCa2Ec%3D";
    const containerName = "postmedia";
    const sasUrl = `https://${accountName}.blob.core.windows.net/${containerName}?${sasToken}`;
    if (uploadFile) {
      const blobName = uploadFile.name;
      const containerClient = new ContainerClient(sasUrl);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const options = {
        blobHTTPHeaders: {
          blobContentType: uploadFile.type,
        },
      };
      blockBlobClient.uploadBrowserData(selectedFile, options);
      const imageUrl = blockBlobClient.url;
      return imageUrl;
    } else {
      return null;
    }
  };

  // Handle Submit > Upload Image > Resize text Area
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const textarea = form.querySelector('textarea[name="idea"]');
    await handleUpload(selectedFile).then((imageUrl) => {
      uploadPost({
        variables: {
          input: {
            content: value,
            media: imageUrl,
          },
        },
      }).then(() => {});
      setValue("");
      setSelectedFile(null);
      textarea.style.height = "auto";
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("avatar-wrapper")}>
          <img
            className={cx("avatar-img")}
            src="https://freenice.net/wp-content/uploads/2021/08/hinh-anh-avatar-dep.jpg"
            alt="avatar"
          />
        </div>
        <form className={cx("post-container")} onSubmit={handleSubmit}>
          <div className={cx("input-container")}>
            <div className={cx("input-header")}>
              <div className={cx("input-audience")}>
                <div>Everyone</div>
                <div className={cx("input-audience-dropdown")}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            <div className={cx("input-text-box")}>
              <textarea
                className={cx("input-textarea")}
                placeholder="Write your Idea"
                name="idea"
                value={value}
                onChange={handleChange}
              />
            </div>
            {selectedFile && (
              <div className={cx("input-image")}>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected file"
                />
              </div>
            )}
          </div>
          <div className={cx("private")}>
            <div className={cx("private-icon")}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z"></path>
                </g>
              </svg>{" "}
            </div>
            <div className={cx("private-title")}>
              <span>Everyone can reply</span>
            </div>
          </div>
          <div className={cx("action-buttons-container")}>
            <div className={cx("action-buttons-list")}>
              {/* Media Action */}
              <div className={cx("action-button")} onClick={handleButtonClick}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
              </div>
              {/* Emoji Action */}
              <div className={cx("action-button")}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path>
                  </g>
                </svg>
              </div>
            </div>
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

export default PostInputForm;
