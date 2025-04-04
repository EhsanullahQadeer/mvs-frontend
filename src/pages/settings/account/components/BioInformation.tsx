/*************************************************************************
 * @file Address.tsx
 * @author Ehsanullah Qadeer
 * @desc  component Bio-Information for account setting page..
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import React, { useEffect } from "react";
import sampleProfileImage from "../sampleAssets/Ellipse 730.png";
import avatarImg from "../../../../assets/img/avatar.svg";
import { FiCamera } from "react-icons/fi";
import { ReactComponent as CancelIcon } from "../../../../assets/icons/cancelIcon.svg";
import { ReactComponent as EditIcon } from "../../../../assets/icons/editPencilIcon.svg";
import ImageCrop from "components/modals/ImageCropModal";
import { updateUserProfileAPI, updateUserUsernameAPI } from "api/user";

// THIRD PARTY IMPORTS
import { useState } from "react";
import { Form, Formik } from "formik";
import FormikField from "components/util/FormikField";

interface UserProfile {
  username: string;
  bio: string;
  thumbnail: string;
  banner_image: string;
  professional_name?: string;
  address?: string;
  image_type?: string;
}

const BioInformation: React.FC<{ user: UserProfile, setUser: (user: UserProfile) => void }> = ({ user, setUser }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [thumbnailChanged, setThumbnailChanged] = useState<boolean>(false);
  const [savedThumbnail, setSavedThumbnail] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<UserProfile>({
    username: "",
    bio: "",
    thumbnail: "",
    banner_image: "",
  });
  const [thumbnail, setThumbnail] = useState(avatarImg);

  useEffect(() => {
    if (user) {
      const newValues = {
        username: user.username || "",
        bio: user.bio || "",
        thumbnail: user.thumbnail || "",
        banner_image: user.banner_image || "",
      };
      setFormValues(newValues);
      setThumbnail(user.thumbnail || avatarImg);
    }
  }, [user]);

  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropImage(reader.result as string);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    }
  };

  const handleCropComplete = (croppedImage: string, imageType: string) => {
    setThumbnail(croppedImage);
    setFormValues(prev => ({
      ...prev,
      thumbnail: croppedImage,
      image_type: imageType
    }));
    setThumbnailChanged(true);
  };

  const handleCropCancel = () => {
    setCropImage(null);
    setShowCropModal(false);
  };

  const handleCancel = () => {
    if (user) {
      setFormValues({
        username: user.username || "",
        bio: user.bio || "",
        thumbnail: user.thumbnail || "",
        banner_image: user.banner_image || "",
      });
      setThumbnail(user.thumbnail || avatarImg);
      setThumbnailChanged(false);
    }
    setIsEditable(false);
  };

  const handleSubmit = async (values: UserProfile) => {
    const changedValues: Partial<UserProfile & { image_type?: string }> = {};
    
    if (user) {
      Object.entries(values).forEach(([key, value]) => {
        const typedKey = key as keyof UserProfile;
        if (value !== user[typedKey] && key !== 'banner_image') {
          changedValues[typedKey] = value;
          if (typedKey === 'thumbnail') {
            changedValues.image_type = values.image_type;
          }
        }
      });
      
      if (Object.keys(changedValues).length > 0) {
        try {
          await updateUserProfileAPI(changedValues);
          setUser({ ...user, ...changedValues });
          setThumbnailChanged(true);
          setSavedThumbnail(true);
          if (changedValues.username) {
            const response = await updateUserUsernameAPI(changedValues.username);
            setUser({ ...user, ...changedValues });
          }
        } catch (error) {
          console.error("Failed to update profile:", error);
        }
      }
    }
  };

  return (
    <section>
      {showCropModal && cropImage && (
        <ImageCrop
          open={showCropModal}
          onClose={() => {
            setCropImage(null);
            setShowCropModal(false);
          }}
          imageUrl={cropImage}
          onSave={(img, imageType) => {
            handleCropComplete(img, imageType);
            setShowCropModal(false);
          }}
        />
      )}
      
      <Formik 
        initialValues={formValues} 
        enableReinitialize={true} 
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, errors, touched }) => (
          <Form>
            <div className="w-full">
              <div
                style={{
                  background: formValues.banner_image
                    ? `url(${formValues.banner_image})`
                    : "linear-gradient(90deg, #7329E0 0%, #050100 50.5%, #006E89 100%)",
                }}
                className="py-4 px-5 relative bg-center bg-cover"
              >
                <div className="flex gap-3 items-center">
                  <div
                    className={`relative rounded-full p-0.5 w-48 h-48`}
                  >
                    <img
                      src={thumbnailChanged || savedThumbnail ? thumbnail : `${process.env.REACT_APP_ASSETS}${thumbnail}`}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover border-4 border-gray-900"
                    />

                    {isEditable && (
                      <div
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
                      {user?.professional_name}
                    </h2>
                    <p className="text-mediumGray text-sm font-normal">
                      {user?.address}
                    </p>
                  </div>
                </div>
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

                  <div className="flex px-4 pt-8 py-2.5 justify-start gap-3">
                    <button
                      type={isEditable ? "submit" : "button"}
                      onClick={() => {
                        if (isEditable) {
                          handleSubmit();
                          setIsEditable(false);
                        } else {
                          setIsEditable(true);
                        }
                      }}
                      className="flex justify-between items-center gap-1 whitespace-nowrap text-sm px-2 py-1 border-[1.5px] rounded-lg text-charcoalGray border-darkCharcoal bg-blackMarbel hover:bg-opacity-80 cursor-pointer"
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
                    
                    {isEditable && (
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex justify-between items-center gap-1 whitespace-nowrap text-sm px-2 py-1 border-[1.5px] rounded-lg text-charcoalGray border-darkCharcoal bg-blackMarbel"
                      >
                        <span className="text-sm">Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default BioInformation;
