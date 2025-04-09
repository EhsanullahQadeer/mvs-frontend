/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createNewUser, verifyCode } from "services/user";
import { FileUploader } from "react-drag-drop-files";
import PhoneInput from "react-phone-input-2";


const SignupPage = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState(null);

  const [show_signup, setSignup] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState(null);

  const fileTypes = ["JPG", "PNG", "JPEG"];

  const [user, setUser] = useState({
    password: "",
    name: "",
    phone: ""
  });


  const handlePhoneChange = (value) => {
    // Create a simulated event object
    const event = {
      target: {
        name: 'phone',
        value: value,
      }
    };
    handleChange(event);
  };

  const handleChange = (e) => {
    const data: any = {
      ...user,
    };

    data[e.target.name] = e.target.value;

    console.log(data);

    setUser(data);
  };

  const [previewUrl, setPreviewUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [imageType, setImageType] = useState(null);

  const handleFileChange = (file: any) => {

    console.log("=== Image ===");

    console.log(file);

    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {

      setPreviewUrl(URL.createObjectURL(file));

      console.log("Preview ", URL.createObjectURL(file));

      setImageName(file.name);

      setImageType(file.type);

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log(reader.result);

        setImage(reader.result);
      };
    };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const _code = await verifyCode({ code });

    console.log(_code);


    if (_code.data.error) {

      toast.error("Invalid invite code.");

      setIsSubmitting(false);

    } else {

      setEmail(_code.data.results.email)

      setSignup(true);

      setIsSubmitting(false);

    }

    setIsSubmitting(false);

  }

  const signup = async () => {

    setIsSubmitting(true);

    const payload = {

      name: user.name,
      password: user.password,
      email: email,
      thumbnail: image,
      image_type: imageType,
      image_name: imageName,
      phone: user.phone

    }

    try {

      const new_user = await createNewUser(payload);

      console.log(new_user);

      if (new_user.data.error) {
        toast.error(new_user.data.message);
        setIsSubmitting(false);

      } else {
        toast.success("Account has been created successfully. Please login to continue.");

        setIsSubmitting(false);


        setTimeout(() => {

          navigate("/")
          
        }, 2000);
      }

    } catch (error) {

      toast.error(error.message);
      setIsSubmitting(false);

    }

    setIsSubmitting(false);
  }


  return (
    <React.Fragment>
      {show_signup === true ? (
        <>

          <div className="flex justify-center items-center px-16 py-20 bg-stone-950 max-md:px-5">
            <div className="flex flex-col p-8  max-w-full rounded-3xl border border-solid bg-zinc-900 border-neutral-800 w-[460px] max-md:px-5">
              <div className="flex flex-col px-20 max-md:px-5">
                <div className="self-center text-2xl font-medium text-neutral-200">
                  Profile Info
                </div>
                <div className="mx-3.5 mt-2 text-base text-zinc-600 max-md:mx-2.5">
                  Welcome to the Inner Circle!
                </div>
              </div>
              <div className="flex justify-center items-center px-16 mt-9 text-base font-medium text-white max-md:px-5">
                <div className="flex flex-col max-w-full w-[153px]">

                  {previewUrl ? (
                    <>
                      <img
                        loading="lazy"
                        className="self-center max-w-full rounded-full border-2 border-white border-solid aspect-square w-[100px]"
                        src={previewUrl}

                      />

                    </>
                  ) : (
                    <>
                      <img
                        loading="lazy"
                        src="http://www.gravatar.com/avatar/?d=mp"
                        className="self-center max-w-full rounded-full border-2 border-white border-solid aspect-square w-[100px]"
                      />
                    </>
                  )}
                  <FileUploader

                    classes
                    name="file"
                    handleChange={handleFileChange}
                    types={fileTypes}
                  >
                    <div className="flex gap-2.5 justify-center p-2.5 mt-3 cursor-pointer">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9651b37c5a2f80fabc45d3eae3490c4a07d3f1a09b72c458d5fa58dce2e92470?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                        className="shrink-0 w-6 aspect-square"
                      />
                      <div className="my-auto">Select Image</div>

                    </div>
                  </FileUploader>
                </div>
              </div>
              <div className="mt-4 text-base text-neutral-400">Name</div>
              <input onChange={handleChange} name="name" className="justify-center focus:border-[#ACD7FF] items-start p-2 mt-4 text-xl font-medium text-blue-200 whitespace-nowrap rounded-lg border border-solid  max-md:pr-5 bg-transparent" />

              <div className="mt-4 text-base text-neutral-400">Email</div>
              <input value={email} disabled className="justify-center focus:border-[#ACD7FF] items-start p-2 mt-4 text-xl font-medium text-blue-200 whitespace-nowrap rounded-lg border border-solid  max-md:pr-5 bg-transparent" />

              <div className="mt-4 text-base text-neutral-400">Password</div>
              <input onChange={handleChange} type="password" name="password" className="justify-center focus:border-[#ACD7FF] items-start p-2 mt-4 text-xl font-medium text-blue-200 whitespace-nowrap rounded-lg border border-solid  max-md:pr-5 bg-transparent" />

              <div className="mt-4 text-base text-neutral-400">Phone</div>
              <PhoneInput
                  country={'us'}
                  value={''}
                  onChange={handlePhoneChange} // Update phone number using the wrapped handler
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
                    color: '#d3d3d3',
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
              <button disabled={isSubmitting} onClick={signup} className="text-center items-center p-4 mt-3 text-sm font-medium text-black bg-lime-300 rounded-lg max-md:px-5">
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
                  <>Complete Profile</>
                )}
              </button>
              <div className="mt-3.5 text-base text-lime-300">
                <span className="text-neutral-300">
                  By making an account you agree to our Terms of Service.
                </span>{" "}
                <a href="/terms-of-service" target="_blank" className="text-lime-300 underline">Terms of Service</a>
              </div>
            </div>
          </div>

        </>
      ) : (
        <>
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
                  
                  <input 
                    onChange={(e: any) => setCode(e.target.value)} 
                    name="code"
                    className="shrink-0 self-end mt-4 max-w-full h-14 rounded-xl border border-solid border-stone-500 border-opacity-30 w-[546px] bg-[#101010] text-white"
                    placeholder="Invite Code" 
                  />
                  <div className="mt-7 ml-6 text-lime-300 max-md:max-w-full">
                    <span className="text-neutral-300">
                      Dont have an invite-code?
                    </span>{" "}
                    <span className="text-lime-300 underline cursor-pointer" onClick={() => navigate('/request-info')} >Request Code</span>
                  </div>
                  <button disabled={isSubmitting} onClick={handleSubmit} className="cursor-pointer text-center items-center self-end p-4 mt-6 max-w-full text-sm font-medium text-black bg-lime-300 rounded-lg w-[546px] max-md:px-5">
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
                      <>Sign Up</>
                    )}
                  </button>
                  <div className="mt-6 ml-6 text-lime-300  max-md:max-w-full">
                    <span className="text-neutral-300">
                      Already have an account?
                    </span>{" "}
                    <span onClick={() => navigate('/login')} className="cursor-pointer text-lime-300 underline">Log in </span>
                  </div>
                </div>
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

export default SignupPage;
