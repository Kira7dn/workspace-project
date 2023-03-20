import { Col, Row, Card, Form } from "react-bootstrap";
// import ActionButtons from "./ActionButtons";
import { EditText } from "react-edit-text";
import moment from "moment";
import deadlineIcon from "../../../../assets/deadline.png";
import projectIcon from "../../../../assets/project-title.png";
import ProgressBar from "../../../../components/ProgressBar";

import styles from "./ProjectContent.module.css";

const ProjectContent = ({ project, change, update, handleModal }) => {
  const {
    title,
    description,
    deadline,
    target,
    members,
    progress,
    leader,
  } = project;
  const onUpdate = () => {
    update();
  };
  const onChange = (event) =>
    change({
      ...project,
      [event.target.name]: event.target.value,
    });
  const handleMember = (status) => {
    handleModal(status, "member");
  };
  const handleLeader = (status) => {
    handleModal(status, "leader");
  };
  return (
    <>
      <Card
        className={`shadow p-2 ${styles.projectList}`}
        border="primary"
        style={{
          cursor: "default",
        }}
      >
        <Card.Body className={`p-2`}>
          <Card.Title className="mb-0">
            <Row>
              <Col className={`${styles.projectTitle} col-6 p-0`}>
                <img
                  src={projectIcon}
                  alt="project"
                  className={`${styles.projectIcon} col-4`}
                />
                <Form.Control
                  type="text"
                  className={`${styles.projectContent} text-primary`}
                  name="title"
                  value={title}
                  onChange={onChange}
                  onBlur={onUpdate}
                />
              </Col>
              <Col className="col-6">
                <ProgressBar
                  progress={progress}
                  onUpdate={onUpdate}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </Card.Title>
          <div className="p-0">
            <Row>
              <Col className="col-6 p-1">
                <div className={styles.projectDesc}>
                  <div className={styles.projectDescTitle}>
                    Description
                  </div>
                  <Form.Control
                    as="textarea"
                    className={styles.projectDescContent}
                    name="description"
                    value={description}
                    rows={7}
                    onChange={onChange}
                    onBlur={onUpdate}
                  />
                </div>
              </Col>
              <Col className="col-4 p-1">
                <div className={styles.projectTarget}>
                  <div className={styles.projectDescTitle}>
                    Target
                  </div>
                  <Form.Control
                    as="textarea"
                    className={styles.projectDescContent}
                    name="target"
                    value={target}
                    rows={7}
                    onChange={onChange}
                    onBlur={onUpdate}
                  />
                </div>
              </Col>
              <Col className="col-2 p-1">
                <div className={styles.projectTeam}>
                  <div className={styles.projectDescTitle}>Team</div>
                  <div className={styles.teamList}>
                    <Row className={`${styles.leaderContainer} mx-0`}>
                      <div className="d-flex justify-content-between align-items-center p-0">
                        <h5
                          className={`${styles.leaderContainerTitle} text-primary`}
                        >
                          Leader
                        </h5>
                        <i
                          className={`fas fa-user-edit ${styles.projectLeaderAdd}`}
                          onClick={handleLeader.bind(this, true)}
                        ></i>
                      </div>
                      <div className={styles.leaderInfo}>
                        {leader ? (
                          <>
                            <img
                              src={leader.avatar}
                              alt={leader.username}
                              className={`${styles.leaderAvatar} col-4`}
                            />
                            <div
                              className={`${styles.leaderName} col-8 text-primary`}
                            >
                              {leader ? leader.fullname : ""}
                            </div>
                          </>
                        ) : (
                          <div className={styles.noLeader}>
                            Please set your Leader
                          </div>
                        )}
                      </div>
                    </Row>
                    <Row className={`${styles.leaderContainer} mx-0`}>
                      <div className="d-flex justify-content-between align-items-center p-0">
                        <div
                          className={`text-secondary ${styles.leaderContainerTitle}`}
                        >
                          {`Member(${
                            members ? members.length : "0"
                          })`}
                        </div>
                        <i
                          className={`fas fa-user-plus fa-sm ${styles.projectMembersAdd}`}
                          onClick={handleMember.bind(this, true)}
                        ></i>
                      </div>
                      <div className={styles.memberListInfo}>
                        {members
                          ? members.map((member) => {
                              return (
                                <div
                                  key={member.id}
                                  className={styles.memberInfo}
                                >
                                  <img
                                    src={member.avatar}
                                    alt={member.username}
                                    className={styles.memberAvatar}
                                  />
                                  <div
                                    className={`${styles.memberName} text-secondary`}
                                  >
                                    {member.fullname}
                                  </div>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
        <div className={styles.deadlineTag}>
          <img
            src={deadlineIcon}
            alt="deadline"
            className={`${styles.deadlineIcon} col-4`}
          />
          <EditText
            className={`${styles.deadlineContent} text-danger`}
            name="deadline"
            defaultValue={moment(deadline).format("DD-MMM")}
            onSave={onUpdate}
          />
        </div>
      </Card>
    </>
  );
};

export default ProjectContent;
