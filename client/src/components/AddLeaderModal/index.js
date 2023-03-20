import { Form, Modal, Container } from "react-bootstrap";
import { useState } from "react";
import SingleFriend from "./SingleFriend";

const AddLeaderModal = (props) => {
  const { show, list, current, toggle, change } = props;

  // Var function
  const closeDialog = () => {
    toggle(false);
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={closeDialog}
        dialogClassName="friend-window-modal"
        size="sm"
      >
        <Modal.Header closeButton>
          <h5 className="friend-window-modal-title">
            Set your Leader
          </h5>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <div>
              <h5 className="text-center">{`Friend List (${list.length})`}</h5>
              <div className="friend-window-space">
                {list.map((friend) => {
                  let isLeader = false;
                  if (current) {
                    isLeader = friend.id === current.id;
                  }
                  return (
                    <Container
                      key={friend.id}
                      className="my-2 justify-content-between"
                    >
                      <SingleFriend
                        friend={friend}
                        isLeader={isLeader}
                        change={change}
                      />
                      <div className="dropdown-divider"></div>
                    </Container>
                  );
                })}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
export default AddLeaderModal;
