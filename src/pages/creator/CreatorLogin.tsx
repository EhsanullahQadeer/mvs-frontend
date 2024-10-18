/*************************************************************************
 * @file CreatorLogin.tsx
 * @author End Quote
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/img/M-logo.png";
import { GrApple } from "react-icons/gr";
import { RiLockLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const CreatorLogin: React.FC = () => {
    const navigate = useNavigate(); 

  const handleLogin = (values: { email: string; password: string }) => {
    navigate("/home"); 

    console.log(values);
  };
  const handleSignUpClick = () => {
    navigate("/creator/signup"); 
  };
  const handleforget = () => {
    navigate("/creator/forgot-password"); 
  };


  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[131313] text-white">
      <div
        className="flex p-4  text-xl items-center justify-center gap-2.5">
        <div className="">
          <img className="h-full w-full object-cover " src={logo} alt="" />
        </div>
        <span> mvssive.net</span>
      </div>
      <div className="py-8 flex justify-center flex-col  items-center gap-2">
        <h2 className="text-3xl  font-semibold tracking-tighter ">Sign in</h2>
        <p className="text-[#666666]  text-sm">Welcome back</p>
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
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
          <div className="relative">
            <span className="absolute inset-y-0  right-3 flex items-center text-[#666666]">
              <RiLockLine />
            </span>
            <Field
              name="password"
              type="password"
              placeholder="Enter your password"
              className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full text-sm p-4 bg-[#0F0F0F] border  border-[#242424] text-[#666666] rounded-lg "
            />
          </div>
          <div className="flex justify-end mb-3">
            <p onClick={handleforget} className="text-lime-500 text-xs cursor-pointer">Forgot Password?</p>
          </div>
          <button
            type="submit"
            className=" w-full bg-[#9EFF00] text-sm text-black font-semibold py-3 rounded-full "
          >
            Login
          </button>
        </Form>
      </Formik>

      <div className="w-80 text-center">
        <div className="my-8 text-[#3D3D3D] flex items-center gap-3 justify-center ">
          <div className="h-px w-full bg-[#3D3D3D]"></div>
          <p className="w-full">Or login with</p>
          <div className="h-px w-full bg-[#3D3D3D]"></div>
        </div>
        <div className="flex gap-3 justify-between items-center">
          <span className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none p-3 bg-gray-700 border flex justify-center bg-[#0F0F0F] cursor-pointer items-center border-[#242424] h-12 w-full rounded-lg py-2.5 text-[#666666]">
            <GrApple />
          </span>
          <span className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none p-3 bg-gray-700 flex justify-center cursor-pointer items-center bg-[#0F0F0F] border border-[#242424] h-12 w-full rounded-lg py-2.5  text-white">
            <FcGoogle />
          </span>
        </div>
      </div>

      <p className="mt-8 text-sm ">
        <span className="text-[#666666]"> Don't have an account yet?</span>
        <span onClick={handleSignUpClick} className="text-green-400 cursor-pointer text-[#57AEFF]">
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default CreatorLogin;
