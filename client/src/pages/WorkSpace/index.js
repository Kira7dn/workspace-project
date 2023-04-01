import { useParams } from "react-router-dom";
import ProjectList from "~/components/ProjectList";

import SpaceDetail from "~/components/SpaceDetail";

function WorkSpace() {
  const params = useParams();
  const { id } = params;

  return (
    <div className="pt-5">
      <div className="mt-5">
        <SpaceDetail spaceId={id} />
        <ProjectList spaceId={id} />
      </div>
    </div>
  );
}

export default WorkSpace;
