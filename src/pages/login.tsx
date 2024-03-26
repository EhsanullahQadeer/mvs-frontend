/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import IPage from "interfaces/page";
import logging from "config/logging";
import logo from "assets/img/logo.svg";
import AccountImage from "assets/img/account-img.png";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "redux/actionCreators/auth";
import { useLocation, useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import "assets/css/global.scss";
import { Logo } from "icons";


interface RootState {
  auth: any;
}

const LoginPage: React.FunctionComponent<IPage> = props => {

  const navigate = useNavigate();

  return (
    <React.Fragment>

        <div className="flex bg-[#000] max-[767px]:block h-[100vh]">
          <div className="col-1 font-['SF-Pro'] w-[50%] flex m-[50px] max-[767px]:w-[100%] max-[767px]:m-[0px] max-[767px]:p-[25px]">
            <div className="m-auto rounded-[12px] w-full bg-[#1E1E1E] py-[60px] px-[32px] max-w-[530px] max-[767px]:w-[100%] max-[767px]: px-[15px]">
              <Logo className="w-[360px] m-[auto]" />
              <p className="text-[#EFEFEF] text-[14px] text-center mt-[8px] mb-[40px]">
                Create an account to get started. You’re only one step away.
              </p>
              <div>
                <button className="bg-[#1E1E1E] text-[#828282] border border-[#D0D5DD] w-full flex items-center justify-center py-2 rounded-[5px]">
                  <img
                    className="mr-[12px]"
                    src="https://content.sweatsonic.com/icon.png"
                  />{" "}
                  Continue with Google
                </button>
                <div className="text-center text-[#A1A1A1] py-[40px] text-[14px]">
                  ------------- or Sign in with Email -------------
                </div>
              </div>
              <div className="mb-4">
                <label className="text-[#fff] font-[400] leading-[30px]">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="bg-[transparent] border-[#D0D5DD] border text-[#A0ABBB] w-full px-3 py-2 rounded mb-3"
                />
                <label className="text-[#fff] font-[400] leading-[30px]">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-[transparent] border-[#D0D5DD] border text-[#A0ABBB] w-full px-3 py-2 rounded mb-1"
                />
                {/* <div className="text-sm text-[#F42852] mb-3">Error Message</div> */}
              </div>
              <div className="flex items-center justify-between mb-[12px]">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-[#A0ABBB] focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-400"
                  >
                    Remember Me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#" onClick={() => navigate('/forgot-password')} 
                    className="font-[400] text-[#D0D5DD] underline hover:text-indigo-500"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div>
                <button className="bg-[#05BEF8] text-[#fff] w-full py-[12px] rounded">
                  Login
                </button>
              </div>
              <div className="mt-[40px] text-center">
                <p className="text-gray-400 text-[14px]">
                  Not Registered Yet?{" "}
                  <a href="#" onClick={() => navigate('/signup')}  className="text-[#05BEF8] hover:text-indigo-500">
                    Create an account
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-1 font-['Poppins-Med'] bg-[#1a1a1a] h-full max-[767px]:w-[100%] justify-center items-center w-[50%] flex bg-[url('https://content.sweatsonic.com/right-side.png')]">
            <div className="max-[767px]:py-[100px]">
              <p className="text-[20px] text-[#E7EAEE] font-[500] text-center">
              </p>
              <h1 className="text-[48px] font-[600] text-[#E7EAEE] text-center">
                Welcome Back
              </h1>
              <p className="text-[14px] text-[#E7EAEE] font-['Pop-L'] font-[400] text-center">
                Start with a 14-day free trail, cancel anytime!
              </p>
            </div>
          </div>
        </div>

    </React.Fragment>
  );
};

export default LoginPage;
