/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { fetchCurrentUser } from "redux/actionCreators/auth";
import { RootState } from "redux/reducers/combine";
import { resetPassword, updateUser } from "services/user";
import editIcon from '../../assets/img/edit_button.png';

const UserSettingsModal = (props: any) => {
    const dispatch: any = useDispatch();
    const state = useSelector((state: RootState) => state);
    const [user, setUser]: any = useState({});
    
    const [isEditUsernameModalOpen, setIsEditUsernameModalOpen] = useState(false);
    const [isEditCityModalOpen, setIsEditCityModalOpen] = useState(false);
    const [isEditStateModalOpen, setIsEditStateModalOpen] = useState(false);
    const [isEditPhoneModalOpen, setIsEditPhoneModalOpen] = useState(false);
    const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);


    const [name, setName] = useState(user?.name || '');
    const [city, setCity] = useState(user?.city || ''); 
    const [stateLoc, setState] = useState(user?.state || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [email, setEmail] = useState(user?.email || '');
    const [isInvalid, setIsInvalid] = useState(false);


    // Set default values of user
    useEffect(() => {
        console.log('user: ', user);
        setName(  user?.name );
        setCity(  user?.city );
        setState( user?.state );
        setPhone( user?.phone );
        setEmail( user?.email );
    }, [ user ]);



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
    const [passwordError, setPasswordError] = useState('');

        // Function to handle password change submission
        const handlePasswordChangeSubmit = async (e) => {
            e.preventDefault();

            // Reset error messages
            setPasswordError('');

            // Validation: Check if new passwords match
            if (newPassword !== confirmPassword) {
                setPasswordError('New passwords do not match.');
                return;
            }

            // Call a function to verify the old password and update to new password
            // Assuming updateUserPassword is a function that updates the password
            try {
                const response = await resetPassword(oldPassword);

                if (response.data.error) {
                    // setPasswordError(response.message); // Assuming the response includes error messages
                    console.log("response: ", response.data);
                } else {
                    toast.success('Password updated successfully!');
                    closeEditPasswordModal(); // Close the modal on successful update
                }
            } catch (error) {
                setPasswordError('Failed to update password.');
                console.error('Error updating password:', error);
            }
        };

      const handlePhoneChange = (event) => {
        const value = event.target.value;
        const regex = /^[0-9]*$/;
        if (value === '' || regex.test(value)) {
            setPhone(value);
            setIsInvalid(false);  // Reset the invalid state if the input is valid
        } else {
            setIsInvalid(true);
            if (!toast.isActive('invalid-phone')) {
                toast.error("Please enter only numbers.", { toastId: 'invalid-phone' });
            }
        }
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

    console.log("dispatch", user);
    const [imageName, setImageName] = useState(null);
    const [imageType, setImageType] = useState(null);
    
    // setImageName(file.name);
    // setImageType(file.type);


    const [updating, setUpdate] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission action
        setUpdate(true);
        console.log("user: ", name);
      
        // Construct the payload with user data
        const payload = {
          name: name,
          city: city,
          state: stateLoc,
          phone: phone,
        //   thumbnail: image, // Assuming 'image' holds the base64 or FormData for the image
          // Image Data Info
        //   image_type: imageType,
        //   image_name: imageName
        };
        console.log("payload", payload);
        try {
          const update_user = await updateUser(payload, user?.id);
          console.log("updated user: ", update_user);
          if (update_user.data.error) {
            toast.error(update_user.data.message);
          } else {
            toast.success("User updated successfully!");
          }
        } catch (error) {
          toast.error("An error occurred while updating the user.");
          console.error("Error updating user:", error);
        }
      };

    return (
        <React.Fragment>
          <Modal
            isOpen={props.openModal}
            onRequestClose={() => props.setModal(false)}
            className="modal-overlay"
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
                        <img src={editIcon} alt="Edit" />
                    </button>
                </div>
                {/* Repeat the structure below for each input row */}
                <div className="account-detail-row">
                    <div className="row-content">
                        <span className="detail-title">City</span> {/* Title for the detail */}
                        <span>{user?.city}</span>
                    </div>
                    <button className="edit-button" onClick={openEditCityModal}>
                        <img src={editIcon} alt="Edit" />
                    </button>
                </div>
                {/* Repeat the structure below for each input row */}
                <div className="account-detail-row">
                    <div className="row-content">
                        <span className="detail-title">State</span> {/* Title for the detail */}
                        <span>{user?.state}</span>
                    </div>
                    <button className="edit-button" onClick={openEditStateModal}>
                        <img src={editIcon} alt="Edit" />
                    </button>
                </div>
                {/* Repeat the structure below for each input row */}
                <div className="account-detail-row">
                    <div className="row-content">
                        <span className="detail-title">Phone Number</span> {/* Title for the detail */}
                        <span>{user?.phone}</span>
                    </div>
                    <button className="edit-button" onClick={openEditPhoneModal}>
                        <img src={editIcon} alt="Edit" />
                    </button>
                </div>
                {/* Repeat the structure below for each input row */}
                {/* <div className="account-detail-row">
                    <div className="row-content">
                        <span className="detail-title">Email</span> 
                        <span>{user?.email}</span>
                    </div>
                    <button className="edit-button">
                        <img src={editIcon} alt="Edit" />
                    </button>
                </div> */}
                {/* Repeat the structure below for each input row */}
                <div className="account-detail-row">
                    <div className="row-content">
                        <span className="detail-title">Password</span> {/* Title for the detail */}
                        <span>****************</span>
                    </div>
                    <button className="edit-button" onClick={openEditPasswordModal}>
                        <img src={editIcon} alt="Edit" />
                    </button>
                </div>
                {/* Repeat the structure below for each input row */}
                <div className="account-detail-row">
                    <div className="row-content">
                        <span className="detail-title">Profile Picture</span> {/* Title for the detail */}
                        <img 
                        src={user?.thumbnail} 
                        alt="Profile" 
                        className="profile-thumbnail"
                        />
                    </div>
                    <button className="edit-button">
                        <img src={editIcon} alt="Edit" />
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
            overlayClassName="modal-overlay-background"
            >
            
            <div className="edit-username-modal">

                <div className="modal-header">
                    <h2>Change Name</h2>
                    <button className="close-button" onClick={closeEditUsernameModal}>X</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="input-row">
                        <label htmlFor="name" className="input-label">Name</label>
                        <input
                            id="name"
                            type="text"
                            className="input-field"
                            value={name} // Use the state variable here
                            onChange={handleNameChange} // Set the new value in the state when the input changes
                        />
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
                    <div className="input-row">
                        <label htmlFor="name" className="input-label">City</label>
                        <input
                            id="city"
                            type="text"
                            className="input-field"
                            value={city} // Use the state variable here
                            onChange={handleCityChange} // Set the new value in the state when the input changes
                        />
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
                    <div className="input-row">
                        <label htmlFor="name" className="input-label">State</label>
                        <input
                            id="state"
                            type="text"
                            className="input-field"
                            value={stateLoc} // Use the state variable here
                            onChange={handleStateChange} // Set the new value in the state when the input changes
                        />
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
            overlayClassName="modal-overlay-background"
            >
            
            <div className="edit-phone-modal">

                <div className="modal-header">
                    <h2>Change Phone Number</h2>
                    <button className="close-button" onClick={closeEditPhoneModal}>X</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="input-row">
                        <label htmlFor="name" className="input-label">Phone</label>
                        <input
                            id="phone"
                            type="tel"
                            className={`input-field ${isInvalid ? 'input-invalid' : ''}`}
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
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
        <div className="edit-password-modal">
            <div className="modal-header">
                <h2>Change Password</h2>
                <button className="close-button" onClick={closeEditPasswordModal}>X</button>
            </div>
            <form onSubmit={handlePasswordChangeSubmit} className="modal-form">
                <div className="input-row">
                    <label htmlFor="old-password" className="input-label">Old Password</label>
                    <input
                        id="old-password"
                        type="password"
                        className="input-field"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Enter your old password"
                    />
                </div>
                <div className="input-row">
                    <label htmlFor="new-password" className="input-label">New Password</label>
                    <input
                        id="new-password"
                        type="password"
                        className="input-field"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                    />
                </div>
                <div className="input-row">
                    <label htmlFor="confirm-password" className="input-label">Confirm New Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        className="input-field"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                    />
                </div>
                {passwordError && <div className="error-message">{passwordError}</div>}
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


