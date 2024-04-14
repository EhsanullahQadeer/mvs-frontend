/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="bg-stone-950">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center items-start w-full bg-white max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3187037835e4f8e3b25773bb8651120a26e67473dafd68594e50df3c89a65d60?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3187037835e4f8e3b25773bb8651120a26e67473dafd68594e50df3c89a65d60?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3187037835e4f8e3b25773bb8651120a26e67473dafd68594e50df3c89a65d60?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3187037835e4f8e3b25773bb8651120a26e67473dafd68594e50df3c89a65d60?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3187037835e4f8e3b25773bb8651120a26e67473dafd68594e50df3c89a65d60?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3187037835e4f8e3b25773bb8651120a26e67473dafd68594e50df3c89a65d60?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3187037835e4f8e3b25773bb8651120a26e67473dafd68594e50df3c89a65d60?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3187037835e4f8e3b25773bb8651120a26e67473dafd68594e50df3c89a65d60?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                className="w-full aspect-[0.7] max-md:max-w-full"
              />
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-center self-stretch px-20   w-full text-base bg-stone-950 max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <div className="mt-36 ml-6 text-3xl font-medium text-neutral-300 max-md:mt-10 max-md:max-w-full">
                Welcome to the Inner Circle!
              </div>
              <div className="mt-2 ml-6 text-justify text-neutral-400 max-md:max-w-full">
                <span className="text-neutral-300">
                  Thanks for your interest in joining our exclusive platform. We
                  offer the most sought after audio samples used by the world's
                  top producers – a treasure trove for those crafting
                  cutting-edge music.
                </span>
                <br />
                <br />
                <span className="text-neutral-300">
                  To ensure the quality and security of this exclusive network,
                  all accounts undergo a review process. We'll be in touch
                  shortly to let you know if your application is approved. If
                  you have an
                </span>{" "}
                <span className="font-bold text-zinc-300">invite code</span>,{" "}
                <span className="text-neutral-300">
                  and want to skip the line, please enter below.
                </span>
                <br />
                <br />
                <span className="text-neutral-300">
                  We look forward to welcoming you onboard!
                </span>
                <br />
              </div>
              <input className="bg-[#66666659] border-solid border-[#66666659] mt-6 ml-6 text-neutral-300 max-md:max-w-full" placeholder="Invite Code" />
              
              <div className="shrink-0 self-end mt-4 max-w-full h-14 rounded-xl border border-solid border-stone-500 border-opacity-30 w-[546px]" />
              <div className="mt-7 ml-6 text-lime-300 max-md:max-w-full">
                <span className="text-neutral-300">
                  Dont have an invite-code?
                </span>{" "}
                <span className="text-lime-300 underline cursor-pointer" onClick={() => navigate('/request-info')} >Request Code</span>
              </div>
              <div className="cursor-pointer text-center items-center self-end p-4 mt-6 max-w-full text-sm font-medium text-black bg-lime-300 rounded-lg w-[546px] max-md:px-5">
                Sign Up
              </div>
              <div className="mt-6 ml-6 text-lime-300  max-md:max-w-full">
                <span className="text-neutral-300">
                  Already have an ccount?
                </span>{" "}
                <span onClick={() => navigate('/login')} className="cursor-pointer text-lime-300 underline">Log in </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignupPage;
