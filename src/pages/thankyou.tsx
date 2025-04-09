import * as React from "react";
import { useNavigate } from "react-router-dom";

const ThankyouPage = () => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <div className="flex justify-center items-center px-16 py-20 font-medium bg-stone-950 max-md:px-5">
                <div className="flex flex-col justify-center items-center p-10  max-w-full bg-stone-950 w-[659px] max-md:px-5 max-md:mt-10">
                    <div className="mt-60 text-3xl text-center text-neutral-300 max-md:mt-10">
                        Thank You!
                        <br />
                        <span className="text-base ">
                            A team member will be in touch soon.
                        </span>
                    </div>
                    <div onClick={() => navigate('/login')} className="cursor-pointer text-center items-center p-4 mt-5 mb-44 max-w-full text-sm text-black bg-lime-300 rounded-lg w-[379px] max-md:px-5 max-md:mb-10">
                        Return To Login
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}

export default ThankyouPage;