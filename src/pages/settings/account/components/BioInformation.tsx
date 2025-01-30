/*************************************************************************
 * @file Address.tsx
 * @author Ehsanullah Qadeer
 * @desc  component Bio-Information for account setting page..
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import React from "react";
import sampleProfileImage from "../sampleAssets/Ellipse 730.png";
import { FiCamera } from "react-icons/fi";
import { ReactComponent as CancelIcon } from "../../../../assets/icons/cancelIcon.svg";
import { ReactComponent as EditIcon } from "../../../../assets/icons/editPencilIcon.svg";

// THIRD PARTY IMPORTS
import { useState } from "react";
import { Form, Formik } from "formik";
import FormikField from "components/util/FormikField";

const BioInformation: React.FC = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState(sampleProfileImage);
  const [bgImage, setBgImage] = useState(null);

  const initialValues = {
    username: "Serena",
    bio: "This is a sample bio of the user Serena.",
    profileImage,
    bgImage,
  };

  const handleProfileImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      e.target.value = null; // Reset the input
    }
  };

  const handleBgImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBgImage(imageUrl);
      e.target.value = null; // Reset the input
    }
  };

  const handleCancel = () => {
    setBgImage(null);
  };

  const handleFormSubmit = (values: any) => {
    console.log("values ", values);
  };

  return (
    <section>
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        <Form>
          <div className="w-full">
            <div
              style={{
                background: bgImage
                  ? `url(${bgImage})`
                  : "linear-gradient(90deg, #7329E0 0%, #050100 50.5%, #006E89 100%)",
              }}
              className="py-4 px-5 relative bg-center bg-cover"
            >
              <div className="flex gap-3 items-center">
                <div
                  className={`relative rounded-full p-0.5  w-48 h-48`}
                >
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full rounded-full object-cover border-4 border-gray-900"
                  />

                  {isEditable && (
                    <div
                      onClick={handleProfileImg}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-[#414040B2] rounded-full text-white flex items-center justify-center cursor-pointer"
                    >
                      <input
                        accept="image/*"
                        type="file"
                        className="absolute w-full h-full opacity-0 cursor-pointer"
                        onChange={handleProfileImg}
                      />
                      <FiCamera className="w-5 h-4" />
                    </div>
                  )}
                </div>

                <div className="">
                  <h2 className="text-xl font-semibold text-white">
                    Serena Figueiro
                  </h2>
                  <p className="text-mediumGray text-sm font-normal">
                    Buenos Aires, Argentina
                  </p>
                </div>
              </div>

              {isEditable && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 items-center">
                  <div
                    className="relative w-[52px] h-[52px] bg-[#41404066] rounded-full text-white flex items-center justify-center cursor-pointer"
                  >
                    <input
                      accept="image/*"
                      type="file"
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                      onChange={handleBgImg}
                    />
                    <FiCamera className="w-5 h-4" />
                  </div>
                  <div
                    onClick={handleCancel}
                    className="w-[52px] h-[52px] bg-[#41404066] rounded-full text-white flex items-center justify-center cursor-pointer"
                  >
                    <CancelIcon className="w-3 h-3" />
                  </div>
                </div>
              )}
            </div>
            <div className="pt-8 py-2.5 border-b border-[#242424]">
              <div className="w-2/5 text-sm">
                <div className="flex flex-col items-start px-4 py-2.5 gap-2 text-white rounded-lg">
                  <FormikField
                    {...{ name: "username", label: "User Name", isEditable }}
                  />
                </div>

                <div className="flex flex-col items-start px-4 py-2.5 gap-2 text-white rounded-lg">
                  <FormikField
                    {...{
                      name: "bio",
                      label: "Bio",
                      isEditable,
                      as: "textarea",
                    }}
                  />
                </div>

                {/* Edit / Save Changes Button */}
                <div className="flex px-4 pt-8 py-2.5 justify-start">
                  <button
                    type={isEditable ? "button" : "submit"}
                    onClick={() => setIsEditable(!isEditable)}
                    className="flex justify-between items-center gap-1 whitespace-nowrap text-sm px-2 py-1 border-[1.5px] rounded-lg text-charcoalGray border-darkCharcoal bg-blackMarbel"
                  >
                    {isEditable ? (
                      "Save Changes"
                    ) : (
                      <>
                        <span className="text-sm">Edit</span>
                        <div className="text-dimGray">
                          <EditIcon />
                        </div>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default BioInformation;
