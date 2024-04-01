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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
      
     if(e.target.name === 'email') {
       setEmail(e.target.value);
     }

     if(e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

 
  const SocialButton: React.FC<{ icon: string }> = ({ icon }) => (
    <div className="flex flex-1 justify-center items-center px-16 py-2 bg-black rounded-lg border border-solid border-zinc-800 max-md:px-5">
      <img src={icon} alt="" className="aspect-[0.81] w-[17px]" />
    </div>
  );


  useEffect(() => {


  }, [])

  return (
    <React.Fragment>

      <div className="flex justify-center items-center px-16 py-20 bg-[#101010] max-md:px-5">
        <div className="flex flex-col mt-4 w-full max-w-[1260px] max-md:max-w-full">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7c8132155bc57be39b711e2b47631705bd36d5eddeac1ffa3811b8ffd5fd7f5?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&" alt="" className="self-center aspect-[1.14] w-[98px]" />
          <div className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-10 mt-16 w-full min-h-[624px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e53c443d7d0dbfc78b8e8a096dfb42ff6d3e9287f0c8cf493870d5e92623f01b?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&" alt="" className="object-cover absolute inset-0 size-full" />
            <div className="flex relative flex-col p-8 max-w-full rounded-3xl border border-solid bg-stone-950 border-zinc-800 w-[564px] max-md:px-5">
              <div className="flex justify-center items-center px-16 font-medium text-white max-md:px-5 max-md:max-w-full">
                <div className="flex flex-col">
                  <h1 className="self-center text-2xl">Welcome Back</h1>
                  <p className="mt-2 text-sm">
                    <span>Don't have an account yet?</span>{" "}
                    <a href="#" className="font-semibold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
              <form>
               

              <div className="flex gap-2 p-4 mt-3 text-sm font-medium bg-black rounded-lg border border-solid border-zinc-800 text-neutral-500 max-md:flex-wrap">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/dba5ecb3f4153a4e8f3291072aaa3c3f64f78371548f5aca590f90fc6a39b8f7?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&" alt="" className="shrink-0 w-6 aspect-square" />
                <input
                  type="text"
                  name="email"
                  placeholder="email address"
                  className="my-auto w-[500px] focus:ring-0 border-none bg-transparent outline-none text-neutral-500 max-md:max-w-full"
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-2 p-4 mt-3 text-sm font-medium bg-black rounded-lg border border-solid border-zinc-800 text-neutral-500 max-md:flex-wrap">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2cc13662aa78b8022fcadd25afa926f7318f50c818f9e3cabaaecfde5dcc0b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&" alt="" className="shrink-0 w-6 aspect-square" />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="my-auto w-[500px] focus:ring-0 border-none bg-transparent outline-none text-neutral-500 max-md:max-w-full"
                  onChange={handleChange}
                />
              </div>
              
              <button
                  type="submit"
                  className="justify-center w-[500px]  items-center p-4 mt-3 text-sm font-medium text-black whitespace-nowrap bg-lime-300 rounded-lg max-md:px-5 max-md:max-w-full"
                  onClick={() => {

                    if (email === 'dev@gmail.com' && password === 'password') {

                      navigate("/home-feed");
                    } else {

                      alert("Invalid email or password");
                    }
                  }}

                >
                  Login
                </button>
              </form>
              <div className="flex gap-3 justify-center items-center mt-9 text-sm font-medium whitespace-nowrap text-zinc-600 max-md:flex-wrap max-md:max-w-full">
                <hr className="flex-1 self-stretch my-auto w-full border border-solid border-zinc-600 stroke-[1px] stroke-zinc-600" />
                <span>OR</span>
                <hr className="flex-1 self-stretch my-auto w-full border border-solid border-zinc-600 stroke-[1px] stroke-zinc-600" />
              </div>
              <div className="flex gap-3 justify-center mt-9 max-md:flex-wrap max-md:max-w-full">
                <SocialButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/31ddeb31d5386ef0e087d794c5810231f47a8b16acc00c3f317aa57cfe3c721a?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&" />
                <SocialButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/a8928227426d6ebb295990e9f1ff1c255251c365708c790b6c4cc91c5854d76c?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&" />
              </div>
              <a
                href="#"
                className="self-start mt-12 ml-2.5 text-sm font-medium underline text-neutral-500 max-md:mt-10"
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>


    </React.Fragment>
  );
};

export default LoginPage;
