import { Spinner } from "react-bootstrap";
import SingleProject from "../../components/SingleProject";
import ActionButton from "../../components/ActionButton/ActionButton";
import addIcon from "../../../../assets/plus-circle-fill.svg";
import {
  useQuery,
  useMutation,
  useApolloClient,
} from "@apollo/client";
import { GET_PROJECTS } from "../../../../api/queries";
import {
  NEW_PROJECT,
  UPDATE_SPACE,
  DELETE_PROJECT,
} from "../../../../api/mutations";
import styles from "./ProjectList.module.css";
import { useDispatch } from "react-redux";
import { chooseProject } from "../../../../app/SpaceSlide";

const ProjectList = ({ space }) => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  // Query Projects
  const query = {
    query: GET_PROJECTS,
    variables: { spaceId: space.id },
  };
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { spaceId: space.id },
  });
  const [updSpace] = useMutation(UPDATE_SPACE);
  const handleChooseProject = (project) => {
    dispatch(chooseProject(project));
  };

  // Create New Project
  const [creProject, newProject] = useMutation(NEW_PROJECT, {
    update(cache, { data: { addProject } }) {
      const data = cache.readQuery(query);
      cache.writeQuery({
        ...query,
        data: { projects: [...data.projects, addProject] },
      });
    },
  });
  const handleCreate = async () => {
    const newPJ = {
      title: "Click to Edit",
      description: "Click to Edit",
      target: "Click to Edit",
      deadline: Date.now(),
      leader: null,
      members: [],
      progress: 0,
      children: [],
    };
    await creProject({
      variables: {
        parentId: space.id,
        input: newPJ,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addProject: {
          ...newPJ,
          __typename: "Project",
          id: Math.floor(Math.random() * 10000 + ""),
        },
      },
    });
    const element = document.getElementById("click");
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  // Action Button Function
  const [deleteProject] = useMutation(DELETE_PROJECT);
  const movePJ = ({ targetId, type }) => {
    const { projects } = client.readQuery(query);
    const findIndex = projects.findIndex(
      (item) => item.id === targetId
    );
    let newPos;
    switch (type) {
      case "up":
        if (findIndex > 0) {
          newPos = findIndex - 1;
        }
        break;
      case "down":
        if (findIndex < projects.length - 1) {
          newPos = findIndex + 1;
        }
        break;
      case "delete":
        deleteProject({
          variables: { targetId },
        });
        client.writeQuery({
          ...query,
          data: {
            projects: data.projects.filter(
              (project) => project.id !== targetId
            ),
          },
        });
        break;
      default:
    }
    var result = [...projects];
    var z = result[newPos];
    result[newPos] = result[findIndex];
    result[findIndex] = z;
    client.writeQuery({
      ...query,
      data: {
        projects: result,
      },
    });
    const newSpace = {
      id: space.id,
      projects: result.map((project) => project.id),
    };
    updSpace({
      variables: newSpace,
    });
  };

  if (loading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  if (error || newProject.error) return <p>Error Loading</p>;
  const { projects } = data;

  return (
    <div className="m-4 col-lg-10 col-xl-8">
      {projects.map((project) => (
        <div key={project.id} className={styles.projectList}>
          <SingleProject
            project={project}
            action={handleChooseProject}
          />
          <ActionButton id={project.id} movePJ={movePJ} />
        </div>
      ))}
      <div
        className={styles.addChildContainer}
        name="click"
        id="click"
      >
        <img
          src={addIcon}
          alt="add-space"
          className={styles.addChildBtn}
          onClick={handleCreate}
        />
      </div>
    </div>
  );
};

export default ProjectList;
