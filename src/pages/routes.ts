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
import ForgotPasswordPage from "pages/forgot-password";
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
import AccountSetting from "./settings/account/AccountSetting";

interface IRoute {
  path: string;
  name: string;
  component: any;
  props?: any;
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
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: '/profile/:username',
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
    path: "/inbox",
    name: "Inbox",
    component: InboxPage,
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
    path: "/stripe/callback",
    name: "Stripe Connect Redirect",
    component: StripeCallback
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
    component: ArtistProfile,
  },
  {
    path: "/artist-profile/:username",
    name: "Artist Profile",
    component: ArtistProfile,
  },
  {
    path: "/account-settings/:id",
    name: "Account Settings",
    component: AccountSetting,
  },
];

export default routes;
