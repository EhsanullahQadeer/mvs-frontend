/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Formik, Field, Form, ErrorMessage } from 'formik'
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { fetchCurrentUser } from "redux/actionCreators/auth";
import { RootState } from "redux/reducers/combine";
import { resetPassword, updateUser, updateUserPassword } from "services/user";
import * as Yup from "yup";


import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const UserSettingsModal = (props: any) => {
    const dispatch: any = useDispatch();
    const state = useSelector((state: RootState) => state);
    const [user, setUser]: any = useState({});
    
  const styles = {
    label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
    field:
      'bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
    button:
      'w-full disabled:cursor-not-allowed disabled:shadow-none disabled:text-white disabled:transform-none disabled:transition-none  cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    errorMsg: 'text-red-500 text-sm pb-2 font-bold',
  }
    
    const [isEditUsernameModalOpen, setIsEditUsernameModalOpen] = useState(false);
    const [isEditCityModalOpen, setIsEditCityModalOpen] = useState(false);
    const [isEditStateModalOpen, setIsEditStateModalOpen] = useState(false);
    const [isEditPhoneModalOpen, setIsEditPhoneModalOpen] = useState(false);
    const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [newErrorMessage, setNewErrorMessage] = useState("")

    const [name, setName] = useState(user?.name || '');
    const [city, setCity] = useState(user?.city || ''); 
    const [stateLoc, setState] = useState(user?.state || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [email, setEmail] = useState(user?.email || '');
    const [isInvalid, setIsInvalid] = useState(false);


    // When the modal opens, initialize the 'name' state with the user's current name
    useEffect(() => {
        if(user?.name && isEditUsernameModalOpen) {
        setName(user.name);
        }
    }, [user, isEditUsernameModalOpen]);


    const openEditUsernameModal = () => {
        setIsEditUsernameModalOpen(true);
    };
    
    const closeEditUsernameModal = () => {
        setIsEditUsernameModalOpen(false);
    };

    const openEditCityModal = () => {
        setIsEditCityModalOpen(true);
    };
      
    const closeEditCityModal = () => {
        setIsEditCityModalOpen(false);
    };

    const openEditStateModal = () => {
        setIsEditStateModalOpen(true);
    };
      
    const closeEditStateModal = () => {
        setIsEditStateModalOpen(false);
    };

    const openEditPhoneModal = () => {
        setIsEditPhoneModalOpen(true);
    };
      
    const closeEditPhoneModal = () => {
        setIsEditPhoneModalOpen(false);
    };

    const openEditPasswordModal = () => {
        setIsEditPasswordModalOpen(true);
    };
      
    const closeEditPasswordModal = () => {
        setIsEditPasswordModalOpen(false);
    };


      const handleNameChange = (event) => {
        setName(event.target.value);
      };

      const handleCityChange = (event) => {
        setCity(event.target.value);
      };

      const handleStateChange = (event) => {
        setState(event.target.value);
      };

    // Add new state hooks for password management
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');

    const handlePhoneChange = (value) => {
        setPhone(value);
      };



        const inputWrapperStyle = {
            display: 'flex',
            alignItems: 'center',
        };
    
        const inputFieldStyle = {
            flex: 1,
            paddingRight: '30px', // Add some right padding to make space for the button
        };
    
        const buttonStyle: React.CSSProperties = {
            position: 'absolute', // Using specific literal type
            right: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
        };

    const handleOverlayClick = () => {
        props.setModal(false); // This function should close the modal
      };

    // Function to stop the propagation for modal dialog click
    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    useEffect(() => {
        dispatch( fetchCurrentUser() );
    }, [dispatch]);

    useEffect(() => {

        console.log("=== Header State ===");
        setUser(state.auth.user);
   
     },[ state ])

    const [imageName, setImageName] = useState(null);
    const [imageType, setImageType] = useState(null);
    
    // setImageName(file.name);
    // setImageType(file.type);

    const [previewUrl, setPreviewUrl] = useState('');

    // Function to handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
    
            const fileURL = URL.createObjectURL(file);
            setPreviewUrl(fileURL);
            setImageName(file.name);
            setImageType(file.type);
    
            const reader = new FileReader();
            reader.onload = () => {
                // Assert reader.result as a string
                const result = reader.result as string;
                console.log("Reader result:", result);
                setImage(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [updating, setUpdate] = useState(false);

    // Function to handle password change submission
    const handlePasswordChangeSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            old_password: oldPassword,
            new_password: newPassword
        }
        // Reset error messages
        setOldPasswordError('');
        setErrorMessage('');
        setNewErrorMessage('');

        if (!newPassword || !confirmPassword) {
            setErrorMessage("New Password and Confirm Password cannot be empty");
            return;
          } else if (newPassword.length < 6){
            setNewErrorMessage("New Password must be over 6 characters long.");
            return;
          } else if (newPassword !== confirmPassword) {
            setErrorMessage("New Password and Confirm Password do not match");
            return;
          }
        // Call a function to verify the old password and update to new password
        // Assuming updateUserPassword is a function that updates the password
        try {
            const response = await updateUserPassword(payload);
            if (response.data.error) {
                console.log(response);
                setOldPasswordError(response?.data?.message);
            } else {
                toast.success('Password updated successfully!');
                return;
            }
        } catch (error) {
            setOldPasswordError('Failed to update password.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission action
        setUpdate(true);

        // Construct the payload with user data
        const payload = {
          name: name,
          city: city,
          state: stateLoc,
          phone: phone,
          thumbnail: image,
          image_type: imageType,
          image_name: imageName
        };

        try {
          const update_user = await updateUser(payload, user?.id);
          if (update_user.data.error) {
            toast.error(update_user.data.message);
          } else {
            await dispatch(fetchCurrentUser());
            toast.success("User updated successfully!");
          }
        } catch (error) {
          toast.error("An error occurred while updating the user.");
          console.error("Error updating user:", error);
        }
      };


    // Set default values of user
    useEffect(() => {
        console.log('user: ', user);
        setName(  user?.name );
        setCity(  user?.city );
        setState( user?.state );
        setPhone( user?.phone );
        setEmail( user?.email );
        setImagePreview( user?.thumbnail );
    }, [ user ]);

        // Additional state for image upload
        const [isEditImageModalOpen, setIsEditImageModalOpen] = useState(false);
        const [image, setImage] = useState('');
        const [imagePreview, setImagePreview] = useState(user?.thumbnail || '');

        useEffect(() => {
            dispatch(fetchCurrentUser());
        }, [dispatch]);
    
        const openEditImageModal = () => setIsEditImageModalOpen(true);
        const closeEditImageModal = () => setIsEditImageModalOpen(false);


    return (
        <React.Fragment>
          <Modal
            isOpen={props.openModal}
            onRequestClose={() => props.setModal(false)}
            className="bg-transparent"
            overlayClassName="modal-overlay-background"
          >
            <div
              className="modal-overlay-background"
              onClick={() => props.setModal(false)} // This will close the modal when you click on the overlay
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} // Prevents click inside the modal from closing it
              >
                {/* Modal Content */}
                <div className="account-details-header">
                    Account Details
                </div>
                {/* Repeat the structure below for each input row */}
                <div className="account-detail-row">
                    <div className="row-content">
                        <span className="detail-title">Name</span> {/* Title for the detail */}
                        <span>{user?.name}</span>
                    </div>
                    <button className="edit-button" onClick={openEditUsernameModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

                    </button>
                </div>
                {/* Repeat the structure below for each input row */}
                <div className="account-detail-row">
                    <div className="row-content">
                        <span className="detail-title">City</span> {/* Title for the detail */}
                        <span>{user?.city}</span>
                    </div>
                    <button className="edit-button" onClick={openEditCityModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

                    </button>
                </div>
                {/* Repeat the structure below for each input row */}
                <div className="account-detail-row">
                    <div className="row-content">
                        <span className="detail-title">State</span> {/* Title for the detail */}
                        <span>{user?.state}</span>
                    </div>
                    <button className="edit-button" onClick={openEditStateModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

                    </button>
                </div>
                {/* Repeat the structure below for each input row */}
                <div className="account-detail-row">
                    <div className="row-content">
                        <span className="detail-title">Phone Number</span> {/* Title for the detail */}
                          <PhoneInput
                            value={user?.phone}
                            disabled={true} // This will disable the PhoneInput field
                            containerStyle={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: '#101010',
                              borderRadius: '5px',
                              padding: '5px',
                            }}
                            inputStyle={{
                              width: '100%',
                              backgroundColor: '#101010',
                              color: '#d3d3d3',
                              border: 'none',
                              outline: 'none',
                              textAlign: 'left',
                              paddingLeft: '0px',
                              cursor: 'text', // Maintain the default cursor
                              boxShadow: 'none',
                            }}
                            buttonStyle={{
                              backgroundColor: '#101010',
                              border: 'none',
                              display: 'none',
                              pointerEvents: 'none', // Disable interaction with the flag button
                            }}
                          />
                      </div>
                    <button className="edit-button" onClick={openEditPhoneModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    </button>
                </div>
                {/* Repeat the structure below for each input row */}
                <div className="account-detail-row">
                    <div className="row-content">
                        <span className="detail-title">Password</span> {/* Title for the detail */}
                        <span>****************</span>
                    </div>
                    <button className="edit-button" onClick={openEditPasswordModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

                    </button>
                </div>
                {/* Repeat the structure below for each input row */}
                <div className="account-detail-row">
                    <div className="row-content">
                        <span className="detail-title">Profile Picture</span>
                        <img src={imagePreview} alt="Profile" className="profile-thumbnail" />
                    </div>
                    <button className="edit-button" onClick={openEditImageModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

                    </button>
                </div>
              </div>
            </div>
          </Modal>

        {/* EDIT NAME MODAL */}
        <Modal
            isOpen={isEditUsernameModalOpen}
            onRequestClose={closeEditUsernameModal}
            className="modal-overlay"
            overlayClassName="modal-overlay-background">
            
            <div className="edit-username-modal">

                <div className="modal-header">
                    <h2>Change Name</h2>
                    <button className="close-button" onClick={closeEditUsernameModal}>X</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className={`relative flex items-center gap-2 mb-[15px] border justify-between p-2 mt-3 text-xl font-medium text-blue-200 rounded-lg bg-[#131313] w-full`}>
                        <input
                        type="text"
                        value={name}
                        onChange={handleNameChange} // Set the new value in the state when the input changes
                        className="bg-transparent outline-none text-blue-200 border-none w-full pr-10 focus:ring-0"/>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </Modal>

        {/* EDIT CITY MODAL */}
        <Modal
            isOpen={isEditCityModalOpen}
            onRequestClose={closeEditCityModal}
            className="modal-overlay"
            overlayClassName="modal-overlay-background"
            >
            
            <div className="edit-city-modal">

                <div className="modal-header">
                    <h2>Change City</h2>
                    <button className="close-button" onClick={closeEditCityModal}>X</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className={`relative flex items-center gap-2 mb-[15px] border justify-between p-2 mt-3 text-xl font-medium text-blue-200 rounded-lg bg-[#131313] w-full`}>
                        <input
                        type="text"
                        value={city}
                        onChange={handleCityChange} // Set the new value in the state when the input changes
                        className="bg-transparent outline-none text-blue-200 border-none w-full pr-10 focus:ring-0"/>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </Modal>

        {/* EDIT STATE MODAL */}
        <Modal
            isOpen={isEditStateModalOpen}
            onRequestClose={closeEditStateModal}
            className="modal-overlay"
            overlayClassName="modal-overlay-background"
            >
            
            <div className="edit-state-modal">

                <div className="modal-header">
                    <h2>Change State</h2>
                    <button className="close-button" onClick={closeEditStateModal}>X</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                <div className={`relative flex items-center gap-2 mb-[15px] border justify-between p-2 mt-3 text-xl font-medium text-blue-200 rounded-lg bg-[#131313] w-full`}>
                        <input
                            type="text"
                            value={stateLoc} // Use the state variable here
                            onChange={handleStateChange} // Set the new value in the state when the input changes
                            className="bg-transparent outline-none text-blue-200 border-none w-full pr-10 focus:ring-0"/>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </Modal>

        {/* EDIT STATE MODAL */}
        <Modal
      isOpen={isEditPhoneModalOpen}
      onRequestClose={closeEditPhoneModal}
      className="modal-overlay"
      overlayClassName="modal-overlay-background">

      <div className="edit-phone-modal w-full max-w-sm mx-auto"> {/* Adjusted maxWidth */}
        <div className="modal-header flex justify-between items-center">
          <h2>Change Phone Number</h2>
          <button className="close-button" onClick={closeEditPhoneModal}>X</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col px-11 mt-9 w-full">
          <div className={`relative flex items-center gap-2 mb-[15px] border justify-between p-2 mt-3 text-xl font-medium  rounded-lg bg-[#131313] w-full`}>
            <PhoneInput
              country={'us'}
              value={phone}
              onChange={handlePhoneChange}
              containerStyle={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#101010',
                borderRadius: '5px',
                padding: '5px',
                outline: 'none',
                boxShadow: 'none',
                border: '1px solid transparent', // Make sure the border doesn't change
              }}
              dropdownClass="custom-dropdown"
              dropdownStyle={{
                backgroundColor: '#1e1e1e', // Custom dropdown background color
                borderRadius: '5px',
                border: '1px solid #1E34F9',
              }}
              inputStyle={{
                width: '100%',
                backgroundColor: '#101010',
                color: '#d3d3d3',
                border: 'none',
                outline: 'none',
                textAlign: 'center', // Center the text
                paddingLeft: '0px', // Adjust based on how much space you need for the flag
                boxShadow: 'none',
              }}
              buttonStyle={{
                backgroundColor: '#101010',
                border: 'none',
              }}
            />
          </div>
          <button
            type="submit"
            className="p-4 mt-3 text-sm font-medium text-black bg-lime-300 rounded-lg w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>

    {/* EDIT PASSWORD MODAL */}
    <Modal
      isOpen={isEditPasswordModalOpen}
      onRequestClose={closeEditPasswordModal}
      className="modal-overlay"
      overlayClassName="modal-overlay-background"
    >
      <div className="edit-password-modal w-full max-w-md mx-auto">
        <div className="modal-header flex justify-between items-center">
          <h2>Change Password</h2>
          <button className="close-button" onClick={closeEditPasswordModal}>X</button>
        </div>
        <form onSubmit={handlePasswordChangeSubmit} className="flex flex-col w-full">
          <label htmlFor="old-password" className="sr-only">Current Password</label>
          <div className={`relative flex items-center gap-2 mb-[15px] ${oldPasswordError ? 'border-red-600' : 'border-[#131313]'} border justify-between p-2 mt-3 text-xl font-medium text-blue-200 rounded-lg bg-[#131313] w-full`}>
            <input
              type={showOldPassword ? "text" : "password"}
              name="old-password"
              placeholder="Current Password"
              autoComplete="current-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="bg-transparent outline-none text-blue-200 border-none w-full pr-10 focus:ring-0"
            />
            <img
              loading="lazy"
              src={`https://assets.mvssive.net/${showOldPassword ? "show" : "hide"}-password.png`}
              alt=""
              className="absolute right-3 cursor-pointer w-5"
              onClick={() => setShowOldPassword(!showOldPassword)}
            />
          </div>

          <label htmlFor="new-password" className="sr-only">New Password</label>
          <div className={`relative flex items-center gap-2 mb-[15px] ${newErrorMessage || errorMessage ? 'border-red-600' : 'border-[#131313]'} border justify-between p-2 mt-3 text-xl font-medium text-blue-200 rounded-lg bg-[#131313] w-full`}>
            <input
              type={showNewPassword ? "text" : "password"}
              name="new-password"
              placeholder="New Password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-transparent outline-none text-blue-200 border-none w-full pr-10 focus:ring-0"
            />
            <img
              loading="lazy"
              src={`https://assets.mvssive.net/${showNewPassword ? "show" : "hide"}-password.png`}
              alt=""
              className="absolute right-3 cursor-pointer w-5"
              onClick={() => setShowNewPassword(!showNewPassword)}
            />
          </div>

          <label htmlFor="confirm-password" className="sr-only">Confirm New Password</label>
          <div className={`relative flex items-center gap-2 mb-[15px] ${errorMessage ? 'border-red-600' : 'border-[#131313]'} border justify-between p-2 mt-3 text-xl font-medium text-blue-200 rounded-lg bg-[#131313] w-full`}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm-password"
              placeholder="Confirm Password"
              autoComplete="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent outline-none text-blue-200 border-none w-full pr-10 focus:ring-0"
            />
            <img
              loading="lazy"
              src={`https://assets.mvssive.net/${showConfirmPassword ? "show" : "hide"}-password.png`}
              alt=""
              className="absolute right-3 cursor-pointer w-5"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          {errorMessage && <div className="text-red-600 text-center my-2">{errorMessage}</div>}
          {oldPasswordError && <div className="text-red-600 text-center my-2">{oldPasswordError}</div>}
          {newErrorMessage && <div className="text-red-600 text-center my-2">{newErrorMessage}</div>}

          <button
            type="submit"
            className="justify-center items-center p-4 mt-3 text-sm font-medium text-black bg-lime-300 rounded-lg w-full"
          >
            Change Password
          </button>
        </form>
      </div>
    </Modal>

    {/* UPLOAD PROFILE PICTURE MODAL */}
    <Modal
        isOpen={isEditImageModalOpen}
        onRequestClose={closeEditImageModal}
        className="modal-overlay"
        overlayClassName="modal-overlay-background"
    >
        <div className="edit-image-modal">
            <div className="modal-header">
                <h2>Change Profile Picture</h2>
                <button className="close-button" onClick={closeEditImageModal}>X</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
                {image && (
                    <div className="image-preview">
                        <img src={image} alt="Profile Preview" className="profile-thumbnail-preview" />
                    </div>
                )}
                <div className="input-row">
                    <label htmlFor="profile-picture" className="input-label">Profile Picture</label>
                    <input
                        id="profile-picture"
                        type="file"
                        className="input-field"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    </Modal>



        {/* Toast container to display toast messages */}
        <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={true} 
        newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover />
        </React.Fragment>
      );
    };

export default UserSettingsModal;


