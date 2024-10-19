import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup"; // for validation
import { RiLockLine } from "react-icons/ri";
import logo from "../../../assets/img/M-logo.png";
import ChangeSuccessfully from "./ChangeSuccessfully";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordAPI } from "api/auth";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    const { password } = values;
    const { email } = user;
    try {
      const response = await resetPasswordAPI({
        email,
        code: 123,
        password,
      });

      console.log("response ", response);
      localStorage.removeItem("user");
      navigate("/creator/new-password-success");
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <>
      <div className="p-8 w-full min-h-full bg-darkGray text-white flex justify-center items-center">
        {pathname === "/creator/new-password-success" && <ChangeSuccessfully />}

        {pathname === "/creator/new-password" && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex text-xl items-center py-4 justify-center gap-2.5">
              <div className="">
                <img
                  className="h-full w-full object-cover"
                  src={logo}
                  alt="Logo"
                />
              </div>
              <span>mvssive.net</span>
            </div>

            <div className="py-8 flex justify-center flex-col items-center gap-2">
              <h2 className="text-3xl font-semibold tracking-tighter">
                Change your password
              </h2>
              <p className="w-72 text-center text-dimGray text-sm">
                Enter a new password below to update your password
              </p>
            </div>

            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="w-80">
                  <div className="mb-3">
                    <div className="relative">
                      <span className="absolute inset-y-0 right-3 flex items-center text-dimGray">
                        <RiLockLine />
                      </span>
                      <Field
                        name="password"
                        type="password"
                        placeholder="Enter new password"
                        className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full text-sm p-4 bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                      />
                    </div>
                    <div className="text-darkRed mt-1 text-xs font-medium">
                      <ErrorMessage name="password" />
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
                        className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full text-sm p-4 bg-jetBlack border  border-eclipseGray text-dimGray rounded-lg"
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
          </div>
        )}
      </div>
    </>
  );
};

export default ChangePassword;
