import HomeFeed from "pages/home";
import IRoute from "../interfaces/route";
import LoginPage from "../pages/login";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/home-feed",
    name: "Home Feed",
    component: HomeFeed,
  },
  
];

export default routes;
