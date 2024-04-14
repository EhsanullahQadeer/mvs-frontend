/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";

const Theme = (props:any) => {
    const navigate = useNavigate();
    return (
        <React.Fragment>

            <div className="con">

                <Header />

                <div className="two-divs flex">

                    <Sidebar />

                    {props.children}
      
                </div>
            </div>

        </React.Fragment>
    );
}

export default Theme;