import { useSelector } from "react-redux";
import {
  spaceSelector,
  projectSelector,
  projectsSelector,
} from "../../app/SpaceSlide";
import PathBar from "./components/PathBar";
import ProjectList from "./pages/ProjectList";
import ProjectDetail from "./pages/ProjectDetail";
import { Container, Row } from "react-bootstrap";

const Project = () => {
  const space = useSelector(spaceSelector);
  const project = useSelector(projectSelector);
  const projects = useSelector(projectsSelector);
  let body = null;
  if (projects.length > 0 && project) {
    body = <ProjectDetail projectId={project.id} />;
  } else {
    body = <ProjectList space={space} />;
  }
  return (
    <Container className="pt-5">
      <Row className="pt-5">
        <PathBar />
      </Row>
      <Row>{body}</Row>
    </Container>
  );
};
export default Project;
