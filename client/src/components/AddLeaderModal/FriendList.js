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

const FriendList = () => {
    const user = useSelector(userSelector);
    const friends = useSelector(friendsSelector);
    const project = useSelector(projectSelector);
    const { leader, _id } = project;
    const dispatch = useDispatch();
    const friendList = [...friends, user];
    useEffect(() => {
        dispatch(getFriends());
    }, [dispatch]);
    return (
        
    );
};

export default FriendList;
