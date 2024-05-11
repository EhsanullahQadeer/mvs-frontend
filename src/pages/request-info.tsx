import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { requestAccess } from "services/user";

const RequestInfoPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    instagram: "",
    producer_name: "",
    email: "",
    user_type: "",
    phone:""
  });

  // Phone input change handler
  const handlePhoneChange = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      phone: value, // Directly update the phone number
    }));

    console.log('info:', value); // Log only the phone number value
  };

  const handleChange = (e: any) => {
    const data: any = {
      ...user,
    };
    console.log('info: ', e);

    data[e.target.name] = e.target.value;

    setUser(data);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (
      user.name &&
      user.instagram &&
      user.producer_name &&
      user.email &&
      user.user_type &&
      user.phone
    ) {

      const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
      if (!regEx.test(user.email)) {
        toast.error("Invalid email");
        return;
      }

      try {
        await requestAccess(user);

        setIsSubmitting(false);

        setSuccess(true);

        toast.success("Your request for access the platform has been sent.");
      } catch (error) {
        setIsSubmitting(false);

        toast.error(
          "It seems your account already exists or have pending access."
        );
      }
    } else {
      toast.error("Please fill the required fields.");

      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      {success ? (
        <>
          <div className="flex justify-center items-center px-16 py-20 font-medium bg-stone-950 max-md:px-5">
            <div className="flex flex-col justify-center items-center p-10  max-w-full bg-stone-950 w-[659px] max-md:px-5 max-md:mt-10">
              <div className="mt-60 text-3xl text-center text-neutral-300 max-md:mt-10">
                We've received your request to join MVSSIVE!

                <br />
                <span className="text-base ">
                  Keep an eye on your inbox. We'll send you a unique invitation code if your application is approved.
                </span>
              </div>
              <div
                onClick={() => navigate("/signup")}
                className="cursor-pointer text-center items-center p-4 mt-5 mb-44 max-w-full text-sm text-black bg-lime-300 rounded-lg w-[379px] max-md:px-5 max-md:mb-10"
              >
                Continue to Sign Up
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center px-16 py-20 text-base bg-stone-950 text-neutral-400 max-md:px-5">
            <div className="flex flex-col p-10 mt-[10px] max-w-full rounded-lg border border-solid bg-zinc-900 border-neutral-800 w-[553px] max-md:px-5 max-md:mt-10">
              <div className="text-3xl font-medium text-neutral-300 max-md:max-w-full">
                Request Info
              </div>
              <div className="mt-6 max-md:max-w-full">
                Full Name <span className="red">*</span>
              </div>
              <input
                onChange={handleChange}
                name="name"
                className="shrink-0 mt-4 h-14 rounded-xl border border-solid border-stone-500 bg-transparent border-opacity-30 max-md:max-w-full"
              />
              <div className="mt-7 max-md:max-w-full">
                Instagram Username <span className="red">*</span>
              </div>
              <input
                onChange={handleChange}
                name="instagram"
                className="shrink-0 mt-3.5 h-14 rounded-xl border border-solid border-stone-500 border-opacity-30 max-md:max-w-full bg-transparent "
              />
              <div className="mt-7 max-md:max-w-full">
                Producer Name <span className="red">*</span>
              </div>
              <input
                onChange={handleChange}
                name="producer_name"
                className="bg-transparent  shrink-0 mt-4 h-14 rounded-xl border border-solid border-stone-500 border-opacity-30 max-md:max-w-full"
              />
              <div className="mt-7 max-md:max-w-full">
                Email <span className="red">*</span>
              </div>
              <input
                onChange={handleChange}
                name="email"
                className="bg-transparent  shrink-0 mt-4 h-14 rounded-xl border border-solid border-stone-500 border-opacity-30 max-md:max-w-full"
              />
              <div className="mt-7 max-md:max-w-full">
                Phone <span className="red">*</span>
              </div>
              <div className="bg-transparent shrink-0 mt-4 h-14 rounded-xl border border-solid border-stone-500 border-opacity-30 max-md:max-w-full">
                <PhoneInput
                  country={'us'}
                  value={''}
                  onChange={handlePhoneChange} // Update phone number
                  containerStyle={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'transparent', // Match other input background
                    borderRadius: '0.75rem', // Match other input border radius (rounded-xl)
                    height: '56px', // Match other input height (h-14)
                    padding: '0', // Remove padding
                    border: 'none', // Match other input border
                  }}
                  dropdownClass="custom-dropdown"
                  dropdownStyle={{
                    backgroundColor: '#1e1e1e', // Custom dropdown background color
                    borderRadius: '5px',
                    border: '1px solid #1E34F9',
                  }}
                  inputStyle={{
                    width: '100%',
                    backgroundColor: 'transparent', // Match other input background
                    color: '#d3d3d3',
                    border: 'none',
                    outline: 'none',
                    paddingLeft: '0px', // Adjust padding
                    height: '56px', // Match other input height (h-14)
                    textAlign: 'center', // Center the text
                  }}
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    border: 'none',
                  }}
                />
              </div>
              <div className="mt-7 max-md:max-w-full">
                User Type <span className="red">*</span>
              </div>
              <input
                onChange={handleChange}
                name="user_type"
                placeholder="e.g - executive producer, beat maker"
                className="bg-transparent   justify-center items-start p-5 mt-3.5 text-sm font-medium rounded-xl border border-solid border-stone-500 border-opacity-30 text-stone-500 max-md:max-w-full"
              />
              <button
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="text-center items-center p-4 mt-5 text-sm font-medium text-black bg-lime-300 rounded-lg max-md:px-5 max-md:max-w-full"
              >
                {isSubmitting ? (
                  <>
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
                  </>
                ) : (
                  <>Submit Request</>
                )}
              </button>
              <div className="mt-6 text-lime-300  max-md:max-w-full">
                <span className="text-neutral-300">
                  Already have an account?
                </span>{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="cursor-pointer text-lime-300 underline"
                >
                  Log in{" "}
                </span>
              </div>
            </div>
          </div>
        </>
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
