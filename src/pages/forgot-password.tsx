/*************************************************************************
 * @file forgot-password.tsx
 * @author End Quote
 * @desc Page component for handling the forgot password process.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

/* LOCAL IMPORTS */
import { forgotPasswordAPI, resetPasswordAPI } from "../api/auth";
import "assets/css/global.scss";
interface IPage {
    name: string;
}

const ForgotPasswordPage: React.FunctionComponent<IPage> = (props) => {
    const [email, setEmail] = useState(null);
    const [code, setCode] = useState(null);

    const [password, setPassword] = useState(null);


    const [showPassword1, setShowPassword1] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const { pathname } = useLocation();

    const sendForgotPassword = async () => {
        setIsSubmitting(true);

        if (!email) {
            toast.error("Email is required.");
            return;
        }

        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        if (!regEx.test(email)) {
            toast.error("Invalid email");
            return;
        }

        try {
            await forgotPasswordAPI({
                email,
            });

            setIsSubmitting(false);

            toast.success("Password reset code has been sent to your email.");
            navigate("/forgot-password/reset");

        } catch (error) {
            setIsSubmitting(false);
            toast.error(error.message);
        }
    };

    const passwordReset = async () => {
        setIsSubmitting(true);

        const _password = await resetPasswordAPI({
            email,
            code,
            password
        });

        setIsSubmitting(false);
        console.log(_password);
        if (_password.data.error) {
            toast.error(_password.data.message);
        } else {
            navigate("/forgot-password-success");
        }
    };

    console.log(navigate, pathname);

    return (
        <React.Fragment>
            {pathname === "/forgot-password" && (
                <>
                    <div className="flex justify-center items-center px-16 py-20 font-medium max-md:px-5">
                        <div className="flex flex-col p-8 mt-10 max-w-full rounded-3xl border border-solid bg-zinc-900 border-neutral-800 w-[460px] max-md:px-5 max-md:mt-10">
                            <img
                                loading="lazy"
                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                                className="self-center aspect-[1.14] w-[98px]"
                            />
                            <div className="mt-9 text-2xl text-neutral-200">
                                Forgot Password
                            </div>

                            <div className="mt-2 text-sm tracking-normal leading-6 text-neutral-400">
                                Enter your email to receive a password reset code.
                            </div>
                            <div className="mt-10 text-base text-stone-500">Email:</div>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email address"
                                className="justify-center focus:border-[#ACD7FF] items-start p-4 mt-4 text-xl text-blue-200 whitespace-nowrap rounded-lg   border-solid bg-transparent max-md:pr-5"
                            />

                            <button
                                disabled={isSubmitting}
                                onClick={sendForgotPassword}
                                className="text-center items-center p-4 mt-5 text-sm text-black whitespace-nowrap bg-lime-300 rounded-lg max-md:px-5"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="m-auto inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </>
                                ) : (
                                    <>Continue</>
                                )}
                            </button>
                        </div>
                    </div>
                </>
            )}



            {pathname === "/forgot-password/reset" && (
                <>
                    <div className="flex justify-center items-center px-16 py-20 text-sm  max-md:px-5">
                        <div className="flex flex-col p-8  max-w-full rounded-3xl border border-solid bg-stone-950 border-neutral-800 w-[460px] max-md:px-5 max-md:mt-10">
                            <img
                                loading="lazy"
                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                                className="self-center aspect-[1.14] w-[98px]"
                            />
                            <div className="mt-9 text-2xl font-medium text-neutral-200">
                                New Password
                            </div>
                            <div className="mt-2 tracking-normal leading-6 text-zinc-500">
                                Set the new password for your account.
                            </div>
                            <div className="mt-10 text-base text-stone-300">
                                Enter new password
                            </div>
                            <div className="flex gap-2 focus-within:border-[#ACD7FF]  justify-between p-2 mt-3.5 text-xl font-medium text-blue-200 whitespace-nowrap rounded-lg border border-solid bg-transparent">
                                <input
                                    type={showPassword1 ? "text" : "password"}
                                    className="w-[400px] bg-transparent border-none focus:ring-0 "
                                    onChange={(e: any) => setPassword(e.target.value)}

                                />
                                <img
                                    loading="lazy"
                                    src={`https://assets.mvssive.net/${showPassword1 ? "show" : "hide"
                                        }-password.png`}
                                    className="cursor-pointer shrink-0 my-auto w-5 aspect-[1.11]"
                                    onClick={() => setShowPassword1(!showPassword1)}
                                />
                            </div>
                            <div className="mt-4 text-base text-stone-300">
                                Email Verification Code
                            </div>
                            <div className="flex focus-within:border-[#ACD7FF] gap-5 justify-end  p-2 mt-3.5 tracking-normal rounded-xl border border-solid bg-transparent leading-[171%] text-[#ACD7FF]">
                                <input
                                    type="text"
                                    className="flex-auto my-auto w-[400px] bg-transparent border-none focus:ring-0"
                                    placeholder="123456"
                                    onChange={(e: any) => setCode(e.target.value)}
                                />
                            </div>
                            <button disabled={isSubmitting} onClick={passwordReset} className="text-center items-center p-4 mt-9 font-medium text-black bg-lime-300 rounded-lg max-md:px-5">
                                {isSubmitting ? (
                                    <>
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="m-auto inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </>
                                ) : (
                                    <>Reset Password</>
                                )}
                            </button>
                        </div>
                    </div>
                </>
            )}

            {pathname === "/forgot-password-success" && (
                <>
                    <div className="flex justify-center items-center px-16 py-20 text-sm font-medium bg-stone-950 max-md:px-5">
                        <div className="flex flex-col p-8  max-w-full rounded-3xl border border-solid bg-zinc-900 border-neutral-800 w-[460px] max-md:px-5 max-md:mt-10">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/63de81e10c7d7b727bc2a0cec932cef277ec04c733e3754a992f0479fff190ee?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                                className="self-center max-w-full aspect-square w-[164px]"
                            />
                            <div className="self-center mt-9 text-2xl text-neutral-200">
                                Updated Succesfully
                            </div>
                            <div className="mt-2 tracking-normal leading-6 text-center text-zinc-500">
                                Your password has been reset successfully
                            </div>
                            <button onClick={() => {
                                navigate('/login')
                            }} className="text-center items-center p-4 mt-9 text-black whitespace-nowrap bg-lime-300 rounded-lg max-md:px-5">
                                Continue
                            </button>
                        </div>
                    </div>
                </>
            )}

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
            />
        </React.Fragment>
    );
};

export default ForgotPasswordPage;
