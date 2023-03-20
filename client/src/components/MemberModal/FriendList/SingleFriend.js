import React from "react";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";
import styles from "./AddMemberModal.module.css";

const SingleFriend = ({
  friend,
  isHave,
  preMembers,
  setPreMembers,
}) => {
  const { id, avatar, username, fullname } = friend;
  const [btnState, setBtnState] = useState(isHave);
  const removeMember = (id) => {
    setPreMembers(preMembers.filter((member) => member.id !== id));
  };
  const setMember = (newMembers) => {
    setPreMembers([...preMembers, newMembers]);
  };
  const handleChange = () => {
    if (btnState) {
      removeMember(id);
    } else {
      setMember(friend);
    }
    setBtnState(!btnState);
  };
  return (
    <Container className="px-1 justify-content-between">
      <div className={styles.friendcontainer}>
        <div className="">
          <img
            src={avatar}
            className={styles.friendavatar}
            alt={username}
          />
        </div>
        <div className={styles.friendinfo}>
          <div>
            <b className={styles.friendinfoname}>{fullname}</b>
          </div>
          <div className={styles.friendaction}>
            <Button
              variant={btnState ? "secondary" : "primary"}
              onClick={handleChange}
              size="sm"
              className={styles.friendActionBtn}
            >
              {btnState ? "Delete" : "Add"}
            </Button>
          </div>
        </div>
      </div>
      <div className="dropdown-divider"></div>
    </Container>
  );
};

export default SingleFriend;
