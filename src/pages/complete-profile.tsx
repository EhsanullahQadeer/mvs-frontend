/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { useNavigate } from "react-router-dom";

const CompleteProfilePage = () => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <div className="flex justify-center items-center px-16 py-20 bg-stone-950 max-md:px-5">
                <div className="flex flex-col p-8  max-w-full rounded-3xl border border-solid bg-zinc-900 border-neutral-800 w-[460px] max-md:px-5">
                    <div className="flex flex-col px-20 max-md:px-5">
                        <div className="self-center text-2xl font-medium text-neutral-200">
                            Profile Info
                        </div>
                        <div className="mx-3.5 mt-2 text-base text-zinc-600 max-md:mx-2.5">
                            Welcome to the Inner Circle!
                        </div>
                    </div>
                    <div className="flex justify-center items-center px-16 mt-9 text-base font-medium text-white max-md:px-5">
                        <div className="flex flex-col max-w-full w-[153px]">
                            <img
                                loading="lazy"
                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/28c95bf027ae5a2b1a99151e3da454d9f23a6740b7283d02250d85cf109ee061?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/28c95bf027ae5a2b1a99151e3da454d9f23a6740b7283d02250d85cf109ee061?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/28c95bf027ae5a2b1a99151e3da454d9f23a6740b7283d02250d85cf109ee061?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/28c95bf027ae5a2b1a99151e3da454d9f23a6740b7283d02250d85cf109ee061?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/28c95bf027ae5a2b1a99151e3da454d9f23a6740b7283d02250d85cf109ee061?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/28c95bf027ae5a2b1a99151e3da454d9f23a6740b7283d02250d85cf109ee061?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/28c95bf027ae5a2b1a99151e3da454d9f23a6740b7283d02250d85cf109ee061?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/28c95bf027ae5a2b1a99151e3da454d9f23a6740b7283d02250d85cf109ee061?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                                className="self-center max-w-full rounded-full border-2 border-white border-solid aspect-square w-[100px]"
                            />
                            <div className="flex gap-2.5 justify-center p-2.5 mt-3">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9651b37c5a2f80fabc45d3eae3490c4a07d3f1a09b72c458d5fa58dce2e92470?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                                    className="shrink-0 w-6 aspect-square"
                                />
                                <div className="my-auto">Select Image</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-base text-neutral-400">First Name</div>
                    <input className="justify-center focus:border-[#ACD7FF] items-start p-2 mt-4 text-xl font-medium text-blue-200 whitespace-nowrap rounded-lg border border-solid  max-md:pr-5 bg-transparent" />
                        
                    <div className="mt-4 text-base text-neutral-400">Last Name</div>
                    <input className="justify-center focus:border-[#ACD7FF] items-start p-2 mt-4 text-xl font-medium text-blue-200 whitespace-nowrap rounded-lg border border-solid  max-md:pr-5 bg-transparent" />
                    
                    <div className="mt-4 text-base text-neutral-400">Email</div>
                    <input className="justify-center focus:border-[#ACD7FF] items-start p-2 mt-4 text-xl font-medium text-blue-200 whitespace-nowrap rounded-lg border border-solid  max-md:pr-5 bg-transparent" />
                    
                    <div className="mt-4 text-base text-neutral-400">Username</div>
                    <input className="justify-center focus:border-[#ACD7FF] items-start p-2 mt-4 text-xl font-medium text-blue-200 whitespace-nowrap rounded-lg border border-solid  max-md:pr-5 bg-transparent" />
                    <div className="mt-4 text-base text-neutral-400">Phone Number *</div>
                    {/* <div className="justify-center items-start px-4 py-6 mt-4 text-xs text-red-600 rounded-xl border-2 border-red-600 border-solid bg-pink-950 max-md:pr-5">
                        must enter phone number
                    </div> */}
                    <div className="text-center items-center p-4 mt-3 text-sm font-medium text-black bg-lime-300 rounded-lg max-md:px-5">
                        Complete Profile
                    </div>
                    <div className="mt-3.5 text-base text-lime-300">
                        <span className="text-neutral-300">
                            By making an account you agree to our Terms of Service.
                        </span>{" "}
                        <span className="text-lime-300 underline">Terms of Service</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CompleteProfilePage;