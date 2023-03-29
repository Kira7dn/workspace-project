import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { SpaceContext } from "../../SpaceContext";
import AddMembersModal from "../../../../components/AddMemberModal";
import addBtn from "../../../../assets/addBtn.svg";
import styles from "./AddSpaceModal.module.css";

const SpaceModal = () => {
  const {
    Space,
    showSpaceModal,
    onChangeSpace,
    spaceAvatars,
    resetSpace,
    handleCreate,
    setShowSpaceModal,
    handleUpdate,
    setShowMemberModal,
  } = useContext(SpaceContext);
  const { title, description, image, members } = Space;
  const closeDialog = () => {
    resetSpace();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!Space.id) {
      handleCreate(Space);
    } else {
      handleUpdate(Space);
    }
    resetSpace();
    setShowSpaceModal(false);
  };

  return (
    <Modal
      show={showSpaceModal}
      onHide={closeDialog}
      restoreFocus={false}
      centered={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create your Work Space</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group
            name="image"
            onChange={onChangeSpace}
            value={image}
            className="d-flex"
          >
            <div className={`${styles.avatarcontainer} col-4`}>
              <img src={image} className={styles.spaceimg} alt="" />
            </div>
            <div className="col-8">
              <p>Choose space avatar: </p>
              <div
                className={`mb-3 ${styles.ccselector} ${styles.avatarlistcontainer} `}
              >
                {spaceAvatars.map((spaceAvatar, index) => (
                  <div key={index}>
                    <input
                      id={`avatar-${index}`}
                      type="radio"
                      name="image"
                      value={spaceAvatar}
                    />
                    <label
                      className={`${styles.drinkcardcc} ${styles.avatarthumb}`}
                      htmlFor={`avatar-${index}`}
                      style={{
                        backgroundImage: "url(" + spaceAvatar + ")",
                      }}
                    ></label>
                  </div>
                ))}
              </div>
            </div>
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeSpace}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeSpace}
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Row>
              <Col>
                <Row>
                  <div className="col-10">
                    <Form.Label className="text-center">{`Member(${
                      members.length || 0
                    })`}</Form.Label>
                    <div className={styles.memberlistinfo}>
                      {members.map((member) => {
                        return (
                          <div
                            key={member.id}
                            className={styles.memberinfo}
                          >
                            <img
                              src={member.avatar}
                              alt={member.username}
                              className={styles.memberavatar}
                            />
                            <div className={styles.membername}>
                              {member.fullname}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={`col-2 ${styles.addFriendbtn}`}>
                    <Button
                      onClick={setShowMemberModal.bind(this, true)}
                    >
                      <img
                        src={addBtn}
                        alt="add-post"
                        width="20"
                        height="20"
                      />
                    </Button>
                  </div>
                </Row>
              </Col>
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {!Space.id ? "Add new" : "Update"}
          </Button>
        </Modal.Footer>
      </Form>
      <AddMembersModal />
    </Modal>
  );
};

export default SpaceModal;
