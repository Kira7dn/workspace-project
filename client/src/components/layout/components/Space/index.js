// import { useState } from "react";
// import AddSpaceModal from "../components/space/AddSpaceModal";
import { useQuery } from "@apollo/client";
import { getSpaces } from "../../api/queries";
import SpaceList from "./components/SpaceList";
import SpaceContextProvider from "./SpaceContext";
import SpaceModal from "./components/SpaceModal";

const Space = () => {
  const { loading, error, data } = useQuery(getSpaces);
  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error Load books</p>;
  return (
    <SpaceContextProvider>
      <SpaceList spaces={data.spaces} />
      <SpaceModal />
    </SpaceContextProvider>
  );
};

export default Space;
