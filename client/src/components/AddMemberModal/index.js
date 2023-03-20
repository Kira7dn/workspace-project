import { Form, Modal, Button } from "react-bootstrap";
import FriendList from "./FriendList";
import MemberList from "./MemberList/MemberList";
import { useState, useContext } from "react";
import { SpaceContext } from "../../features/space/SpaceContext";

const AddMembersModal = () => {
  const { Space, setSpace, showMemberModal, setShowMemberModal } =
    useContext(SpaceContext);
  const { members } = Space;
  const [preMembers, setPreMembers] = useState(members);
  const closeDialog = () => {
    resetAddMembersData();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setSpace({ ...Space, members: preMembers });
    setShowMemberModal(false);
  };
  const resetAddMembersData = () => {
    setPreMembers(members);
    setShowMemberModal(false);
  };
  return (
    <Modal
      show={showMemberModal}
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

export default AddMembersModal;
