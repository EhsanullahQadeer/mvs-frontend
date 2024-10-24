/*************************************************************************
 * @file routes.ts
 * @author End Quote
 * @desc Configuration of all application routes.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import LoginPage from "./login";
import SignupPage from "pages/Signup/signup";
import RequestInfoPage from "pages/Signup/TalentProfiles/request-info";
import ThankyouPage from "pages/thankyou";
import Home from "./home/Home";
import TermsOfService from "pages/terms";
import SamplesPage from "pages/samples";
import MyLikesPage from "pages/my-likes";
import MyDownloadsPage from "pages/downloaded-samples";
import ProfilePage from "pages/ProfilePage";
import InboxPage from "pages/Inbox";
import StripeCallback from "pages/StripeCallback";
import CheckScrolling from "./CheckScrolling";
import ArtistProfile from "./profile/ArtistProfile";
import ArtistWikiProfile from "./wiki-profile/ArtistWikiProfile";
import AccountSetting from "./settings/account/AccountSetting";
import ContentManagement from "./settings/content-management/ContentManagement";
import SettingsLayout from "./settings/SettingsLayout";
import OnBoarding from "./onboarding/OnBoarding";
import CreatorLogin from "./creator/CreatorLogin";
import PartnerSubmission from "./creator/registeration/component/PartnerSubmission";
import Registeration from "./creator/registeration";
import ForgetPassword from "./creator/forgetPasword";
import ChangePassword from "./creator/ChangePassword/ChangePassword";
import Onboarding from "components/onBoarding/onboard";
import ForgotPassword from "./creator/forgetPasword";
import Registration from "./creator/registeration";

interface IRoute {
  path: string;
  name: string;
  component: any;
  props?: any;
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/check-scrolling",
    name: "CheckScrolling",
    component: CheckScrolling,
  },
  {
    path: "/profile/:username",
    name: "Profile",
    component: ProfilePage,
  },

  // Onboarding ==========================================================================
  {
    path: "/",
    name: "Login",
    component: CreatorLogin,
  },
  {
    path: "/login",
    name: "Login",
    component: CreatorLogin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Registration,
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: ForgetPassword,
  },
  {
    path: "/forgot-password-sent",
    name: "Forgot Password",
    component: ForgetPassword,
  },
  {
    path: "/new-password/:id",
    name: "New Password",
    component: ChangePassword,
  },
  {
    path: "/password-changed-successfully",
    name: "New Password",
    component: ChangePassword,
  },
  {
    path: "/onboarding/:id",
    name: "Onboarding",
    component: OnBoarding,
  },
  // ===================================================================================== 


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





  // Inbox 
  {
    path: "/inbox",
    name: "Inbox",
    component: InboxPage,
  },

  // {
  //   path: "/forgot-password",
  //   name: "Forgot Password",
  //   component: ForgotPasswordPage,
  // },

  // {
  //   path: "/new-password",
  //   name: "New Password",
  //   component: ForgotPasswordPage,
  // },

  // {
  //   path: "/forgot-password-success",
  //   name: "Forgot Password Success",
  //   component: ForgotPasswordPage,
  // },

  // {
  //   path: "/forgot-password/reset",
  //   name: "Forgot Password",
  //   component: ForgotPasswordPage,
  // },
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
    path: "/stripe/callback",
    name: "Stripe Connect Redirect",
    component: StripeCallback,
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
  {
    path: "/artist-wiki-profile/:spotify_artist_id",
    name: "Artist Profile",
    component: ArtistWikiProfile,
  },
  {
    path: "/artist-profile/:username",
    name: "Artist Profile",
    component: ArtistProfile,
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsLayout,
    children: [
      {
        path: "account/:id",
        name: "Account Settings",
        component: AccountSetting,
      },
      {
        path: "content-management/:id",
        name: "Content Management",
        component: ContentManagement,
      },
    ],
  },
];

export default routes;
