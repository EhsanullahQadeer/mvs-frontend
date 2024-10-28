/*************************************************************************
 * @file CreatorLogin.tsx
 * @author End Quote
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/img/M-logo.png";
import { GrApple } from "react-icons/gr";
import { RiLockLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "redux/actions";
import cookie from "js-cookie";
import { CircularProgress } from "@mui/material";

interface RootState {
  auth: any;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const CreatorLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const user = useSelector((state: RootState) => state);
  const [errors, setErrors] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (cookie.get("token")) {
      navigate("/home");

      return;
    }
    console.log(user);

    if (user.auth.type === "USER_LOGIN_SUCCESS" && cookie.get("token")) {
      localStorage.removeItem("persist:root");
      navigate("/home");
      setLoader(false);
      setErrors(false);
    } else if (user.auth.type === "USER_LOGIN_FAIL") {
      console.log("====== LOGIN DONE =====");
      setLoader(false);
      setErrors(true);

      dispatch({
        type: null,
      });
    }
  }, [user]);

  const handleLogin = (values: { email: string; password: string }) => {
    setLoader(true);
    const email = values.email;
    const password = values.password;

    localStorage.removeItem("persist:root");
    dispatch(
      login({
        email,
        password,
      })
    );

    console.log(values);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };
  
  const handleforget = () => {
    navigate("/forgot-password");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 bg-darkGray text-white min-h-full ${
        loader ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <div className="flex text-xl items-center justify-center gap-2.5">
        <div className="">
          <img className="h-full w-full object-cover" src={logo} alt="logo" />
        </div>
        <span>mvssive.net</span>
      </div>
      <div className="py-8 flex justify-center flex-col  items-center gap-2">
        <h2 className="text-3xl  font-semibold tracking-tighter">Sign in</h2>
        <p className="text-dimGray  text-sm">Welcome back</p>
      </div>

      {errors && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded relative mb-5"
          role="alert"
        >
          <span className="block sm:inline">
            Sorry, we don't recognize your credentials
          </span>
        </div>
      )}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form className="w-80">
          <div className="pb-3">
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
          <div className="relative">
            <span className="absolute inset-y-0 right-3 flex items-center text-dimGray">
              <RiLockLine />
            </span>
            <Field
              name="password"
              type="password"
              placeholder="Enter your password"
              className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full text-sm p-4 bg-jetBlack border  border-eclipseGray text-dimGray rounded-lg"
            />
          </div>

          <div className="text-darkRed mt-1 text-xs font-medium">
            <ErrorMessage name="password" />
          </div>

          <div className="flex justify-end mt-2 mb-6">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                handleforget();
              }} 
              className="text-limeGreen text-xs cursor-pointer hover:underline inline-block"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-limeGreen text-sm text-jetBlack font-semibold py-3 rounded-full"
          >
            Login
          </button>
        </Form>
      </Formik>

      <div className="w-80 text-center">
        <div className="my-8 text-charcoalGray flex items-center gap-3 justify-center">
          <div className="h-px w-full bg-charcoalGray"></div>
          <p className="w-full font-medium text-sm text-charcoalGray">
            Or login with
          </p>
          <div className="h-px w-full bg-charcoalGray"></div>
        </div>
        <div className="flex gap-3 justify-between items-center">
          <span className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none p-3 bg-gray-700 border flex justify-center bg-jetBlack cursor-pointer items-center border-eclipseGray h-12 w-full rounded-lg py-2.5 text-dimGray">
            <GrApple />
          </span>
          <span className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none p-3 bg-gray-700 flex justify-center cursor-pointer items-center bg-jetBlack border border-eclipseGray h-12 w-full rounded-lg py-2.5 text-white">
            <FcGoogle />
          </span>
        </div>
      </div>

      <p className="mt-8 text-sm">
        <span className="text-dimGray font-normal">
          Don't have an account yet?
        </span>{" "}
        <span
          onClick={handleSignUpClick}
          className="font-semibold cursor-pointer text-[#57AEFF]"
        >
          Sign Up
        </span>
      </p>

      {loader && (
        <>
          <div className="absolute top-0 left-0 z-50 bg-black opacity-40 w-full h-full pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999px]">
            <CircularProgress
              sx={{
                width: "80px !important",
                height: "80px !important",
                color: "#9EFF00",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CreatorLogin;
