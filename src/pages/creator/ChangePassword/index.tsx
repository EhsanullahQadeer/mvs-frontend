import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';  // for validation
import React, { useState } from 'react';
import { RiLockLine } from 'react-icons/ri';
import logo from '../../../assets/img/M-logo.png'
import ChangeSuccessfully from './ChangeSuccessfully';
const ChangePassword: React.FC = () => {
    const [isChanged , setIsChanged] = useState(false)
  const handleSubmit = (values: { password: string; confirmPassword: string }) => {
    console.log('New password submitted:', values.password);
    setIsChanged(true)
   };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  return (
    <>
    <div
    className={`z-50 w-full h-screen bg-[#131313] ${
      isChanged ? "flex" : "hidden"
    }`}
  >
    <ChangeSuccessfully/>
  </div>
    <div className="flex flex-col items-center justify-center h-screen p-8 bg-[#131313] text-white">
      <div className="flex text-xl items-center py-4 justify-center gap-2.5">
        <div className="">
          <img className="h-full w-full object-cover" src={logo} alt="Logo" />
        </div>
        <span>mvssive.net</span>
      </div>

      <div className="py-8 flex justify-center flex-col items-center gap-2">
        <h2 className="text-3xl font-semibold tracking-tighter">Change your password</h2>
        <p className="w-72 text-center text-[#666666] text-sm">Enter a new password below to update your password</p>
      </div>

      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-80">
            <div className="relative mb-3">
              <span className="absolute inset-y-0 right-3 flex items-center text-[#666666]">
                <RiLockLine />
              </span>
              <Field
                name="password"
                type="password"
                placeholder="Enter new password"
                className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full text-sm p-4 bg-[#0F0F0F] border  border-[#242424] text-[#666666] rounded-lg"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="relative mb-4">
              <span className="absolute inset-y-0 right-3 flex items-center text-[#666666]">
                <RiLockLine />
              </span>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full text-sm p-4 bg-[#0F0F0F] border  border-[#242424] text-[#666666] rounded-lg"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            

            <button
              type="submit"
              className="w-full bg-[#9EFF00] text-sm text-black font-semibold py-3 rounded-full"
            >
              Reset your password
            </button>
          </Form>
        )}
      </Formik>
      <p className=" w-72 mt-8  px-2 text-center text-xs text-[#CCC]">
          By submitting your information, you agree to our{" "}
          <span className="text-[#9EFF00]">Terms of Service</span> and{" "}
          <span className="text-[#9EFF00]">Privacy Policy</span>
        </p>
    </div>
    </>
  );
};

export default ChangePassword;
