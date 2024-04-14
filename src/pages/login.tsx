/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import cookie from "js-cookie";
import { login } from "redux/actionCreators/auth";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from "yup";

interface RootState {
  auth: any;
}

const LoginPage = () => {

  const dispatch: any = useDispatch();

  const user = useSelector((state: RootState) => state);


  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = { email: "", password: "" };


  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const styles = {
    label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
    field:
      'bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
    button:
      'w-full disabled:cursor-not-allowed disabled:shadow-none disabled:text-white disabled:transform-none disabled:transition-none  cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    errorMsg: 'text-red-500 text-sm pb-2 font-bold',
  }

  useEffect(() => {
    if (cookie.get("token")) {

      navigate("/home");

      return;
    }
    console.log(user);

    if (user.auth.type === "USER_LOGIN_SUCCESS" && cookie.get("token")) {
      localStorage.removeItem("persist:root");
      navigate("/home");
      setIsSubmitting(false);
      setErrors(false);
    } else if (user.auth.type === "USER_LOGIN_FAIL") {
      console.log("====== LOGIN DONE =====");
      setIsSubmitting(false);
      setErrors(true);

      dispatch({
        type: null,
      });

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);




  const onSubmit = (values: any) => {
    setIsSubmitting(true);

    const email = values.email;
    const password = values.password;

    setIsSubmitting(true);
    localStorage.removeItem("persist:root");
    dispatch(
      login({
        email,
        password,
      })
    );
  };


  return (
    <React.Fragment>
      <div className="flex flex-col justify-end items-start  pr-8 pb-9 pl-20 bg-stone-950 max-md:px-5">
        <div className="flex flex-col pt-8 self-center  mt-10 max-w-full rounded-3xl border border-solid bg-zinc-900 border-neutral-800 w-[460px] max-md:px-5 max-md:mt-10">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/26056c48587334bc0a23d16c25c7a8b2ce106574cb9d69dc83a1bf732faa9e81?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
            alt="Company logo"
            className="self-center aspect-[1.14] w-[98px]"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="flex flex-col px-11 mt-9 max-md:px-5">
              <h1 className="self-center text-2xl font-medium text-neutral-200">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-stone-500 text-center">
                The most exclusive sample portal in the industry!
              </p>


              {errors && (

                <div className="bg-red-100 mt-5 border border-red-400 text-red-700 px-2 py-1 rounded relative mb-5" role="alert">
                  <span className="block sm:inline">Sorry, we don't recognize your credentials</span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => {
                    setErrors(false);
                  }}>
                  </span>
                </div>
              )}
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="flex mb-[15px]  focus-within:border-[#ACD7FF] border gap-2 p-2 mt-9 text-sm font-medium rounded-lg border border-solid bg-[#131313] border-[#131313] text-stone-500">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/bee6c09bee41e60f4c00b9c5629bfa5c40e5a3f0d0d2f4c92e681c191cc9abee?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                  alt=""
                  className="shrink-0 w-5 aspect-square"
                />
                <Field
                  type="email"
                  name="email"
                  placeholder="email address"
                  autoComplete="off"
                  className="input-email bg-transparent outline-none text-stone-500 border-none w-[500px] focus:ring-0"
                />

              </div>
              <ErrorMessage component='a' className={styles.errorMsg} name='email' />

              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="flex gap-2 mb-[15px] focus-within:border-[#ACD7FF] border border border-solid border-[#131313]  justify-between p-2 mt-3 text-xl font-medium text-blue-200 whitespace-nowrap rounded-lg  bg-[#131313]">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  className="bg-transparent outline-none text-blue-200 border-none w-[500px] focus:ring-0"
                />
                <img
                  loading="lazy"
                  src={`https://assets.mvssive.net/${showPassword ? "show" : "hide"}-password.png`}
                  alt=""
                  className="cursor-pointer shrink-0 my-auto w-5 aspect-[1.11]"
                  onClick={() => setShowPassword(!showPassword)}

                />

              </div>
              <ErrorMessage
                component='a'
                className={styles.errorMsg}
                name='password'
              />
              <button
                disabled={isSubmitting}
                type="submit"
                className="justify-center items-center p-4 mt-3 text-sm font-medium text-black whitespace-nowrap bg-lime-300 rounded-lg max-md:px-5"
              >
                {isSubmitting ? (
                  <>
                    <div role="status">
                      <svg aria-hidden="true" className="m-auto inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </>
                ) : (
                  <>
                    Login
                  </>
                )}
              </button>
              <div className="flex gap-2.5 py-0.5 mt-3 text-base">
                <span className="text-stone-500">Don't have an account?</span>
                <button onClick={() => navigate("/signup")} className="underline text-stone-300">
                  Sign Up
                </button>
              </div>
              <a
                href="#"
                onClick={() => navigate('/forgot-password')}
                className="mt-12 text-sm font-medium underline text-stone-500 max-md:mt-10 mb-[30px]"
              >
                Forgot Password?
              </a>
            </Form>
          </Formik>
        </div>

        {/* Feed */}
        <div className="">

          <div className="feed max-w-[414px] p-8 text-xs tracking-widest text-center border border-solid rounded-3xl bg-zinc-900 border-neutral-800 backdrop-blur-[2px]">
            <div className="Frame48095854 w-[350px] flex-col justify-end items-center gap-1 flex">


              <div className="Group4 w-[350px] h-12 relative">
                <div className="Rectangle3467559 w-[350px] h-12 left-0 top-0 absolute opacity-60 bg-neutral-700 rounded-xl backdrop-blur-[50px]" />
                <div className="Frame48095852 w-[227px] h-8 left-[16px] top-[8px] absolute justify-start items-center gap-5 inline-flex">
                  <img
                    className="Ellipse715 w-8 h-8 opacity-60 rounded-full"
                    src="https://mvssive-content.s3.amazonaws.com/Frame+48095852.png"
                  />
                  <div className="text-center w-[200px]">
                    <span className="text-neutral-300 text-[10px] font-bold font-['SF Pro Display']  tracking-widest">
                      PooBear
                    </span>
                    <span className="text-white text-[10px] font-medium font-['SF Pro Display']  tracking-widest">
                      {" "}
                    </span>
                    <span className="text-neutral-500 text-[10px] font-medium font-['SF Pro Display']  tracking-widest">
                      Just joined
                    </span>
                    <span className="text-white text-[10px] font-medium font-['SF Pro Display'] tracking-widest">
                      {" "}
                    </span>
                    <span className="text-neutral-300 text-[10px] font-bold font-['SF Pro Display']  tracking-widest">
                      MVSSIVE
                    </span>
                  </div>
                </div>
                <div className="DayAgo left-[278px] top-[21px] absolute text-center text-white text-[10px] font-normal font-['SF Pro Display'] tracking-widest">
                  1 day ago
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
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

export default LoginPage;
