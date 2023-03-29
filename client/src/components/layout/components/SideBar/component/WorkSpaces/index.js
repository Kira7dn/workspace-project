import { useQuery } from "@apollo/client";
import classNames from "classnames/bind";
import { GET_SPACES } from "~/api/queries";
import Spinner from "~/components/Spinner";
import SpaceItem from "../SpaceItem";
// import SpaceModal from "../SpaceModal";
import styles from "./WorkSpaces.module.scss";

const cx = classNames.bind(styles);
function WorkSpaces() {
  const { data, loading } = useQuery(GET_SPACES);
  if (loading) return <Spinner />;
  const spaces = data.spaces;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("title")}>
          <span>WorkSpace List</span>
        </div>
        <div className={cx("flex-container")}>
          {spaces.map((space, index) => {
            return (
              <div className={cx("flex-item")} key={space.id}>
                <SpaceItem space={space} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WorkSpaces;
