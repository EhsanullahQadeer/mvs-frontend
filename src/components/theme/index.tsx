/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";
import logo from "../../assets/img/massive_text.svg";

const Theme = (props:any) => {

    const [sidebarHidden, setSidebarHidden] = React.useState(false);

    React.useEffect(() => {
      const handleResize = () => {
        setSidebarHidden(window.innerWidth <= 800);
      };
  
      handleResize(); // Set the initial value
  
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navigate = useNavigate();
    return (
        <React.Fragment>

    <div className="grid grid-rows-[auto,1fr] grid-cols-[auto,1fr] h-screen">

        
        {/* New top-left container */}
        <div className="row-start-1 col-start-1 bg-[#141414] w-[240px] border-b-2 border-r-2 border-[#1F1F1F] flex items-center justify-center">
            {/* Adjust the content inside the new container */}
            <img src={logo} alt="Site Logo" className="h-auto" />
        </div>

        {/* Header, next to the logo */}
        <div className="row-start-1 col-start-2 border-b-2 border-[#1F1F1F]">
            <Header />
        </div>

        {/* Sidebar */}
        <div className="row-start-2 col-start-1">
            <Sidebar />
        </div>

        {/* Main content */}
        <div className="row-start-2 col-start-2 overflow-auto">
            {props.children}
        </div>
    </div>

    {/* <div className={`flex flex-col min-h-screen ${isSidebarVisible ? 'lg:flex-row' : ''}`}>
        
        {isSidebarVisible && (
            <div className="flex flex-col bg-[#141414] w-[216px] border-r-2 border-[#1F1F1F]">
                <div className="border-b-2 border-[#1F1F1F] flex items-center justify-center h-[60px]">
                    <img src={logo} alt="Site Logo" className="h-auto" />
                </div>
                <Sidebar />
            </div>
        )}

        <div className="flex flex-col flex-grow">
            
            <div className="border-b-2 border-[#1F1F1F]">
                <Header />
            </div>

            
            <div className="overflow-auto">
                {props.children}
            </div>
        </div>
    </div> */}





        </React.Fragment>
    );
}

export default Theme;