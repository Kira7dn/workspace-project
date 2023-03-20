import { Form, Modal, Button } from "react-bootstrap";
import FriendList from "./FriendList";
import MemberList from "./MemberList/MemberList";
import { useState } from "react";

const MembersModal = ({ show, list, current, change, toggle }) => {
  const [preMembers, setPreMembers] = useState(current);
  const closeDialog = () => {
    resetAddMembersData();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    change({ members: preMembers });
  };
  const resetAddMembersData = () => {
    setPreMembers(current);
    toggle(false);
  };
  return (
    <Modal
      show={show}
      onHide={closeDialog}
      dialogClassName="friend-window-modal"
      size="sm"
      restoreFocus={false}
      centered={true}
    >
      <Modal.Header closeButton>
        <h5 className="friend-window-modal-title">
          Add your members
        </h5>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <FriendList
            preMembers={preMembers}
            setPreMembers={setPreMembers}
            list={list}
          />
          <MemberList preMembers={preMembers} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog} size="sm">
            Cancel
          </Button>
          <Button variant="primary" type="submit" size="sm">
            Confirm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MembersModal;
