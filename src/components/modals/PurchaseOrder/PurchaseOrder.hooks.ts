
/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from "api/axios";
import { useEffect, useState } from "react";

const usePurchaseOrderModalHooks = (
  recipientId
) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/get-user-profile-details`, {
          params: {
            UserId: recipientId
          },
        });
        if (response.status !== 200) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }
        setUser( response.data.available );
      } catch (error) {
        console.error(
          'Error fetching user:', error
        );
      }
    };
  
    if (recipientId) {
      fetchUser();
    }
  }, [recipientId]);

  return({
    modalIsOpen, closeModal,
    user
  })
}

export default usePurchaseOrderModalHooks;
