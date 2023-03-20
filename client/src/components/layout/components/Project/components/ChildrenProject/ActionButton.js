import React from 'react';
import styles from './ChildrenProject.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    deleteProject,
    projectSelector,
    getOneProject,
    chooseProject,
    moveUp,
    moveDown,
    moveTop,
    moveBot,
    updateProject,
    setNewPost,
    isNew,
    isNewSelector,
} from '../../../../store/reducer/ProjectSlice';

const ActionButton = ({ _id }) => {
    const dispatch = useDispatch();
    const isNew = useSelector(isNewSelector);
    const project = useSelector(projectSelector);
    const handleDelete = (childId) => {
        dispatch(deleteProject(childId));
    };
    // const dispatchMoveUp = async (childId) => {
    //     await dispatch(moveUp(childId));
    //     const newProject = project;
    //     return newProject;
    // };
    const handleMoveUp = (childId) => {
        dispatch(moveUp(childId));
    };
    const handleMoveDown = (childId) => {
        dispatch(moveDown(childId));
    };
    if (isNew === true) {
        dispatch(updateProject(project));
        dispatch(setNewPost(false));
    }
    return (
        <div className={`${styles.actionTag} col-2`}>
            <div
                className={styles.actionIcon}
                src="https://findicons.com/files/icons/1262/amora/128/delete.png"
                alt="delete"
                onClick={handleDelete.bind(this, _id)}
            >
                <i className="fa-solid fa-trash"></i>
            </div>

            <div
                className={styles.actionIcon}
                onClick={handleMoveUp.bind(this, _id)}
            >
                <i className="fa-solid fa-circle-arrow-up"></i>{' '}
            </div>
            <div
                className={styles.actionIcon}
                onClick={handleMoveDown.bind(this, _id)}
            >
                <i className="fa-solid fa-circle-arrow-down"></i>{' '}
            </div>
        </div>
    );
};

export default ActionButton;
