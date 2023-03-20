import { Button } from "react-bootstrap";
import styles from "./AddMemberModal.module.css";

const SingleFriend = ({ friend, isLeader, change }) => {
  const { username, avatar, fullname } = friend;
  const handleChange = () => {
    const item = { leader: friend };
    change(item);
    // const updatedProject = { _id: project._id, leader: friend };
    // dispatch(updateProject(updatedProject));
    // dispatch(setShowLeaderModal(false));
  };
  return (
    <div className={styles.friendContainer}>
      <div className="">
        <img
          src={avatar}
          alt={username}
          className={styles.friendAvatar}
        />
      </div>
      <div className={styles.friendInfo}>
        <div>
          <b className={styles.friendInfoName}>{fullname}</b>
        </div>
        <div className={styles.friendAction}>
          {!isLeader ? (
            <Button
              variant="primary"
              onClick={handleChange}
              size="sm"
              className={styles.friendActionBtn}
            >
              Set
            </Button>
          ) : (
            <div className={styles.leaderTag}>(Leader)</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleFriend;
