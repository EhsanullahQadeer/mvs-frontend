import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { requestInvitationCodeWithEmail, validateEmail, validateUsername } from "services/user";
import { isValidPhoneNumber } from 'libphonenumber-js';

type Country = {
  name: string;
  dialCode: string;
  countryCode: string;
  iso2: string;
  format: string;
  priority: number;
  regions: string[];
};

const RequestInfoPage = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState('US'); // Initial country code (adjust)

  // Error messages
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: ""
  });

  
  const [isValidInput, setIsValidInput] = useState(true);


  // @TODO fix the problem with putting just 1 and typing random stuff
  const getPhoneNumberFormatLength = (country: Country): number => {
    if (country.format) {
      const placeholderCount = (country.format.match(/\./g) || []).length;
      return placeholderCount;
    }
    return 0; // Fallback to 0 if format is not defined
  };

  const isPhoneNumberComplete = (value: string, country: Country): boolean => {
    const numericValue = value.replace(/\D/g, '');
    const formatLength = getPhoneNumberFormatLength(country);
    console.log('value:', value);
    console.log('country:', country);
    console.log('numericValue length:', numericValue.length);
    console.log('formatLength:', formatLength);
    return numericValue.length >= formatLength;
  };

  const handlePhoneChange = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      phone: value, // Directly update the phone number
    }));
    console.log('info:', value); // Log only the phone number value
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // If all user info has been provided
    if (
      user.first_name &&
      user.last_name &&
      user.email &&
      user.phone
    ) {
      // min and max length of first/last name
      const minLength = 2;
      const maxLength = 50; // Adjust as needed
    
      // Validate first name
      if (user.first_name.length < minLength) {
        setFirstNameError(`First name must be at least ${minLength} characters long.`);
        setIsSubmitting(false);
        return;
      } else if (user.first_name.length > maxLength) {
        setFirstNameError(`First name can't be longer than ${maxLength} characters.`);
        setIsSubmitting(false);
        return;
      } else {
        setFirstNameError(null); // Clear error if valid
      }

      // Validate last name
      if (user.last_name.length < 2 || user.last_name.length > 50) {
        setLastNameError(`Last name must be at least ${minLength} characters long.`);
        setIsSubmitting(false);
        return;
      } else if (user.last_name.length > maxLength) {
        setLastNameError(`Last name can't be longer than ${maxLength} characters.`);        
        setIsSubmitting(false);
        return;
      } else {
        setLastNameError(null); // Clear error if valid
      }


      // Validate email
      const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
      if (!regEx.test(user.email)) {
        setEmailError('Invalid email.');
        toast.error('invalid email');
        setIsSubmitting(false);
        return;
      }

      // Look if email has already requested a code
      try{
        const response = await validateEmail( user.email );
        console.log('response', response);
        if( response.data.exists ){
          setEmailError(`This email already requested an invitation code.`);
          setIsSubmitting(false);
          return;
        }
      } catch( e ){
        setEmailError('Error with the provided email.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      

      /**
       * Request invitation code to be sent to provided email
       */
      try {
        await requestInvitationCodeWithEmail( user );
        setIsSubmitting(false);
        setSuccess(true);
        toast.success("Your request for access to the platform has been sent.");
      } catch (error) {
        setIsSubmitting(false);
        toast.error(
          "It seems your account already exists or has pending access."
        );
      }
    } else {
      toast.error("Please fill the required fields.");
      setIsSubmitting(false);
    }
  };
  
  return (
    <React.Fragment>
      {/* SUCCESS PAGE */}
      {success ? (
        <div className="min-h-screen flex justify-center items-center px-16 py-20 font-medium bg-stone-950 max-md:px-5">
          <div className="flex flex-col justify-center items-center p-10 max-w-full bg-stone-950 w-[659px] max-md:px-5 max-md:mt-10">
            <div className="mt-60 text-3xl text-center text-neutral-300 max-md:mt-10">
              We've received your request to join MVSSIVE!
              <br />
              <span className="text-base">
                Keep an eye on your inbox. We'll send you a unique invitation code if your application is approved.
              </span>
            </div>
            <div
              onClick={() => 
                navigate("/")
              }
              className="cursor-pointer text-center items-center p-4 mt-5 mb-44 max-w-full text-sm text-black bg-lime-300 rounded-lg w-[379px] max-md:px-5 max-md:mb-10"
            >
              Continue to Sign Up
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center px-16 py-20 text-base bg-stone-950 text-neutral-400 max-md:px-5">
          <div className="flex flex-col p-10 mt-[10px] max-w-full rounded-lg border border-solid bg-zinc-900 border-neutral-800 w-[553px] max-md:px-5 max-md:mt-10">
            {/* Title */}
            <div className="text-3xl font-medium text-neutral-300 max-md:max-w-full">
              Talent Profile Request
            </div>

          <div className="w-full h-px bg-neutral-600 my-4"></div>

              {/* First and Last Name */}
              <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                <label className="mt-6 max-md:max-w-full">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={user.first_name}
                  className={`mt-2 p-2 bg-zinc-800 text-neutral-300 border border-neutral-700 rounded-lg ${firstNameError ? 'border-red-500' : ''}`} // Add error class
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="mt-6 max-md:max-w-full">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={user.last_name}
                  className={`mt-2 p-2 bg-zinc-800 text-neutral-300 border border-neutral-700 rounded-lg ${lastNameError ? 'border-red-500' : ''}`} // Add error class
                  onChange={handleChange}
                />
              </div>
            </div>


            {/* First name error message */}
            {firstNameError && (
              <p className="text-red-500 mt-2">{firstNameError}</p>
            )}
            {/* Last name error message */}
            {lastNameError && (
              <p className="text-red-500 mt-2">{lastNameError}</p>
            )}


            {/* Username */}
            {/* <div className="mt-7 max-md:max-w-full">
              Username <span className="text-red-500">*</span>
            </div>
            <input
              type="text"
              name="username"
              value={user.username}
              className={`mt-2 p-2 bg-zinc-800 text-neutral-300 border border-neutral-700 rounded-lg ${usernameError ? 'border-red-500' : ''}`} // Add error class
              onChange={handleChange}
            /> */}
            {/* Username error message */}
            {/* {usernameError && (
              <p className="text-red-500 mt-2">{usernameError}</p>
            )} */}


            {/* Email */}
            <div className="mt-7 max-md:max-w-full">
              Email <span className="text-red-500">*</span>
            </div>
            <input
              type="text"
              name="email"
              value={user.email}
              className={`mt-2 p-2 bg-zinc-800 text-neutral-300 border border-neutral-700 rounded-lg ${emailError ? 'border-red-500' : ''}`} // Add error class
              onChange={handleChange}
            />
            {/* Email error message */}
            {emailError && (
              <p className="text-red-500 mt-2">{emailError}</p>
            )}



            {/* Phone */}
            <div className="mt-7 max-md:max-w-full">
              Phone <span className="text-red-500">*</span>
            </div>
            <div className={`mt-2 p-2 bg-zinc-800 text-neutral-300 border border-neutral-700 rounded-lg ${isValidInput ? '' : 'border-red-500'}`}>
              <PhoneInput
                country={countryCode} // Pass dynamic country code
                value={user.phone}
                isValid={(value: string, country: Country) => {
                  const valid = isPhoneNumberComplete(value, country);
                  setIsValidInput(valid);

                  // Phone number is not complete yet
                  if (!valid) {
                    return false;
                  }
        
                  // Custom validation after phone number is complete
                  if (value.match(/12345/)) {
                    console.log('here');
                    return 'Invalid value: ' + value + ', ' + country.name;
                  } else if (value.match(/1234/)) {
                    console.log('hered');
                    return false;
                  } else {
                    console.log('hered22');
                    return true;
                  }
                }}
                onChange={handlePhoneChange}
                containerStyle={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  borderRadius: '0.75rem',
                  padding: '0',
                  border: 'none',
                }}
                dropdownClass="custom-dropdown"
                dropdownStyle={{
                  backgroundColor: '#1e1e1e',
                  borderRadius: '5px',
                  border: '1px solid #1E34F9',
                }}
                inputStyle={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  color: '#d3d3d3',
                  border: 'none',
                  outline: 'none',
                  paddingLeft: '0px',
                  textAlign: 'center',
                }}
                buttonStyle={{
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              />
            </div>

            {/* Submit Request */}
            <button
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="text-center items-center p-4 mt-5 text-sm font-medium text-black bg-lime-300 rounded-lg max-md:px-5 max-md:max-w-full"
            >
              {isSubmitting ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="m-auto inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>Submit Request</>
              )}
            </button>
            <div className="mt-6 text-lime-300 max-md:max-w-full">
              <span className="text-neutral-300">Already have an account? </span>
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer text-lime-300 underline"
              >
                Log in
              </span>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </React.Fragment>
  );
};

export default RequestInfoPage;
