import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./SpaceList.module.css";
import addIcon from "~/assets/img/svg/plus-circle-fill.svg";

const SpaceList = ({ spaces, method }) => {
  return (
    <div className="pt-5">
      <Row className="mt-5">
        {spaces.map((space) => {
          const { id, title, description, image, members } = space;
          return (
            <Col key={id} className="mb-2" sm={12} lg={6}>
              <Container
                className={`shadow p-3 ${styles.spaceItem}`}
                border="primary"
                style={{
                  cursor: "default",
                }}
              >
                <Row>
                  <Col className="col-12">
                    <h6 className={styles.spacetitle}>{title}</h6>
                  </Col>
                </Row>
                <Row>
                  <Col xs md lg={3} className="align-items-center">
                    <img
                      src={image}
                      className={`${styles.spaceimg} img-fluid`}
                      alt="img"
                    />
                  </Col>
                  <Col
                    xs
                    md
                    lg={{ span: 5, offset: 4 }}
                    className="align-middle"
                  >
                    {/* <ActionButtons method={method} space={space} /> */}
                  </Col>
                </Row>
                <Row className="">
                  {/* <Col md={8} className=""> */}
                  {/* <p className={styles.spacedesc}>{description}</p> */}
                  {/* </Col> */}
                </Row>
                <Row>
                  <p className="mb-0">{`Team (${members.length})`}</p>

                  <span className={`${styles.teamlist}`}>
                    {members.map((member) => {
                      return (
                        <span key={member.id} className={styles.memberinfo}>
                          <img
                            src={member.avatar}
                            className={styles.memberavatar}
                            alt=""
                          />
                          <div className={styles.membername}>
                            {member.fullname}
                          </div>
                        </span>
                      );
                    })}
                  </span>
                </Row>
              </Container>
            </Col>
          );
        })}
        <Col className="mb-2" sm={12} lg={6}>
          <div className={styles.addBtn}>
            <img src={addIcon} alt="add-space" className={styles.addBtnIcon} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SpaceList;
