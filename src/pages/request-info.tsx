import * as React from "react";
import { useNavigate } from "react-router-dom";

const RequestInfoPage = () => {

    const navigate = useNavigate();

    
    return (
        <React.Fragment>
            <div className="flex justify-center items-center px-16 py-20 text-base bg-stone-950 text-neutral-400 max-md:px-5">
                <div className="flex flex-col p-10 mt-[10px] max-w-full rounded-lg border border-solid bg-zinc-900 border-neutral-800 w-[553px] max-md:px-5 max-md:mt-10">
                    <div className="text-3xl font-medium text-neutral-300 max-md:max-w-full">
                        Request Info
                    </div>
                    <div className="mt-6 max-md:max-w-full">Full Name</div>
                    <input className="shrink-0 mt-4 h-14 rounded-xl border border-solid border-stone-500 bg-transparent border-opacity-30 max-md:max-w-full" />
                    <div className="mt-7 max-md:max-w-full">Instagram Username</div>
                    <input className="shrink-0 mt-3.5 h-14 rounded-xl border border-solid border-stone-500 border-opacity-30 max-md:max-w-full bg-transparent " />
                    <div className="mt-7 max-md:max-w-full">Producer Name</div>
                    <input className="bg-transparent  shrink-0 mt-4 h-14 rounded-xl border border-solid border-stone-500 border-opacity-30 max-md:max-w-full" />
                    <div className="mt-7 max-md:max-w-full">User Type</div>
                    <input placeholder="e.g - executive producer, beat maker" className="bg-transparent   justify-center items-start p-5 mt-3.5 text-sm font-medium rounded-xl border border-solid border-stone-500 border-opacity-30 text-stone-500 max-md:max-w-full"/>
                    <div className="text-center items-center p-4 mt-5 text-sm font-medium text-black bg-lime-300 rounded-lg max-md:px-5 max-md:max-w-full">
                        Submit Request
                    </div>
                    <div className="mt-6 text-lime-300  max-md:max-w-full">
                        <span className="text-neutral-300">Already have an ccount?</span>{" "}
                        <span onClick={() => navigate('/login')} className="cursor-pointer text-lime-300 underline">Log in </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default RequestInfoPage;