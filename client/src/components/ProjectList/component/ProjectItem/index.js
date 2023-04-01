import { Col, ProgressBar, Row, ListGroup } from "react-bootstrap";
import moment from "moment";
import deadlineIcon from "~/assets/img/jpg/deadline.png";
import projectIcon from "~/assets/img/jpg/project-title.png";
import styles from "./ProjectItem.module.scss";

const ProjectItem = ({ project }) => {
  const { title, deadline, leader, members, children, progress, target } =
    project;
  return (
    <>
      <div className={`ms-2 me-auto ${styles.childContainer}`}>
        <div className="p-2">
          <div className="mb-4">
            <Row>
              <Col className={`${styles.projectlistitemtitle} col-6 p-0`}>
                <img
                  src={projectIcon}
                  alt="project"
                  className={`${styles.projectIcon} col-4`}
                />
                <p className={`${styles.projectlistitemcontent} text-primary`}>
                  {title}
                </p>
              </Col>
              <Col
                className={`${styles.projectlistitemprogresscontainer} col-6`}
              >
                <ProgressBar
                  className={`p-0 ${styles.projectlistitemprogressbar}`}
                  animated
                  variant="success"
                  now={progress}
                  label={`Progress: ${progress}%`}
                />
              </Col>
            </Row>
          </div>
          <div className="p-0">
            <Row>
              <Col className="col-4">
                <div className={styles.projectlistitemtarget}>
                  <h5 className={styles.projectlistitemtargettitle}>Target</h5>
                  <p className={styles.projectlistitemtargetcontent}>
                    {target}
                  </p>
                </div>
              </Col>
              <Col className="col-2 p-0">
                <Row className={`${styles.leaderContainer} mx-0`}>
                  <h5 className={styles.leaderTitle}>
                    {`Team (${members ? members.length : 0 + leader ? 1 : 0})`}
                  </h5>
                </Row>

                <div className={styles.MemberContainer}>
                  <div className={styles.leaderInfo}>
                    {leader ? (
                      <>
                        <img
                          src={leader ? leader.avatar : ""}
                          alt={leader.username}
                          className={`${styles.leaderAvatar} col-4`}
                        />
                        <div
                          className={`${styles.leaderName} col-8 text-primary`}
                        >
                          {leader.fullname}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  {members
                    ? members.map((member) => {
                        return (
                          <div
                            key={member.id}
                            className={styles.projectlistitemmemberinfo}
                          >
                            <img
                              src={member.avatar}
                              alt={member.username}
                              className={styles.projectlistitemmemberavatar}
                            />
                            <div
                              className={`${styles.projectlistitemmembername} text-secondary`}
                            >
                              {member.fullname}
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </Col>
              <Col className="col-6 justify-content-end">
                <div className={styles.projectlistitemactionitemlist}>
                  <h5 className={styles.ActionTitle}>
                    {`Action Item List (${children.length})`}
                  </h5>
                  <ListGroup as="ol" className={styles.actionItems} numbered>
                    {children.map((child) => (
                      <ListGroup.Item
                        as="li"
                        key={child.id}
                        className={styles.actionItem}
                      >
                        <div className={`col-6 ${styles.ActionItemTitle}`}>
                          {child.title}
                        </div>
                        <div
                          className={`${styles.projectlistitemchildprogresscontainer} col-6`}
                        >
                          <ProgressBar
                            className={styles.projectlistitemchildprogressbar}
                            animated
                            variant="success"
                            now={child.progress}
                            label={`${child.progress}%`}
                            style={{
                              alignItems: "center",
                              textAlign: "center",
                              lineHeight: "24px",
                              fontSize: "16px",
                              height: "24px",
                            }}
                          />
                        </div>
                        <div
                          className={`${styles.projectlistitemchilddeadlinetag} col-2`}
                        >
                          <h5
                            className={`${styles.projectlistitemchilddeadlinecontent} text-danger`}
                          >
                            {moment(child.deadline).format("DD-MMM")}
                          </h5>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className={styles.projectlistitemdeadlinetag}>
          <img
            src={deadlineIcon}
            alt="deadline"
            className={`${styles.projectlistitemdeadlineicon} col-4`}
          />
          <div
            className={`${styles.projectlistitemdeadlinecontent} text-danger`}
          >
            {moment(deadline).format("DD-MMM")}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectItem;
