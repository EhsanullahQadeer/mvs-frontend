import * as React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <main className="flex home-bg justify-center items-center px-16 py-20 text-7xl font-black tracking-widest text-center text-lime-300 uppercase leading-[96px] max-md:px-5 max-md:text-4xl">
                <section onClick={() => navigate('/login')} className="cursor-pointer flex flex-col justify-center mt-44 max-w-full rounded border-2 border-solid border-neutral-500 w-[593px] max-md:mt-10 max-md:text-4xl">
                    <h1 className="justify-center items-start py-11 pr-16 pl-20 max-md:px-5 max-md:max-w-full max-md:text-4xl">
                        M[V]SSIVE
                    </h1>
                </section>
            </main>
        </React.Fragment>
    );
}

export default HomePage;