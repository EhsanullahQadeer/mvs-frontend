import IRoute from "../interfaces/route";
import LoginPage from "../pages/login";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  
];

export default routes;
