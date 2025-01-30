/*************************************************************************
 * @file OnBoarding.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the page after registration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/
import { useEffect, useState } from "react";
import crownIcon2 from "../../assets/icons/crownIcon2.svg";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import UserType from "./components/UserType";
import PersonalInformation from "./components/PersonalInformation";
import MusicIdentity from "./components/MusicIdentity";
import UploadSampleSection from "./components/UploadSampleSection";
import PricingSection from "./components/PricingSection";
import ConncectWithPeople from "./components/ConncectWithPeople";
import PaidSection from "./components/PaidSection";
import UserPersonalInformation from "./components/UserPersonalInformation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addNewUser, verifyAndRetrieveInviteCodeDetails } from "api/user";
import { INewUserForm } from "./components/types";
import InvalidCodeMessage from "./components/InvalidCodeExpired";
import WelcomePage from "./components/WelcomePage";
import { registerAPI } from "api/auth";
import { useDispatch } from "react-redux";
import { login } from "redux/actions";
import LoadingScreen from "components/SampleContainer/components/loading";

const OnBoarding = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [isValidCode, setIsValidCode] = useState(null);
  const [checkingInviteCodeValidity, setCheckingInviteCodeValidity] = useState(true);
  const [userType, setUserType] = useState("");
  const [isPartner, setIsPartner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null)
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName]   = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const errorParam = searchParams.get('error');
  const firstNameParam = searchParams.get('userFirstName');
  const lastNameParam = searchParams.get('userLastName');
  const numberOfTabs = isPartner ? 5 : 4;
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [openTab, setOpenTab] = useState<string | null>(null);
  const completeProgress = (completedSections.length / numberOfTabs) * 100;
  const [followUsers, setFollowUsers] = useState([]);
  const [connectUsers, setConnectUsers] = useState([]);
  const [formData, setFormData] = useState<INewUserForm>({});
  const dispatch: any = useDispatch();

  useEffect(() => {
    const checkInviteCode = async () => {
      if (id) {
        try {
          const response = await verifyAndRetrieveInviteCodeDetails(id);
          if (response?.data?.error) {
            setIsValidCode(false);
          } else if (response?.data?.results?.user_type) {
            const user_type = response.data.results.user_type;
            setIsPartner(user_type === "partner");
            setIsValidCode(true);
            setUserType(user_type);
            setUserEmail(response?.data?.results?.email);
            setUserFirstName(response?.data?.results?.first_name);
            setUserLastName(response?.data?.results?.last_name);
          } else {
            setIsValidCode(false);
            setUserEmail(response?.data?.results?.email);
            setUserFirstName(response?.data?.results?.first_name);
            setUserLastName(response?.data?.results?.last_name);
          }
        } catch (error) {
          console.error("Error verifying invite code:", error);
          setIsValidCode(false);
        } finally {
          setCheckingInviteCodeValidity(false);
        }
      }
    };
  
    checkInviteCode();
  }, [id]);

  const toggleTab = (tabId: string) => {
    const currentIndex = sections.findIndex(section => section.id === tabId);
    if (currentIndex === 0 || completedSections.includes(sections[currentIndex - 1].id)) {
      setOpenTab(openTab === tabId ? null : tabId);
    } else {
      console.log("You must complete the previous section first.");
    }
  };

  const markSectionAsCompleted = (tabId: string) => {
    if (!completedSections.includes(tabId)) {
      setCompletedSections([...completedSections, tabId]);
    }
    const currentIndex = sections.findIndex((section) => section.id === tabId);
    const nextSection = sections[currentIndex + 1];
    if (nextSection && nextSection.id !== "paidSection") {
      setOpenTab(nextSection.id);
    }
  };

  useEffect(() => {
    const submitAndRedirect = async () => {
      setLoading(true);
      if (!isPartner && completedSections.length === numberOfTabs) {
        await handleSubmitForm();
        const email = userEmail;
        const password = formData.password;
        localStorage.removeItem("persist:root");
        dispatch(
          login({
            email,
            password,
          })
        );
        navigate("/home");
      }
      else if (isPartner && completedSections.length === numberOfTabs) {
        const user = await handleSubmitForm();
        console.log('user', user);
        setUser(user);
        localStorage.removeItem("persist:root");
        setOpenTab("paidSection");
      }
      setLoading(false);
    };
    submitAndRedirect();
  }, [completedSections, numberOfTabs, isPartner, navigate, formData]);

  const handleSubmitForm = async () => {
    try {
      const firstName = userFirstName;
      const email = userEmail;
      const lastName = userLastName;
      const body = {
        email,
        firstName,
        lastName,
        ...formData,
        follow_users: followUsers,
        connect_users: connectUsers,
        stripe_connect_info: "",
        bio: formData.bio || "",
      };
      const response = await addNewUser(body);
      localStorage.removeItem("user");
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const commonSections = [
    {
      id: "userType",
      title: "User Type",
      component: (
        <UserType
          {...{
            markSectionAsCompleted: () => markSectionAsCompleted("userType"),
            formData,
            setFormData,
          }}
        />
      ),
    },
    {
      id: "personalInformation",
      title: "Tell us about yourself",
      component: isPartner ? (
        <PersonalInformation
          {...{
            markSectionAsCompleted: () =>
              markSectionAsCompleted("personalInformation"),
            formData,
            setFormData,
          }}
        />
      ) : (
        <UserPersonalInformation
          {...{
            markSectionAsCompleted: () =>
              markSectionAsCompleted("personalInformation"),
            formData,
            setFormData,
          }}
        />
      ),
    },
    {
      id: "musicIdentity",
      title: "Define your music identity",
      component: (
        <MusicIdentity
          {...{
            isPartner,
            markSectionAsCompleted: () =>
              markSectionAsCompleted("musicIdentity"),
            formData,
            setFormData,
          }}
        />
      ),
    },
    {
      id: "connectWithPeople",
      title: "Connect with people based on your preferences",
      component: (
        <ConncectWithPeople
          {...{
            isActive: openTab === "connectWithPeople",
            markSectionAsCompleted: () =>
              markSectionAsCompleted("connectWithPeople"),
            setFollowUsers,
            isPartner,
            setConnectUsers,
          }}
        />
      ),
    },
  ];

  const partnerSections = [
    {
      id: "setPrices",
      title: "Set your prices",
      component: (
        <PricingSection
          {...{
            markSectionAsCompleted: () => markSectionAsCompleted("setPrices"),
            formData,
            setFormData,
          }}
        />
      ),
    },
    {
      id: "paidSection",
      title: "Now, let's set up how you get paid",
      component: (
        <PaidSection
          user={user}
          markSectionAsCompleted={() => markSectionAsCompleted("paidSection")}
          handleSkip={() => navigate(`/onboarding/?error=false&userFirstName=${userFirstName}&userLastName=${userLastName}`)}
        />
      ),
    },
  ];

  const sections = [...commonSections];
  if (isPartner) sections.splice(4, 0, ...partnerSections);

  if (!isValidCode) {
    if (id === "true" || id === "false" || 
        (errorParam === "false" && firstNameParam && lastNameParam)) {
      return <WelcomePage />;
    } else {
        return <InvalidCodeMessage />;
    }
  }

  return (
    <div className="py-10 px-11 flex flex-col gap-4">
      {loading && <LoadingScreen />}
      <div className="border border-eclipseGray bg-darkGray rounded-lg p-5">
        <div className="flex">
          <div className="flex-1">
            <h1 className="text-[28px] text-white leading-[34px] font-semibold -tracking-[2%]">
              Get Started
            </h1>
            <div className="max-w-[458px] mt-3 mb-5">
              <p className="text-mediumGray text-sm font-normal">
                Set up your account to unlock the full potential of MVSSIVE.
                This page will remain accessible until you’ve completed all the
                steps.
              </p>
            </div>

            <div className="flex gap-2 items-center justify-between">
              <div className="flex items-center gap-3 py-1">
                <div className="w-[291px] bg-charcoalGray rounded-full h-2 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-limeGreen transition-all duration-300 ease-in-out"
                    style={{ width: `${completeProgress}%` }}
                  ></div>
                </div>
                <div className="flex">
                  <span className="text-silver text-sm font-normal">
                    {completedSections.length}/{numberOfTabs} completed
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[215px] flex justify-center items-center">
            <img
              src={crownIcon2}
              alt="crownIcon"
              className="w-[117px] h-[83px]"
            />
          </div>
        </div>
      </div>

      {sections.map((section, index) => {
        const isAccessible = index === 0 || completedSections.includes(sections[index - 1].id);

        return (
          <div
            key={section.id}
            className={`border border-eclipseGray bg-darkGray rounded-lg px-5 py-7 ${
              !isAccessible ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {/* Section Header */}
            <div
              onClick={() => isAccessible && toggleTab(section.id)} // Only toggle if the section is accessible
              className={`flex justify-between items-center cursor-pointer ${
                !isAccessible ? "pointer-events-none" : ""
              }`}
            >
              <div className="flex-1 flex gap-2">
                <div
                  className={`w-7 h-7 rounded-[20px] text-xl leading-6 font-semibold flex justify-center items-center transition-all duration-300 ${
                    openTab === section.id || completedSections.includes(section.id)
                      ? "bg-limeGreen text-black"
                      : "bg-charcoalGray text-eclipseGray"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-[19px] text-dimGray font-semibold">
                  {section.title}
                </span>
              </div>
              <div className="text-coolGray w-6 h-6 flex justify-center items-center">
                {openTab === section.id ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>

            {/* Section Content */}
            <div
              className={`relative transition-all duration-300 ${
                openTab === section.id
                  ? "max-h-auto mt-3 block opacity-100 z-10"
                  : "max-h-0 mt-0 hidden opacity-0 -z-10"
              }`}
            >
              {section.component}
              {index > 0 && section.id !== "paidSection" && (
                <button
                  className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={() => setOpenTab(sections[index - 1].id)} // Navigate to the previous section
                >
                  Back
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OnBoarding;
