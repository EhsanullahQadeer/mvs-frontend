/*************************************************************************
 * @file routes.ts
 * @author End Quote
 * @desc Configuration of all application routes.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import RequestInfoPage from "pages/Signup/TalentProfiles/request-info";
import ThankyouPage from "pages/thankyou";
import Home from "./home/Home";
import TermsAndConditions from "pages/terms";
import SamplesPage from "pages/samples";
import Library from "pages/library/library";
import MyLikesPage from "pages/library/components/my-likes";
import MyDownloadsPage from "pages/library/components/my-downloads";
import InboxPage from "pages/Inbox";
import StripeCallback from "pages/StripeCallback";
import CheckScrolling from "./CheckScrolling";
import ArtistProfile from "./profile/ArtistProfile";
//Settings
import ArtistWikiProfile from "./wiki-profile/ArtistWikiProfile";
import AccountSetting from "./settings/account/AccountSetting";
import ContentManagement from "./settings/ContentManager/ContentManagement";
import SettingsLayout from "./settings/SettingsLayout";
import BillingLayout from "./settings/billing/BillingSettings";
import OnBoarding from "./onboarding/OnBoarding";
import SecuritySettings from "./settings/security/SecuritySettings";
import CreatorLogin from "./creator/CreatorLogin";
import Registeration from "./creator/registeration";
import ForgetPassword from "./creator/forgetPasword";
import ChangePassword from "./creator/ChangePassword/ChangePassword";
import Notifications from "./settings/notifications/Notifications";
import Privacy from "./settings/privacy/Privacy";
import Monetization from "./settings/monetization/Monetization";
import Registration from "./creator/registeration";
import WelcomePage from "./onboarding/components/WelcomePage";
import EngineerProfile from "./engineerProfile/EngineerProfile";
import MembershipsConnects from "./settings/memberships-connects/MembershipsConnects";
import Plans from "./settings/plans/Plans";
import CreditsHistory from "./settings/credits-history/CreditsHistory";
import Notification from "components/ui/Header/molecules/notifications/NotificationList"
import ForgotPassword from "./creator/forgetPasword";
import CollaboratorRequest from "./collaborator-request/CollaboratorRequest";

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
  {
    path: "/onboarding/",
    name: "Onboarding",
    component: WelcomePage,
  },
  // =====================================================================================

  {
    path: "/request-info",
    name: "Request Info",
    component: RequestInfoPage,
  },
  {
    path: "/inbox/:id?",
    name: "Inbox",
    component: InboxPage,
  },
  {
    path: "/inbox/:id?/:thread?",
    name: "Inbox",
    component: InboxPage,
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
    component: TermsAndConditions,
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
    path: "/library",
    name: "Library",
    component: Library,
    children: [
      {
        path: "my/likes",
        name: "Likes",
        component: MyLikesPage,
      },

      {
        path: "my/downloads",
        name: "Downloads",
        component: MyDownloadsPage,
      },
    ],
  },
  {
    path: "/sound/vocals/:id",
    name: "Vocals",
    component: SamplesPage,
  },
  {
    path: "/wiki/:spotify_artist_id",
    name: "Artist Profile",
    component: ArtistWikiProfile,
  },
  {
    path: "/profile/:username",
    name: "Artist Profile",
    component: ArtistProfile,
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsLayout,
    children: [
      {
        path: "account",
        name: "Account Settings",
        component: AccountSetting,
      },
      {
        path: "content-management",
        name: "Content Management",
        component: ContentManagement,
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
      },
      {
        path: "privacy",
        name: "Privacy",
        component: Privacy,
      },
      {
        path: "monetization",
        name: "Monetization",
        component: Monetization,
      },
      {
        path: "security",
        name: "Security",
        component: SecuritySettings,
      },
      {
        path: "billing",
        name: "Billing",
        component: BillingLayout,
      },
      {
        path: "memberships",
        name: "Memberships & Connects",
        component: MembershipsConnects,
      },
    ],
  },
  {
    path: "/settings/plans",
    name: "Plans",
    component: Plans,
  },
  {
    path: "/settings/credits-history",
    name: "CreditsHistory",
    component: CreditsHistory,
  },
  {
    path: "/onboarding",
    name: "Onboarding",
    component: OnBoarding,
  },
  {
    path: "/creator/login",
    name: "Login",
    component: CreatorLogin,
  },
  {
    path: "/creator/signup",
    name: "signup",
    component: Registeration,
  },
  {
    path: "creator/forgot-password",
    name: "Forgot Password",
    component: ForgetPassword,
  },
  {
    path: "creator/forgot-password-verification",
    name: "Forgot Password",
    component: ForgetPassword,
  },
  {
    path: "creator/new-password",
    name: "New Password",
    component: ChangePassword,
  },
  {
    path: "creator/new-password-success",
    name: "New Password",
    component: ChangePassword,
  },
  {
    path: "engineer-profile",
    name: "Engineer Profile",
    component: EngineerProfile,
  },
  {
    path: "/notification/:type",
    name: "Audio Message Notification",
    component: Notification,
  },
  {
    path: "/collaborator-request/:collaborationId",
    name: "Collaborator Request",
    component: CollaboratorRequest,
  },
 
];

export default routes;
