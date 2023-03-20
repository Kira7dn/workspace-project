import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import SingleFriend from './SingleFriend';
import { useSelector, useDispatch } from 'react-redux';
import {
    friendsSelector,
    getFriends,
} from '../../../../store/reducer/FriendSlice';
import { projectSelector } from '../../../../store/reducer/ProjectSlice';
import { userSelector } from '../../../../store/reducer/AuthSlice';

const FriendList = ({ preMembers, setPreMembers }) => {
    const user = useSelector(userSelector);
    console.log(user);
    const friends = useSelector(friendsSelector);
    console.log(friends);

    const project = useSelector(projectSelector);
    const { leader } = project;
    const dispatch = useDispatch();
    let friendList = [...friends, user];
    if (leader) {
        friendList = friendList.filter((friend) => friend._id !== leader._id);
    }
    console.log(friendList);
    useEffect(() => {
        dispatch(getFriends());
    }, [dispatch]);
    return (
        <div>
            <h5 className="text-center">{`Friend List (${friendList.length})`}</h5>
            <div className="friend-window-space">
                {friendList.map((friend) => {
                    const isHave = preMembers.find((member) => {
                        return friend._id === member._id;
                    });
                    return (
                        <Container
                            key={friend._id}
                            className="my-2 justify-content-between"
                        >
                            <SingleFriend
                                preMembers={preMembers}
                                setPreMembers={setPreMembers}
                                friend={friend}
                                isHave={isHave}
                            />
                            <div className="dropdown-divider"></div>
                        </Container>
                    );
                })}
            </div>
        </div>
    );
};

export default FriendList;
