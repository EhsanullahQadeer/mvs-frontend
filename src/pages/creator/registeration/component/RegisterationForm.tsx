import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { requestInvitationCodeWithEmailAPI } from "api/user";
import NavigateBackButton from "components/buttons/NavigateBack";
import { AxiosResponse } from "axios";


interface ResponseDTO<T = any> { // T defaults to 'any' if not specified
  message: string;
  error: boolean;
  errorCode?: string;
  results?: T; // Generic type for results
}

interface RegisterationFormProps {
  registerAsPartner: boolean | null;
  setRegistered: (value: boolean) => void;
  setAlreadyRegistered: (value: boolean) => void;
  setLoader: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
  setIsNotPartner: (value: boolean) => void; // New prop
}

const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, "");

  if (phoneNumber.length < 4) return phoneNumber;
  if (phoneNumber.length < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
};

const RegisterationForm: React.FC<RegisterationFormProps> = ({
  registerAsPartner,
  setRegistered,
  setAlreadyRegistered,
  setLoader,
  setIsOpen,
  setIsNotPartner
}) => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phone: Yup.string().required("Phone Number is required"),
  });

  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    instagramUsername: "",
  };

  const handleSubmit = async (values: { email: string; firstName: string; lastName: string; phone: string; instagramUsername?: string }) => {
    const { email, firstName, lastName, phone, instagramUsername } = values;
    setLoader(true);
  
    localStorage.setItem("user", JSON.stringify({ email, firstName, lastName }));
  
    try {
      const body = {
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
        ...(registerAsPartner && { instagram_username: instagramUsername }),
        user_type: registerAsPartner ? "partner" : "creator",
      };
  
      const response: AxiosResponse<ResponseDTO> = await requestInvitationCodeWithEmailAPI(body);
      
      // Check if the backend returned an error
      if (response.data.error) {
        const errorCode = response.data.errorCode; // Access the errorCode directly
        const existingUserType = response.data.results?.user_type; // Access user type from results
  
        console.log("existingUserType:", existingUserType); // Debugging
  
        if (errorCode === 'INVITATION_ALREADY_REQUESTED') {
          setAlreadyRegistered(true);
          setRegistered(true);
  
          if (existingUserType === 'partner') {
            setIsNotPartner(false); // It's a partner
          } else if (existingUserType === 'creator') {
            setIsNotPartner(true); // It's a creator
          } else {
            console.log("Unknown user type");
          }
        } else {
          console.log("Unhandled errorCode:", errorCode);
        }
      } else {
        // No error, proceed with registration
        setRegistered(true);
        console.log('response', response);
      }
    } catch (error) {
      console.log("Unhandled exception:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex p-8 flex-col text-white bg-darkGray rounded-lg border border-eerieBlack">
      <h2 className="font-semibold pb-2 text-3xl">
        Complete Your Registration
      </h2>
      <p className="mb-4 text-sm text-mediumGray">
        Please provide the following information to request your account.
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className="w-full text-sm pt-10 flex flex-col justify-between">

              <div className="flex pb-3 w-full gap-2">
                <div className="flex w-full flex-col gap-1">
                  <span className="text-sm">First Name</span>

                  <div className="w-full">
                    <Field
                      name="firstName"
                      type="text"
                      placeholder="e.g john"
                      className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none py-3 px-4 bg-jetBlack border border-eclipseGray text-charcoalGray text-sm rounded-lg w-full"
                    />

                    <div className="text-darkRed mt-1 text-xs font-medium">
                      <ErrorMessage name="firstName" />
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-1">
                  <span className="text-sm">Last Name</span>

                  <div className="w-full">
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="e.g sibley"
                      className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none py-3 px-4 bg-jetBlack border border-eclipseGray text-charcoalGray text-sm rounded-lg w-full"
                    />

                    <div className="text-darkRed mt-1 text-xs font-medium">
                      <ErrorMessage name="lastName" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex pb-3 w-full gap-2">
                <div className="flex w-full flex-col gap-1">
                  <span>Email</span>

                  <div className="w-full">
                    <Field
                      name="email"
                      type="email"
                      placeholder="e.g abc@example.com"
                      className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none py-3 px-4 bg-jetBlack border border-eclipseGray text-charcoalGray text-sm rounded-lg w-full"
                    />

                    <div className="text-darkRed mt-1 text-xs font-medium">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-1">
                  <span>Phone</span>

                  <div className="w-full">
                    <Field
                      name="phone"
                      type="text"
                      placeholder="e.g (546) 675-2345"
                      value={values.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const formattedPhoneNumber = formatPhoneNumber(
                          e.target.value
                        );
                        setFieldValue("phone", formattedPhoneNumber);
                      }}
                      className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full py-3 px-4 bg-jetBlack border border-eclipseGray text-charcoalGray text-sm rounded-lg"
                    />

                    <div className="text-darkRed mt-1 text-xs font-medium">
                      <ErrorMessage name="phone" />
                    </div>
                  </div>
                </div>
              </div>

              {registerAsPartner && (
                <div className="flex w-full flex-col gap-1">
                  <span>Instagram Username</span>
                  <Field
                    name="instagramUsername"
                    type="text"
                    placeholder="@username"
                    className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full py-3 px-4 bg-jetBlack border border-eclipseGray text-charcoalGray text-sm rounded-lg"
                  />
                </div>
              )}
              <p className="py-3 text-xs text-softGray">
                By submitting your information, you agree to our{" "}
                <span className="text-limeGreen">Terms of Service</span> and{" "}
                <span className="text-limeGreen">Privacy Policy</span>
              </p>

              <div className='space-y-4'>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-limeGreen text-jetBlack font-semibold text-sm rounded-full"
                >
                  Submit
                </button>
                <NavigateBackButton
                  switchState={setIsOpen}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterationForm;
