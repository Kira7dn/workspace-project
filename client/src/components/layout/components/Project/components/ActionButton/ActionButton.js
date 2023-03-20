import React from "react";
import styles from "./ActionButton.module.css";

const ActionButton = ({ id, movePJ }) => {
  const handleDelete = (targetId) => {
    console.log(targetId);
    movePJ({ targetId, type: "delete" });
  };
  const handleMoveUp = (targetId) => {
    movePJ({ targetId, type: "up" });
  };
  const handleMoveDown = (targetId) => {
    movePJ({ targetId, type: "down" });
  };
  return (
    <div className={`${styles.actionTag} col-2`}>
      <div
        className={styles.actionIcon}
        src="https://findicons.com/files/icons/1262/amora/128/delete.png"
        alt="delete"
        onClick={handleDelete.bind(this, id)}
      >
        <i className="fa-solid fa-trash"></i>
      </div>

      <div
        className={styles.actionIcon}
        onClick={handleMoveUp.bind(this, id)}
      >
        <i className="fa-solid fa-circle-arrow-up"></i>{" "}
      </div>
      <div
        className={styles.actionIcon}
        onClick={handleMoveDown.bind(this, id)}
      >
        <i className="fa-solid fa-circle-arrow-down"></i>{" "}
      </div>
    </div>
  );
};

export default ActionButton;
