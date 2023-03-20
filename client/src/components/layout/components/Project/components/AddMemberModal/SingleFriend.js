import { Button } from 'react-bootstrap';
import { useState } from 'react';
import styles from './AddMemberModal.module.css';

const SingleFriend = ({ friend, isHave, preMembers, setPreMembers }) => {
    const { _id, username, avatar, fullname } = friend;
    const [btnState, setBtnState] = useState(isHave);
    const removeMember = (_id) => {
        setPreMembers(preMembers.filter((member) => member._id !== _id));
    };
    const setMember = (newMembers) => {
        setPreMembers([...preMembers, newMembers]);
    };
    const handleChange = () => {
        if (btnState) {
            removeMember(_id);
        } else {
            setMember(friend);
        }
        setBtnState(!btnState);
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
                    <Button
                        variant={btnState ? 'light' : 'secondary'}
                        onClick={handleChange}
                        size="sm"
                        className={styles.friendActionBtn}
                    >
                        {btnState ? 'Delete' : 'Add'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SingleFriend;
