import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import logo from "../../../assets/img/M-logo.png";
import { useNavigate } from "react-router-dom";
import CheckEmail from "./CheckEmail";

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [sendEmail, setCheckEmail] = useState(false);

  const handleBack = () => {
    navigate("/login");
  };
  const handleSubmit = (values: { email: string;}) => {
    setCheckEmail(true);
  };

  return (
    <>
      <div
        className={`z-50 w-full h-screen bg-[#131313] ${
          sendEmail ? "flex" : "hidden"
        }`}
      >
        <CheckEmail/>
      </div>
      <div className="flex flex-col gap- items-center justify-center h-full  bg-[#131313] text-white">
        <div className="flex   text-xl items-center justify-center gap-2.5">
          <div className="">
            <img className="h-full w-full object-cover " src={logo} alt="" />
          </div>
          <span> mvssive.net</span>
        </div>
        <div className="py-8 flex justify-center flex-col  items-center gap-2">
          <h2 className="text-3xl  font-semibold tracking-tighter ">
            Forgot your password?
          </h2>
          <p className="text-[#666666] w-[55%] text-center  text-sm">
            Please enter your email address, and we'll send you the instructions
            to reset your password.
          </p>
        </div>

        <Formik
          initialValues={{ email: ""}}
          onSubmit={handleSubmit}
        >
          <Form className="w-80 ">
            <div className=" pb-3">
              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full p-4 bg-[#0F0F0F] border border-[#242424] text-[#666666] text-sm rounded-lg "
              />
            </div>

            <button
              type="submit"
              className=" w-full bg-[#9EFF00] text-sm text-black font-semibold py-3 rounded-full "
            >
              Continue
            </button>
          </Form>
        </Formik>
        <button
          onClick={handleBack}
          type="button"
          className=" w-80 mt-3 border text-[#E5E5E5] border-[#E5E5E5] text-sm font-semibold py-3 rounded-full "
        >
          Back
        </button>
        <p className="w-72 mt-8  px-2 text-center text-xs text-[#CCC]">
          By submitting your information, you agree to our{" "}
          <span className="text-[#9EFF00]">Terms of Service</span> and{" "}
          <span className="text-[#9EFF00]">Privacy Policy</span>
        </p>
      </div>
    </>
  );
};

export default ForgetPassword;
