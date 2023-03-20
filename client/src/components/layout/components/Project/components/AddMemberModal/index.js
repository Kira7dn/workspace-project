import { Form, Modal, Button } from 'react-bootstrap';
import FriendList from './FriendList';
import MemberList from './MemberList';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    setShowAddMembersModal,
    memberModalSelector,
} from '../../../../store/reducer/ModalSlice';
import {
    updateProject,
    projectSelector,
} from '../../../../store/reducer/ProjectSlice';

const AddMemberModal = () => {
    const project = useSelector(projectSelector);
    const { _id, members } = project;
    const showAddMembersModal = useSelector(memberModalSelector);
    const dispatch = useDispatch();

    const [preMembers, setPreMembers] = useState(members);
    // Var function
    const closeDialog = () => {
        resetAddMembersData();
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        const updatedProject = { _id, members: preMembers };
        dispatch(updateProject(updatedProject));
        dispatch(setShowAddMembersModal(false));
    };
    const resetAddMembersData = () => {
        setPreMembers(members);
        dispatch(setShowAddMembersModal(false));
    };
    return (
        <div>
            <Modal
                show={showAddMembersModal}
                onHide={closeDialog}
                dialogClassName="friend-window-modal"
                size="sm"
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
                        <MemberList
                            preMembers={preMembers}
                            setPreMembers={setPreMembers}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={closeDialog}
                            size="sm"
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" size="sm">
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};
export default AddMemberModal;
