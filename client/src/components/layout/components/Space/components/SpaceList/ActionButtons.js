import { Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./SpaceList.module.css";
import React, { useContext } from "react";
import { SpaceContext } from "../../SpaceContext";

const ActionButtons = ({ space }) => {
  const { onEditSpace, handleDelete, handleSelect } =
    useContext(SpaceContext);
  return (
    <Row>
      <Button
        className={styles.postbutton}
        onClick={handleSelect.bind(this, space)}
      >
        <img
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/project-management-1628740-1380328.png"
          alt="play"
          className={styles.btnIcon}
        />
      </Button>
      <Button
        className={styles.postbutton}
        onClick={onEditSpace.bind(this, space)}
      >
        <img
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/edit-734-445212.png"
          alt="edit"
          className={styles.btnIcon}
        />
      </Button>
      <Button
        className={styles.postbutton}
        onClick={handleDelete.bind(this, space.id)}
      >
        <img
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-771-590901.png"
          alt="delete"
          className={styles.btnIcon}
        />
      </Button>
    </Row>
  );
};
export default ActionButtons;
