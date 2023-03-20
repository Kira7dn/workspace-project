import { useSelector, useDispatch } from "react-redux";
import {
  getUserInfo,
  userSelector,
  loadingSelector,
} from "../../app/AuthSlice";
import { useEffect } from "react";
import { Spinner, Col } from "react-bootstrap";

const User = () => {
  const loading = useSelector(loadingSelector);
  const userInfo = useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  let body = null;
  if (loading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else body = <h1>Hello {userInfo.username}</h1>;
  return (
    <Col md={8} sm={12}>
      {body}
    </Col>
  );
};

export default User;
