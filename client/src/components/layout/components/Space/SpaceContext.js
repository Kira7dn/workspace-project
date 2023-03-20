import { createContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DELETE_SPACE,
  CREATE_SPACE,
  UPDATE_SPACE,
} from "../../api/mutations";
import { getSpaces } from "../../api/queries";
import { chooseSpace } from "../../app/SpaceSlide";

export const SpaceContext = createContext();
const SpaceContextProvider = ({ children }) => {
  // Avatar for space context
  const spaceAvatars = [
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/1376523.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/1535019.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/2622923.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/2645216.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/2666522.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/2888393.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/3059165.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/3094918.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/3135727.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/3135771.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/3153391.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/3264765.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/3281412.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/3898826.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/5371115.png",
    "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/6932391.png",
  ];
  // State
  const [showSpaceModal, setShowSpaceModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [Space, setSpace] = useState({
    title: "",
    description: "",
    image:
      "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/6932391.png",
    members: [],
  });
  const onChangeSpace = (event) => {
    setSpace({
      ...Space,
      [event.target.name]: event.target.value,
    });
  };
  const onEditSpace = (space) => {
    setSpace(space);
    setShowSpaceModal(true);
  };
  const resetSpace = () => {
    setSpace({
      title: "",
      description: "",
      image:
        "https://workspaceimgsample.s3.ap-southeast-1.amazonaws.com/sampleImg/6932391.png",
      members: [],
    });
    setShowSpaceModal(false);
  };
  const convertSpace = (space) => {
    const { title, description, image, members, projects } = space;
    let newSpace = { title, description, image };
    if (members) {
      newSpace.members = members.map((member) => member.id);
    }
    if (projects) {
      newSpace.projects = projects.map((project) => project.id);
    }
    return newSpace;
  };
  const [delSpace] = useMutation(DELETE_SPACE);
  const [creSpace] = useMutation(CREATE_SPACE);
  const [updSpace] = useMutation(UPDATE_SPACE);
  const handleCreate = (space) => {
    creSpace({
      variables: { input: convertSpace(space) },
      refetchQueries: [{ query: getSpaces }],
    });
  };
  const handleUpdate = (space) => {
    updSpace({
      variables: {
        updateSpaceId: space.id,
        input: convertSpace(space),
      },
      refetchQueries: [{ query: getSpaces }],
    });
  };
  const handleDelete = (id) => {
    delSpace({
      variables: { id },
      refetchQueries: [{ query: getSpaces }],
    });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSelect = (space) => {
    dispatch(chooseSpace(space));
    navigate("/project");
  };

  //   const handleShow = (status) => {
  //     (setShowAddMembersModal(status));
  //   };
  //   const [showUpdateSpaceModal, setShowUpdateSpaceModal] =
  //     useState(false);
  //   const [showAddMembersModal, setShowAddMembersModal] =
  //     useState(false);
  //   const [preMembers, setPreMembers] = useState([]);
  // Space context data
  const spaceContextData = {
    spaceAvatars,
    showSpaceModal,
    setShowSpaceModal,
    onChangeSpace,
    resetSpace,
    onEditSpace,
    handleDelete,
    handleCreate,
    handleUpdate,
    handleSelect,
    Space,
    setSpace,
    showMemberModal,
    setShowMemberModal,
  };
  return (
    <SpaceContext.Provider value={spaceContextData}>
      {children}
    </SpaceContext.Provider>
  );
};
export default SpaceContextProvider;
