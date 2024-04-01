import HomeFeed from "pages/home";
import IRoute from "../interfaces/route";
import LoginPage from "../pages/login";
import Producer from "pages/producer";
import Songwrtier from "pages/songwriter";

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
  {
    path: "/producer",
    name: "Producer",
    component: Producer,
  },

  {
    path: "/songwriter",
    name: "Songwriter",
    component: Songwrtier,
  },
  
];

export default routes;
