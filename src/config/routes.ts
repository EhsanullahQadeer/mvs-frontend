import IRoute from "../interfaces/route";
import LoginPage from "../pages/login";
import SignupPage from "pages/Signup/signup";
import RequestInfoPage from "pages/Signup/TalentProfiles/request-info";
import ThankyouPage from "pages/thankyou";
import ForgotPasswordPage from "pages/forgot-password";
import CompleteProfilePage from "pages/complete-profile";
import HomeFeed from "pages/home";
import TermsOfService from "pages/terms";
import SamplesPage from "pages/samples";
import MyLikesPage from "pages/my-likes";
import MyDownloadsPage from "pages/downloaded-samples";
import ProfilePage from "pages/ProfilePage";
const routes: IRoute[] = [
  {
    path: "/home",
    name: "Home",
    component: HomeFeed,
  },
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: '/user/:username',
    name: 'Profile',
    component: ProfilePage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupPage,
  },
  {
    path: "/request-info",
    name: "Request Info",
    component: RequestInfoPage,
  },
  {
    path: "/thank-you",
    name: "Thank you",
    component: ThankyouPage,
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: ForgotPasswordPage,
  },

  {
    path: "/new-password",
    name: "New Password",
    component: ForgotPasswordPage,
  },

  {
    path: "/forgot-password-success",
    name: "Forgot Password Success",
    component: ForgotPasswordPage,
  },

  {
    path: "/complete-profile",
    name: "Complete Profile",
    component: CompleteProfilePage,
  },

  {
    path: "/forgot-password/reset",
    name: "Forgot Password",
    component: ForgotPasswordPage,
  },
  {
    path: "/terms-of-service",
    name: "Terms of Service",
    component: TermsOfService,
  },
  {
    path: "/sound/samples/:id",
    name: "Samples",
    component: SamplesPage,
  },
  {
    path: "/sounds",
    name: "Sounds",
    component: HomeFeed,
  },
  
  {
    path: "/my/likes",
    name: "Likes",
    component: MyLikesPage,
  },

  {
    path: "/my/downloads",
    name: "Downloads",
    component: MyDownloadsPage,
  },
  {
    path: "/sound/vocals/:id",
    name: "Vocals",
    component: SamplesPage,
  },
];

export default routes;
