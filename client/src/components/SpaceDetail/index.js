import { useQuery } from "@apollo/client";
import { GET_SPACE } from "~/api/queries";
import Spinner from "~/components/Spinner";
import styles from "./SpaceDetail.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function SpaceDetail({ spaceId }) {
  const { data, loading } = useQuery(GET_SPACE, {
    variables: {
      spaceId: spaceId,
    },
  });
  if (loading) return <Spinner />;
  const { title, description, image, members } = data.space;
  return (
    <div
      className={`shadow p-3 ${styles.spaceItem}`}
      border="primary"
      style={{
        cursor: "default",
      }}
    >
      <div>
        <div className="col-12">
          <h6 className={styles.spacetitle}>{title}</h6>
        </div>
      </div>
      <div>
        <div className="align-items-center">
          <img
            src={image}
            className={`${styles.spaceimg} img-fluid`}
            alt="img"
          />
        </div>
        <div className="align-middle"></div>
      </div>
      <div className="">
        <p className={styles.spacedesc}>{description}</p>
      </div>
      <div>
        <p className="mb-0">{`Team (${members.length})`}</p>

        <span className={`${styles.teamlist}`}>
          {members.map((member) => {
            return (
              <span key={member.id} className={styles.memberinfo}>
                <img
                  src={member.avatar}
                  className={styles.memberavatar}
                  alt=""
                />
                <div className={styles.membername}>{member.fullname}</div>
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
}

export default SpaceDetail;
