import { Col, ProgressBar, Row, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import moment from 'moment';
import deadlineIcon from '../../../../assets/deadline.png';
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
} from '../../../../store/reducer/ProjectSlice';
import ActionButtons from './ActionButton';

const ChildProject = ({ child }) => {
    const { _id, title, description, deadline, leader, progress } = child;
    const dispatch = useDispatch();
    const selectItem = (id) => {
        dispatch(getOneProject(id));
        dispatch(chooseProject(child));
    };
    return (
        <>
            <div
                className={`ms-2 me-auto ${styles.childContainer}`}
                onClick={selectItem.bind(this, _id)}
            >
                <Row className="fw-bold">
                    <div className={`col-6 ${styles.title}`}>{title}</div>
                    <div className={`${styles.progressContainer} col-4`}>
                        <div className={`col-10 ${styles.progressBar}`}>
                            <ProgressBar
                                className="p-0"
                                animated
                                variant="success"
                                now={progress}
                                label={`${progress}%`}
                                style={{
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    lineHeight: '24px',
                                    fontSize: '16px',
                                    height: '24px',
                                }}
                            />
                        </div>
                    </div>
                    <div className={`${styles.deadlineTag} col-2`}>
                        <img
                            className={styles.deadlineIcon}
                            src={deadlineIcon}
                            alt="deadline"
                        />
                        <h5 className={`${styles.deadlineContent} text-danger`}>
                            {moment(deadline).format('DD-MMM')}
                        </h5>
                    </div>
                </Row>

                <Row>
                    <Col className="col-10">
                        <div className={styles.desc}>
                            <p className={styles.descContent}>{description}</p>
                        </div>
                    </Col>
                    <Col className={`${styles.leaderContainer} col-2`}>
                        {leader ? (
                            <>
                                <h5 className={styles.incharge}>Incharge</h5>
                                <div className={styles.leaderInfo}>
                                    <img
                                        src={
                                            leader
                                                ? `http://localhost:5000/images/${leader.avatar}`
                                                : ''
                                        }
                                        alt="leader"
                                        className={`${styles.leaderAvatar} col-4`}
                                    />
                                    <div
                                        className={`${styles.leaderName} col-8`}
                                    >
                                        {leader ? leader.username : ''}
                                    </div>
                                </div>
                            </>
                        ) : (
                            ''
                        )}
                    </Col>
                </Row>
            </div>
            <ActionButtons _id={_id} />
        </>
    );
};

export default ChildProject;
