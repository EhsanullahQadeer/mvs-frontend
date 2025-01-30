import SamplePage from "pages/sample-page/SamplePage";
import { IRoute } from "./types";



const publicRoutes: IRoute[] = [
  {
    path: "sample/:id",
    name: "Sample Page",
    component: SamplePage,
  },
]

export default publicRoutes;