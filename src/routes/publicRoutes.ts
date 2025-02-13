import SamplePage from "pages/sample-page/SamplePage";
import { IRoute } from "./types";
import PublicProfile from "pages/publicProfile/PublicProfile";



const publicRoutes: IRoute[] = [
  {
    path: "sample/:id",
    name: "Sample Page",
    component: SamplePage,
  },
  {
    path: "/:username",
    name: "Public Profile",
    component: PublicProfile,
  },
]

export default publicRoutes;