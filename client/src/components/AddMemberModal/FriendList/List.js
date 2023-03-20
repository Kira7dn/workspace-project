import SingleFriend from "./SingleFriend";
import styles from "./AddMemberModal.module.css";

const List = ({ friends, preMembers, setPreMembers }) => {
  return (
    <div className={`${styles.FriendList}`}>
      <div className={`${styles.FriendListHeader}`}>
        <h5 className={`${styles.FriendListTitle}`}>Contact (15)</h5>
        <div className={`${styles.FriendListAction}`}>
          <div className={`${styles.FriendListActionItem}`}>
            <i className="fa-solid fa-magnifying-glass"></i>{" "}
          </div>
          <div className={`${styles.FriendListActionItem}`}>
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        </div>
      </div>
      <div className={`${styles.contactList}`}>
        {friends.map((friend) => {
          const isHave = preMembers.find((member) => {
            return friend.id === member.id;
          });
          return (
            <SingleFriend
              friend={friend}
              isHave={isHave}
              preMembers={preMembers}
              setPreMembers={setPreMembers}
              key={friend.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
