import styles from "./MemberList.module.css";
const Memberlist = ({ preMembers }) => {
  return (
    <div>
      <div className={styles.memberlistwindow}>
        <h5 className="text-center">{`Member(${preMembers.length})`}</h5>
        {preMembers.map((member) => {
          return (
            <div key={member.id} className={styles.memberinfo}>
              <img
                src={member.avatar}
                className={styles.memberavatar}
                alt={member.username}
              />
              <span className={styles.membername}>
                {member.fullname}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Memberlist;
