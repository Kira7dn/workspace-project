import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  spaceSelector,
  projectsSelector,
  chooseProject,
  chooseSpace,
} from "../../../../app/SpaceSlide";
import styles from "./PathBar.module.css";
const PathBar = () => {
  const dispatch = useDispatch();
  const space = useSelector(spaceSelector);
  const path = useSelector(projectsSelector);

  const selectItem = (project) => {
    dispatch(chooseProject(project));
  };
  const selectSpace = () => {
    dispatch(chooseSpace(space));
  };
  return (
    <ButtonGroup
      aria-label="Basic example"
      className={`${styles.pathBar} col-8`}
    >
      <Button
        variant="primary"
        key={space.id}
        onClick={selectSpace.bind(this, space.id)}
        as={Link}
        to="/project"
        className={styles.pathBarSpace}
      >
        {space.title}
      </Button>
      {path.map((project) => (
        <Button
          variant="secondary"
          key={project.id}
          onClick={selectItem.bind(this, project)}
          className="path-bar-project"
        >
          {project.title}
        </Button>
      ))}
    </ButtonGroup>
  );
};
export default PathBar;
