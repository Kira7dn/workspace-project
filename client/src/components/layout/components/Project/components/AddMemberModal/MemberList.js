import styles from './AddMemberModal.module.css';

const Memberlist = ({ preMembers, setPreMembers }) => {
    return (
        <div>
            <div className={styles.memberListWindow}>
                <h5 className="text-center">{`Member(${preMembers.length})`}</h5>
                {preMembers.map((member, index) => {
                    return (
                        <div key={index} className={styles.memberInfo}>
                            <img
                                src={member.avatar}
                                className={styles.memberAvatar}
                                alt={member.username}
                            />
                            <p className={styles.memberName}>
                                {member.fullname}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Memberlist;
