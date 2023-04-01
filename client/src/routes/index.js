import Home from "~/pages/Home";
import Project from "~/pages/Project";
import UserInfo from "~/pages/UserInfo";
import WorkSpace from "~/pages/WorkSpace";
import { HeaderOnly } from "~/components/layout";
import NotFound from "~/pages/NotFound";

const privateRoutes = [
  { path: "/", component: Home },
  { path: "/project", component: Project },
  {
    path: "/user-info",
    component: UserInfo,
    layout: HeaderOnly,
  },
  { path: "/work-space/:id", component: WorkSpace },
  { path: "*", component: NotFound },
];
const publicRoutes = [];
export { publicRoutes, privateRoutes };
