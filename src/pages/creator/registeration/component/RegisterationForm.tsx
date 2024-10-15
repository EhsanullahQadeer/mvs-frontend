import React, { useState } from "react";
import { Field, Formik } from "formik";

interface RegisterationFormProps {
  submittedApplication: boolean | null;
  setSubmittedApplication: (value: boolean | null) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  
  const phoneNumber = value.replace(/[^\d]/g, '');
  
  if (phoneNumber.length < 4) return phoneNumber;
  if (phoneNumber.length < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

const RegisterationForm: React.FC<RegisterationFormProps> = ({
  submittedApplication,
  setSubmittedApplication,
  isOpen,
  setIsOpen,
}) => {
  const handleSubmit = (values: {
    email: string;
    FirstName: string;
    LastName: string;
    Phone: string;
    InstagramUsername?: string;
  }) => {
    console.log("Form values:", values);
  };

  return (
    <div className="flex p-8 flex-col text-white bg-[#131313] rounded-lg border border-[#1C1C1C]">
      <h2 className="font-semibold pb-2 text-3xl">Complete Your Registration</h2>
      <p className="mb-4 text-sm text-[#999999]">
        Please provide the following information to request your account.
      </p>
      <Formik
        initialValues={{ email: "", FirstName: "", LastName: "", Phone: "", InstagramUsername: "" }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <form className="w-full text-sm pt-10 flex flex-col justify-between" onSubmit={handleSubmit}>
            <div className="flex pb-3 w-full gap-2">
              <div className="flex w-full flex-col">
                <span className="text-sm">Firstname</span>
                <Field
                  name="FirstName"
                  type="text"
                  placeholder="e.g john"
                  className=" py-3 px-4 bg-[#0F0F0F] border border-[#242424] text-[#3D3D3D] text-sm rounded-lg"
                />
              </div>
              <div className="flex w-full flex-col">
                <span className="text-sm">Lastname</span>
                <Field
                  name="LastName"
                  type="text"
                  placeholder="e.g sibley"
                  className=" py-3 px-4 bg-[#0F0F0F] border border-[#242424] text-[#3D3D3D] text-sm rounded-lg"
                />
              </div>
            </div>
            <div className="flex pb-3  w-full gap-2">
              <div className="flex w-full flex-col">
                <span>Email</span>
                <Field
                  name="email"
                  type="email"
                  placeholder="e.g abc@example.com"
                  className=" py-3 px-4 bg-[#0F0F0F] border border-[#242424] text-[#3D3D3D] text-sm rounded-lg"
                />
              </div>
              <div className="flex w-full flex-col">
                <span>Phone</span>
                <Field
                  name="Phone"
                  type="text"
                  placeholder="e.g (546) 675-2345"
                  value={values.Phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
                    setFieldValue("Phone", formattedPhoneNumber);
                  }}
                  className="w-full py-3 px-4 bg-[#0F0F0F] border border-[#242424] text-[#3D3D3D] text-sm rounded-lg"
                />
              </div>
            </div>
            {!submittedApplication && (
              <div className="flex w-full flex-col">
                <span>Instagram Username</span>
                <Field
                  name="InstagramUsername"
                  type="text"
                  placeholder="@knifeparty"
                  className="w-full py-3 px-4 bg-[#0F0F0F] border border-[#242424] text-[#3D3D3D] text-sm rounded-lg"
                />
              </div>
            )}
            <p className="py-3 text-xs">
              By submitting your information, you agree to our <span className="text-[#9EFF00]">Terms of Service</span> and{" "}
              <span className="text-[#9EFF00]">Privacy Policy</span>
            </p>

            <button type="submit" className="w-full py-3 px-5 bg-[#9EFF00] text-black font-bold rounded-full ">
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterationForm;
