import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup"; // for validation
import { RiLockLine } from "react-icons/ri";
import logo from "../../../assets/img/M-logo.png";
import ChangeSuccessfully from "./ChangeSuccessfully";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateUserPassword } from "api/auth";
import { useEffect, useState } from "react";
import { verifyChangePasswordCode } from "api/user";

// Update validation schema to remove oldPassword
const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePassword = () => {
  const { id } = useParams(); // This is the token used for verification
  const [isValidCode, setIsValidCode] = useState(false);
  const [checkingInviteCodeValidity, setCheckingCodeValidity] = useState(true);

  useEffect(() => {
    const checkCodeValidity = async () => {
      if (id) {
        try {
          const response = await verifyChangePasswordCode(id);
          if (response.data && !response.data.error) {
            setIsValidCode(true);
          } else {
            setIsValidCode(false);
          }
        } catch (error) {
          console.error("Error verifying invite code:", error);
          setIsValidCode(false);
        } finally {
          setCheckingCodeValidity(false);
        }
      }
    };

    checkCodeValidity();
  }, [id]);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (values: { newPassword: string; confirmPassword: string }, { setErrors }) => {
    const { newPassword } = values; 
    const { email } = user;
  
    try {
      // Call API to update user password
      const response = await updateUserPassword({
        email,
        newPassword,
      });
      console.log(response);
      // Handle specific password policy error from backend
      if (response?.errorCode === 'INVALID_PASSWORD') {
        setErrors({ newPassword: 'The password does not meet the required policy.' });
      } else {
        console.log('Password updated successfully');
        navigate("/password-changed-successfully");
      }
    } catch (error) {
      console.log("Error updating password:", error);
    }
  };

  return (
    <>
      <div className="p-8 w-full min-h-full bg-darkGray text-white flex justify-center items-center">
        {pathname === "/password-changed-successfully" && <ChangeSuccessfully />}
        {pathname.startsWith("/new-password") && (
          <div className="flex flex-col items-center justify-center">
            {!isValidCode ? (
              <div className="py-8 flex justify-center flex-col items-center gap-2">
                <h2 className="text-3xl font-semibold tracking-tighter">Invalid or Expired Link</h2>
                <p className="w-72 text-center text-dimGray text-sm">
                  The password reset link is invalid or has expired. Please request a new one.
                </p>
              </div>
            ) : (
              <>
                <div className="flex text-xl items-center py-4 justify-center gap-2.5">
                  <div className="">
                    <img className="h-full w-full object-cover" src={logo} alt="Logo" />
                  </div>
                  <span>mvssive.net</span>
                </div>

                <div className="py-8 flex justify-center flex-col items-center gap-2">
                  <h2 className="text-3xl font-semibold tracking-tighter">Change your password</h2>
                  <p className="w-72 text-center text-dimGray text-sm">
                    Enter a new password below to update your password
                  </p>
                </div>

                <Formik
                  initialValues={{ newPassword: "", confirmPassword: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit} // Passes setErrors to handleSubmit
                >
                  {({ isSubmitting }) => (
                    <Form className="w-80">
                      <div className="mb-3">
                        <div className="relative">
                          <span className="absolute inset-y-0 right-3 flex items-center text-dimGray">
                            <RiLockLine />
                          </span>
                          <Field
                            name="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full text-sm p-4 bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                          />
                        </div>
                        <div className="text-darkRed mt-1 text-xs font-medium">
                          <ErrorMessage name="newPassword" />
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="relative">
                          <span className="absolute inset-y-0 right-3 flex items-center text-dimGray">
                            <RiLockLine />
                          </span>
                          <Field
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full text-sm p-4 bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                          />
                        </div>
                        <div className="text-darkRed mt-1 text-xs font-medium">
                          <ErrorMessage name="confirmPassword" />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-limeGreen text-sm text-black font-semibold py-3 rounded-full"
                      >
                        Reset your password
                      </button>
                    </Form>
                  )}
                </Formik>
                <p className="w-72 mt-8 px-2 text-center text-xs text-softGray">
                  By submitting your information, you agree to our{" "}
                  <span className="text-limeGreen">Terms of Service</span> and{" "}
                  <span className="text-limeGreen">Privacy Policy</span>
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ChangePassword;