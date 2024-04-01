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

const ResetPasswordPage: React.FunctionComponent<IPage> = props => {

    const navigate = useNavigate();


    return (
        <React.Fragment>

            <div className="bg-[#000] font-['SF-Pro']  h-[100vh]">
                <div>
                    <div className="flex justify-between max-[767px]:block">
                        <div className="col-1 max-[767px]:w-[100%] justify-center items-center w-[50%] flex bg-[url('https://content.sweatsonic.com/right-side.png')]">
                            <div className="max-[767px]:py-[200px] h-[100vh] flex items-center bg-[cover] px-[100px]">
                                <Logo />
                            </div>
                        </div>
                        <div className="w-[50%] px-[80px] flex justify-center flex-col max-[767px]:w-[100%] max-[767px]:px-[24px] max-[767px]:py-[100px]">
                            <div className="card w-[555px] max-[1460px]:w-[100%] mx-auto">
                                <h1 className="text-[32px] text-[#fff] font-semibold mb-[8px]">
                                    Reset Password
                                </h1>
                                <p className="text-[14px] text-[#fff]">
                                    Choose a new password for your account
                                </p>
                                <p className="mt-[100px] text-[14px] text-[#fff]">
                                    Didn’t receive the email? Check spam or promotion folder or
                                </p>
                                <form action="#" method="POST">
                                    <div className="mb-6">
                                        <input
                                            type="password"
                                            name="new_password"
                                            placeholder="Your new password"
                                            className="text-[#E5E5E5] border border-[#E5E5E5] rounded-[8px] bg-[transparent] mt-[18px] w-full px-4 py-3 mb-3"
                                        />
                                        <input
                                            type="password"
                                            name="confirm_password"
                                            placeholder="Confirm your new password"
                                            className="text-[#E5E5E5] border border-[#E5E5E5] rounded-[8px] bg-[transparent] w-full px-4 py-3"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-[#00A3FF] mb-[18px] h-[46px] text-[#fff] w-full py-2 rounded-[8px]"
                                    >
                                        Reset Password
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/')}
                                        className="bg-[transparent] border border-[#E5E5E5] h-[46px] text-[#E5E5E5] w-full py-2 rounded-[8px]"
                                    >
                                        Back to Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
};

export default ResetPasswordPage;
