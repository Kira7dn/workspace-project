import { useQuery } from "@apollo/client";
import styles from "./ProjectList.module.scss";
import { GET_PROJECTS } from "~/api/queries";
import Spinner from "~/components/Spinner";
import classNames from "classnames/bind";
import ProjectItem from "./component/ProjectItem";

const cx = classNames.bind(styles);
const ProjectList = ({ spaceId }) => {
  const { data, loading } = useQuery(GET_PROJECTS, {
    variables: {
      spaceId: spaceId,
    },
  });
  if (loading) return <Spinner />;
  const projects = data.projects;
  return (
    <div>
      {projects.map((project, index) => (
        <ProjectItem project={project} key={index} />
      ))}
      <h2>Projects</h2>
    </div>
  );
};

export default ProjectList;
