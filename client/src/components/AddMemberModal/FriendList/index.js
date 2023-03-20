import { Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "../../../api/queries";
import List from "./List";

const FriendList = ({ preMembers, setPreMembers }) => {
  const { loading, error, data } = useQuery(GET_FRIENDS);
  if (loading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  if (error) return <p>Error Load Friends</p>;
  const friends = data.user.friends;

  return (
    <List
      friends={friends}
      preMembers={preMembers}
      setPreMembers={setPreMembers}
    />
  );
};

export default FriendList;
