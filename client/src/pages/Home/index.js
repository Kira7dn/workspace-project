import { useQuery } from "@apollo/client";
import classNames from "classnames/bind";
import { GET_POSTS } from "~/api/queries";
import PostInputForm from "~/components/PostInputForm";
import PostItem from "~/components/PostItem";
import Spinner from "~/components/Spinner";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) return <Spinner />;
  if (error) return <p>Error Happen</p>;
  const postList = data.posts;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("post-input-form")}>
          <PostInputForm />
        </div>
        <div className={cx("post-list")}>
          {postList.map((post, index) => {
            return <PostItem post={post} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
