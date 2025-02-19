import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import logo from "../../../assets/img/M-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import CheckEmail from "./CheckEmail";
import * as Yup from "yup";
import { forgotPasswordAPI } from "api/auth";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is required"),
});

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [attemptsLock, setAttemptsLock] = useState(false);
  const handleBack = () => {
    navigate("/");
  };
  
  const handleSubmit = async (values: { email: string }) => {
    const { email } = values;
    try {
      const response = await forgotPasswordAPI({
        email,
      });
      if (response.data.error) {
        setAttemptsLock(true);
      } else {
        localStorage.setItem("user", JSON.stringify({ email }));
        navigate("/forgot-password-sent");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="p-8 w-full min-h-full bg-darkGray text-white flex justify-center items-center">
        {pathname === "/forgot-password-sent" && <CheckEmail />}
        {pathname === "/forgot-password" && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex text-xl items-center justify-center gap-2.5">
              <div className="">
                <img className="h-full w-full object-cover" src={logo} alt="" />
              </div>
              <span>mvssive.net</span>
            </div>
            <div className="py-8 flex justify-center flex-col  items-center gap-2">
              <h2 className="text-3xl font-semibold tracking-tighter ">
                Forgot your password?
              </h2>
              <p className="text-dimGray w-[55%] text-center  text-sm">
                Please enter your email address, and we'll send you the
                instructions to reset your password.
              </p>
            </div>
            {attemptsLock && (
              <p className="text-sm text-red-500">You've reached the maximum resend attempts. Please wait 24 hours before trying again.</p>
            )}
            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="w-80">
                <div className="pb-3">
                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full p-4 bg-jetBlack border border-eclipseGray text-dimGray text-sm rounded-lg"
                    />
                    <div className="text-darkRed mt-1 text-xs font-medium">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full ${
                    attemptsLock ? 'bg-charcoalGray' : 'bg-limeGreen'
                  } text-sm text-black font-semibold py-3 rounded-full`}
                  disabled={attemptsLock}
                >
                  Continue
                </button>
              </Form>
            </Formik>
            <button
              onClick={handleBack}
              type="button"
              className="w-80 mt-3 border text-platinum border-platinum text-sm font-semibold py-3 rounded-full"
            >
              Back
            </button>
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

export default ForgotPassword;
