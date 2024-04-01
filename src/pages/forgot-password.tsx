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

const ForgotPasswordPage: React.FunctionComponent<IPage> = props => {

    const navigate = useNavigate();


    return (
        <React.Fragment>

            <div className="bg-[#0F0E09] font-['SF-Pro']">
                <div>
                    <div className="flex justify-between max-[767px]:block">
                        <div className="col-1 max-[767px]:w-[100%] justify-center items-center w-[50%] flex bg-[url('https://content.sweatsonic.com/right-side.png')]">
                            <div className="max-[767px]:py-[200px] h-[100vh] flex items-center bg-[cover] px-[100px]">
                                <Logo />
                            </div>
                        </div>
                        <div className="w-[50%] px-[130px] flex justify-center flex-col max-[767px]:w-[100%] max-[767px]:px-[24px] max-[767px]:py-[100px]">
                            <h2 className="text-[32px] font-['SF-Pro-Display'] text-left text-white font-bold mb-[8px]">
                                Forgot Password
                            </h2>
                            <p className="text-[#fff] text-[14px] w-[554px] max-[1460px]:w-[100%]">
                                Enter the email you used to create your account so we can send you
                                instructions on how to reset your password.
                            </p>
                            <input type="text" placeholder="raul@absavage.com" className="bg-[transparent] w-[554px] max-[1460px]:w-[100%] border border-[#E5E5E5] mt-[80px] h-[46px] text-[#E5E5E5] py-2 rounded-[8px]" />

                            <button className="bg-[#00A3FF] my-[18px] w-[554px] max-[1460px]:w-[100%] h-[46px] text-[#fff] py-2 rounded-[8px]">
                                Send
                            </button>
                            <button onClick={() => navigate('/')} className="bg-[transparent] border w-[554px] max-[1460px]:w-[100%] border-[#E5E5E5] h-[46px] text-[#E5E5E5] py-2 rounded-[8px]">
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </React.Fragment>
    );
};

export default ForgotPasswordPage;
