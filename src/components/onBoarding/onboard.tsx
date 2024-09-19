/*************************************************************************
 * @file onboard.tsx
 * @author End Quote
 * @desc Onboarding component for guiding new users through the site.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import { useEffect, useState } from "react";
import ReactJoyride, { ACTIONS, EVENTS } from "react-joyride";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/* LOCAL IMPORTS */
import { fetchCurrentUser } from "../../redux/actions";
import logo from "../../assets/img/mvssive-logo.png";
import royal_logo from "../../assets/img/royalty-icon.svg";
import { updateUserAPI } from "../../api/user";
import { RootState } from "../../redux/reducers";


const Onboarding = (props:any) => {
  const dispatch: any = useDispatch();
  const [steps, setSteps] = useState([]);
  const location = useLocation(); // Ensure this is also correctly used
  const [queryParamsHistory, setQueryParamsHistory] = React.useState([]);
  const navigate = useNavigate();
  const [user, setUser]: any = useState({});
  const state = useSelector((state: RootState) => state);
  
  
  const handleSubmit = async () => {
    // Construct the payload with user data
    const payload = {
      ...user,
      first_visit: false
    };

    try {
      const update_user = await updateUserAPI(payload, user?.id);
      if (update_user.data.error) {
        console.error("Error updating user:", update_user.data.error);
      } else {
        await dispatch(fetchCurrentUser());
        console.log("User updated successfully:", update_user.data);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    console.log("=== Header State ===");
    setUser(state.auth.user);
    console.log(state.auth.user);
 },[ state ])

  const [joyrideLocale, setJoyrideLocale] = useState({
    back: 'Back',
    close: 'Close',
    last: 'Complete',
    next: 'Next',
    skip: 'Skip Tour'
  });

  useEffect(() => {
    const onboard3Container = document.querySelector('.onboard-3');
    const cardButton = onboard3Container ? onboard3Container.querySelector('.card') : null;
  
    const handleClick = () => {
      // No need to manually navigate since the button click already handles redirection
      // Optionally, you can log the action or trigger any other necessary function here
    };
  
    if (cardButton) {
      cardButton.addEventListener('click', handleClick);
    }
  
    return () => {
      if (cardButton) {
        cardButton.removeEventListener('click', handleClick);
      }
    };
  }, []);


  useEffect(() => {
    const soundSteps = [
      {
        target: ".onboard-body",
        content: (
          <div style={{ 
            width: '500px',
            height: '550px', 
            textAlign: 'justify', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center' }}>
            <img
              src={logo}
              alt="Description of SVG"
              style={{ width: '70%', height: 'auto', marginTop: '10px' }}
            />
            <div style={{ fontSize: '24px', alignItems: 'center'}}>
            <br/>
              <p>Welcome to <strong>MVSSIVE</strong>!<br /><br /></p>
            </div>
            <p style={{fontSize: '16px'}}>
              Lets walk you through the site to get you started!
              Click next to continue.
            </p>
          </div>
        ),
        disableBeacon: true,
        floaterProps: {
          hideArrow: true
        },
        showSkipButton: false,
        placement: "center"
      },
      /**********************//**********************//**********************/
      {
        target: ".onboard-terms",
        content: (
          <div style={{ 
            width: '560px',
            height: '550px',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'justify'
          }}>
            <img
              src={royal_logo}
              alt="Royal logo"
              style={{ width: '25%', height: '50%', marginTop: '10px' }}
            />
            <div style={{ 
              width: '100%',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <p style={{ fontSize: '24px', fontWeight: '600' }}>Welcome to Your Sonic Playground!<br /></p>
                <p><span style={{ textAlign: 'center', display: 'block' }}>(Let's Talk Licensing)</span><br />
              </p>
            </div>
            <p style={{ 
              textAlign: 'center',
              fontSize: '16px',
              width: '100%', // Optional: ensures the paragraph fills its parent container
              margin: '0 10px', // Centers the paragraph within its container if it has a specific width
            }}>
              Feeling Inspired? Dive right in and explore our incredible collection of samples. They're the perfect fuel for your creative fire. Just a heads up, these sounds require 
              licensing (not royalty-free), but don't worry! Our Terms of Use explain it all. Think of 
              them as the backstage pass – they unlock the world of sound, but we're flexible! 
              Have questions or need a custom sample for your project?
              Just let us know, and let's create amazing music together!
            </p>
          </div>
        ),        
        disableBeacon: true,
        floaterProps: {
          hideArrow: true
        },
        placement: "center"
      },
      /**********************//**********************//**********************/
      {
        target: '.onboard-1',
        content:  (
          <div style={{fontSize: "16px", textAlign: 'justify', alignItems: 'center'}}>
            Explore new sounds added weekly<br/>
            to elevate your music productions. 
          </div>
        ),
        disableBeacon: true,
        placement: "auto"
      },
      /**********************//**********************//**********************/
      {
        target: '.onboard-2',
        content:  (
          <div style={{fontSize: "16px", textAlign: 'justify', alignItems: 'center'}}>
            For easy access, all your liked and <br/> 
            downloaded items are conveniently  <br/> 
            stored in this side panel.
          </div>
        ),
        disableBeacon: true,
        placement: "auto"
      },
      /**********************//**********************//**********************/
      {
        target: '.onboard-3',
        content:  (
          <div style={{fontSize: "16px", textAlign: 'justify', alignItems: 'center'}}>
            Browse the diverse selection of samples and packs <br/>
            available. Simply click on any item to access the full list and continue.
          </div>
        ),
        disableBeacon: true,
        placement: "top-start",
        spotlightClicks: true,
        hideBackButton: true,
        hideCloseButton: true,
        showSkipButton: false,
        hideFooter: true,
      },
    ];
    /**********************//**********************//**********************/
    /**********************//**********************//**********************/
    const sampleSteps = [
    {
      target: '.onboard-4',
      content:  (
        <div style={{fontSize: "16px", textAlign: 'justify', alignItems: 'center'}}>
          This is where the magic happens. Dive <br/> 
          into the heart of your chosen pack and <br/>
            explore its treasure trove of unique <br/>
            samples waiting to spark your creativity
        </div>
      ),
      disableBeacon: true,
      placement: 'center',
    },
    /**********************//**********************//**********************/
    {
      target: '.onboard-5',
      content:  (
        <div style={{fontSize: "16px", textAlign: 'justify', alignItems: 'center'}}>
          Simply click the play button on any sample row <br/> 
          to hear it instantly. Use the Space Bar to pause and <br/> 
          resume playback, arrow keys to scroll through samples, <br/> 
          and left and right arrows to fast forward or rewind.
        </div>
      ),
      disableBeacon: true,
      placement: 'auto',
    },
    /**********************//**********************//**********************/
    {
      target: '.onboard-6',
      content:  (
        <div style={{fontSize: "16px", textAlign: 'justify', alignItems: 'center'}}>
          "Considering" is a feature that allows you to see who else <br/> 
          is considering or has downloaded the sample you are interested in. <br/> 
          It gives you insights into who else is exploring the same sound, <br/> 
          fostering collaboration and creative connections within the community.
        </div>
      ),
      disableBeacon: true,
      placement: 'auto',
    },
    /**********************//**********************//**********************/
      {
        target: '.onboard-7',
        content:  (
          <div style={{fontSize: "16px", textAlign: 'justify', alignItems: 'center'}}>
            The "Like" heart icon allows you to<br/> 
              save samples you love to your personal like list.
          </div>
        ),
        disableBeacon: true,
        placement: 'auto',
      },
      {
        target: '.onboard-8',
        content:  (
          <div style={{fontSize: "16px", textAlign: 'justify', alignItems: 'center'}}>
            The "Download" icon allows you <br/> 
            to instantly save a sample to your device
          </div>
        ),
        disableBeacon: true,
        placement: 'auto',
        data: {
          queryParams: 'view=secondStep'
        }
      },
      {
        target: '.onboard-9',
        content:  (
          <div style={{fontSize: "16px", textAlign: 'justify', alignItems: 'center'}}>
            The three dots represent the Action Menu, where <br /> 
            you can access extra options for each sample. You can <br />
            add the sample to your Likes, check Sample Info, download <br />
            MIDI files, or request Split Sheets.
          </div>
        ),
        disableBeacon: true,
        placement: 'auto',
        data: {
          queryParams: 'view=secondStep'
        }
      },
      {
        target: '.onboard-10',
        content:  (
          <div style={{fontSize: "16px", textAlign: 'justify', alignItems: 'center'}}>
            Add to likes allows you to save samples<br/> 
              you love to your personal like list.
          </div>
        ),
        disableBeacon: true,
        placement: 'auto',
        data: {
          queryParams: 'view=secondStep'
        }
      },
      {
        target: '.onboard-11',
        content:  (
          <div style={{fontSize: "16px", textAlign: 'justify', alignItems: 'center'}}>
            Sample Info provides insight into the composers <br/> 
            behind each sample on the platform. Discover the <br/> 
            creative minds responsible for crafting the sounds <br/> 
            that inspire you
          </div>
        ),
        disableBeacon: true,
        placement: 'auto',
        data: {
          queryParams: 'view=secondStep'
        }
      },
      {
        target: '.onboard-12',
        content:  (
          <div style={{fontSize: "16px", textAlign: 'justify', alignItems: 'center'}}>
            Access the MIDI files to customize, edit, <br/> 
            and rearrange the composition to fit your <br/> 
            unique vision.
          </div>
        ),
        disableBeacon: true,
        placement: 'auto',
        data: {
          queryParams: 'view=secondStep'
        }
      },
      {
        target: '.onboard-13',
        content:  (
          <div style={{fontSize: "16px", textAlign: 'justify', alignItems: 'center'}}>
            With "Request Split-Sheet," you have the opportunity  <br/> 
            to secure a sample 100% exclusively. Simply submit your  <br/> 
            proposal, and we will reach out to you promptly to finalize  <br/> 
            the details.
          </div>
        ),
        disableBeacon: true,
        placement: 'auto',
        data: {
          queryParams: 'view=secondStep'
        }
      },
      {
        target: '.onboard-14',
        content:  (
          <>
            <div style={{ fontSize: '24px', alignItems: 'center'}}>
              <p>Thank You for Completing the Onboarding!<br /><br /></p>
            </div>
            <div style={{fontSize: "16px", textAlign: 'center', alignItems: 'center'}}>
              The Onboarding Guide on MVSSIVE is your go-to companion for <br/> 
              navigating through the app. If you need assistance with the <br/> 
              walkthrough again, simply click on "Onboard Guide" for step-by-step <br/> 
              instructions and helpful tips to make the most out of your experience.
            </div>
          </>
        ),
        disableBeacon: true,
        placement: 'center',
        locale: { // Assuming the library uses a `locale` prop to customize text
          next: 'Finish', // Change this to whatever you want the button to say
        },
        data: {
          next: '/sounds',
        },
      },
    ];

    if (location.pathname.includes('sound/samples')) {
      setSteps(sampleSteps);
    } else if (location.pathname.includes('sounds')) {
      setSteps(soundSteps);
    } else {
      setSteps([]); // Default to an empty array if no keyword matches
    }
  }, [location.pathname]);


  const handleJoyrideCallback = (data) => {
    const { action, index, type, step } = data;
  
    // Update the step index to track the current step
    // Check if the Joyride was closed or skipped
    if (type === EVENTS.TOUR_END || action === ACTIONS.CLOSE || action === ACTIONS.SKIP || action === ACTIONS.STOP) {
      handleSubmit();
      console.log("Joyride was closed or skipped");
    }
  
    if (type === EVENTS.STEP_AFTER) {
      if (action === ACTIONS.NEXT) {
        const nextQueryParams = step.data?.queryParams || "";
        setQueryParamsHistory(prev => [...prev, nextQueryParams]); // Push new parameters onto the stack
        navigate({
          pathname: location.pathname,
          search: nextQueryParams ? `?${nextQueryParams}` : ""
        });
      } else if (action === ACTIONS.PREV) {
        // Pop the last item off the history stack when moving backwards
        setQueryParamsHistory(prev => prev.slice(0, -1));
        const previousQueryParams = queryParamsHistory[queryParamsHistory.length - 2] || "";
        navigate({
          pathname: location.pathname,
          search: previousQueryParams ? `?${previousQueryParams}` : ""
        });
      }
  
      // Example of handling a redirection after a step, assuming step.data.next is a URL
      if (step.data && step.data.next) {
        navigate(step.data.next);
      }
    }
  
    // Update locale for 'Complete Tour' button
    const isLastStep = index === steps.findIndex(step => step.target === '.onboard-13');
    setJoyrideLocale(prevLocale => ({
      ...prevLocale,
      last: isLastStep ? 'Complete Tour' : 'Next'
    }));
  };

  return(
    <ReactJoyride
      continuous
      run={user?.first_visit ?? false}
      steps={steps}
      locale={joyrideLocale}
      callback={handleJoyrideCallback}
      disableOverlayClose={true}
      scrollToFirstStep
      hideCloseButton={true}
      styles={{
        options: {
          arrowColor: '#f2ffe9',
          backgroundColor: '#1f1f1f',
          primaryColor: '#C4FF48',
          textColor: '#f2ffe9',
          zIndex: 1000,
          width: '100%',
        },
        tooltip: {
          fontFamily: "'Mona-Sans-M'",
          fontSize: '20px', 
          fontWeight: 'normal',
        },
        buttonNext: {
          fontFamily: "'Mona-Sans-M'",
          color: '#000000',  // Text color for the next button
        },
      }}
    />
  );
}

export default Onboarding;
