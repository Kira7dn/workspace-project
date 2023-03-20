import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useQuery,
  useMutation,
  useApolloClient,
} from "@apollo/client";
import { GET_PROJECT, GET_FRIENDS } from "../../../../api/queries";
import { UPDATE_PROJECT } from "../../../../api/mutations";
// import {} from "../../../store/reducer/ProjectSlice";
import ProjectContent from "../../components/ProjectContent";
// import ChildrenProject from "../../components/ChildrenProject";
import MemberModal from "../../../../components/MemberModal";
import AddLeaderModal from "../../../../components/AddLeaderModal";
// import styles from "./ProjectContent.module.css";
// import addIcon from "../../../../assets/plus-circle-fill.svg";

const ProjectDetail = ({ projectId }) => {
  // const project = useSelector(projectSelector);
  const dispatch = useDispatch();
  const client = useApolloClient();

  // Query Project
  const query = {
    query: GET_PROJECT,
    variables: { projectId },
  };
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { projectId },
  });
  // Convert Project
  const convertProject = (project) => {
    const {
      title,
      description,
      target,
      deadline,
      progress,
      leader,
      members,
      children,
    } = project;
    let newProject = {
      title,
      description,
      target,
      deadline,
      progress,
    };
    if (leader) {
      newProject.leader = leader.id;
    }
    if (members) {
      newProject.members = members.map((member) => member.id);
    }
    if (children) {
      newProject.children = children.map((project) => project.id);
    }
    return newProject;
  };
  // Update Project
  const [updSpace, newProject] = useMutation(UPDATE_PROJECT, {
    update(cache, { data: { updateProject } }) {
      cache.writeQuery({
        ...query,
        data: { project: updateProject },
      });
    },
  });
  const handleUpdate = () => {
    const { project } = client.readQuery(query);
    updSpace({
      variables: {
        projectId: project.id,
        input: convertProject(project),
      },
    });
  };
  const changeStore = (updatedProject) => {
    client.writeQuery({
      ...query,
      data: {
        project: updatedProject,
      },
    });
  };
  const changeStoreItem = (item) => {
    // const { project } = client.readQuery(query);
    client.writeQuery({
      ...query,
      data: {
        project: { ...project, ...item },
      },
    });
    handleUpdate();
    setShowLeaderModal(false);
    setShowMemberModal(false);
  };
  // Add Children Project
  const clickHandler = async (event) => {
    // const addProject = { parents: [id] };
    // await dispatch(newProject(addProject));
    // const element = document.getElementById("click");
    // element.scrollIntoView({
    //   behavior: "smooth",
    //   block: "end",
    //   inline: "nearest",
    // });
  };
  // Leader/Member Modal
  const [showLeaderModal, setShowLeaderModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  //   const [project, setProject] = useState(data.project);
  const handleModal = (status, type) => {
    switch (type) {
      case "leader":
        setShowLeaderModal(status);
        break;
      case "member":
        setShowMemberModal(status);
        break;
      default:
        break;
    }
  };
  const { user } = client.readQuery({
    query: GET_FRIENDS,
  });
  const { friends } = user;
  if (loading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  if (error) return <p>Error Loading</p>;
  const { project } = data;
  return (
    <>
      <ProjectContent
        project={project}
        change={changeStore}
        update={handleUpdate}
        handleModal={handleModal}
      />
      {/* <AddMemberModal /> */}
      <AddLeaderModal
        show={showLeaderModal}
        list={friends}
        current={project.leader}
        change={changeStoreItem}
        toggle={setShowLeaderModal}
      />
      <MemberModal
        show={showMemberModal}
        list={friends}
        current={project.members}
        change={changeStoreItem}
        toggle={setShowMemberModal}
      />

      {/* <div className="d-flex row justify-content-end">
         {projectDetail.children ? (
          <ChildrenProject children={projectDetail.children} />
        ) : (
          ""
        )}
        <div
          className={styles.addChildContainer}
             onClick={clickHandler}
          name="click"
          id="click"
        >
          <img
            src={addIcon}
            alt="add-space"
            className={styles.addChildBtn}
          />
        </div>
        </div> */}
    </>
  );
};

export default ProjectDetail;
