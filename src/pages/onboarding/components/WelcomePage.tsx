/*****************************************************************************************
 * @file WelcomePage.tsx
 * @author Ramiro Santos
 * @desc  Component for the WelcomePage for the onboarding page.
 *
 * @copyright (c) 2024 Darkstar Innovations. All rights reserved.
 ****************************************************************************************/

import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import banner from "../../../assets/img/welcome-banner.svg";
import leftWing from "../../../assets/img/left wing.svg";
import rightWing from "../../../assets/img/right wing.svg";
import frquesncyIcon from "../../../assets/img/frequency-Icon.svg";
import crownIcon from "../../../assets/icons/crownIcon.svg";
import sharpline from "../../../assets/img/sharpline.png";
import zigzag from "../../../assets/img/zigzag.svg";
import welcomeBanner from "../../../assets/img/welcome-banner.svg";
import sharplinebelow from "../../../assets/img/sharplinebelow.svg";
import imageAudioPlayer from "../../../assets/img/imageAudioPlayer.svg";
import imageAudioAlbum from "../../../assets/img/imageAudioAlbum.svg";
import rightsidesharpline from "../../../assets/img/rightsidesharpline.svg";
import leftsidesharpline from "../../../assets/img/leftsidesharpline.svg";
import { useState, useEffect } from 'react';


const WelcomePage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isError = searchParams.get('error') === 'true';
  const errorMessage = searchParams.get('message');
  const userFirstName = searchParams.get('userFirstName');
  const userLastName = searchParams.get('userLastName');
  
  const [showErrorPopup, setShowErrorPopup] = useState(isError);

  useEffect(() => {
    if (!userFirstName || !userLastName) {
      console.error('User information not found in URL');
      // navigate('/home');
      return;
    }

    // You can use the user info here
    console.log(`Welcome ${userFirstName} ${userLastName}`);
  }, [userFirstName, userLastName, navigate]);


  // Show popup if error parameter is true
  useEffect(() => {
    if (isError) {
      setShowErrorPopup(true);
    }
  }, [isError]);

  const handleGetStarted = () => {
    navigate('/');
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#131313] overflow-hidden">
      <img 
        src={leftsidesharpline}
        alt="left side sharp line"
        className="absolute left-0 top-0 h-full w-1/4 object-contain object-left"
      />
      <img 
        src={rightsidesharpline}
        alt="right side sharp line"
        className="absolute right-0 top-0 h-full w-1/2 object-cover object-left"
      />
      
      <div className="flex flex-col items-center max-w-xl px-4 space-y-8 z-10">
        <img 
          src={zigzag}
          alt="zigzag pattern"
          className="absolute -z-10 -top-10 left-1/2 transform -translate-x-1/2 w-[1200px] object-contain pointer-events-none"
        />

        <div className="relative">
          <img
            className="absolute -left-8 top-1/2 transform -translate-y-1/2"
            src={frquesncyIcon}
            alt="frequency-icon"
          />
          <img 
            src={imageAudioAlbum}
            alt="audio Album"
            className="absolute w-[100px] h-[100px] -left-3/4 bottom-0 object-contain"
          />
          <img 
            src={imageAudioPlayer}
            alt="audio player"
            className="absolute w-[150px] h-[150px] -right-3/4 top-1/2 transform -translate-y-1/2 object-contain"
          />
          <h1 className="text-[32px] text-gainsboro font-semibold leading-[38px] tracking-[-0.64px] relative">
            Welcome to MVSSIVE!
            <img
              className="absolute -right-6 -top-10"
              src={crownIcon}
              alt="crown-icon"
            />
          </h1>
        </div>

        <p className="text-white text-center text-sm">
          Welcome to <span className="text-limeGreen">MVSSIVE</span> {userFirstName} {userLastName}! We're thrilled to have you on board as a
          Partner. Get ready to create your profile and start connecting with top creators
          in the music industry. Let's make something amazing together!
        </p>

        <div className="w-[500px]">
          <div className="flex items-center gap-4 justify-center">
            <img 
              className="h-[120px] w-[120px] object-contain" 
              src={leftWing} 
              alt="left-wing"
            />

            <button 
              onClick={handleGetStarted}
              className={`
                rounded-full 
                bg-[#9EFF00] 
                text-[#0F0F0F] 
                px-40
                py-4 
                text-base 
                font-medium
                flex
                flex-row
                items-center
                gap-1
                leading-none
                ${isError ? 'error' : ''}`
              }
            >
              <span>Get</span>
              <span>Started!</span>
            </button>

            <img 
              className="h-[120px] w-[120px] object-contain" 
              src={rightWing} 
              alt="right-wing"
            />
          </div>
        </div>

        <img 
          className="w-100 mt-100" 
          src={sharplinebelow} 
          alt="underline" 
        />
      </div>

      {showErrorPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#FF0000] bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md mx-4">
            <div className="flex flex-col items-center">
              <div className="text-white text-xl font-bold mb-4">
                ⚠️ Stripe Process Failed ⚠️
              </div>
              <p className="text-white text-center mb-6">
                We encountered an error processing your Stripe Connect account. Please try again or contact support if the issue persists.
              </p>
              <button
                onClick={() => setShowErrorPopup(false)}
                className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
