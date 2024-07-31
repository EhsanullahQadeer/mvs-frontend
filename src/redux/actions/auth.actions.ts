/*************************************************************************
 * @file auth.actions.ts
 * @author Zohaib Ahmed
 * @desc Manages user authentication and related API interactions.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import axios from "../../api/axios";
import { Dispatch } from "redux";
import cookie from "js-cookie";

/* LOCAL IMPORTS */
import { config } from "config/ConfigManager";
import ActionType from "redux/types"

export function login(
  params: any
) {
  return async function (dispatch: Dispatch) {
    try {
      const data = {
        email: params.email,
        password: params.password,
      };
      await axios
        .post(`${config.get('API')}/auth/login`, data, {
          method: "POST",
        })
        .then((user: any) => {
          console.log("Error: ", user.data);

          if (user.data.error) {
            dispatch({
              type: ActionType.USER_LOGIN_FAIL,
              payload: {
                message: "The Email Address or Password entered is invalid",
              },
            });
          } else {

            const expires = new Date(new Date().getTime() + 60 * 60 * 1000);

            cookie.set("token", user.data.results.access_token, { expires });

            dispatch({
              type: ActionType.USER_LOGIN_SUCCESS,
              payload: user,
            });
          }
        });
    } catch (error) {
      console.log(error);

      dispatch({
        type: ActionType.USER_LOGIN_FAIL,
        payload: {
          message:
            "The Email Address or Password entered is invalid. Please try again.",
        },
      });
    }
  };
}

export function fetchCurrentUser() {
  return async function (
    dispatch: Dispatch
  ) {
    try {
      // Fetching user details from /auth/me
      const userResponse = await axios.get(`${config.get('API')}/auth/me`);
      const user = userResponse.data;
      console.log('User data from /auth/me:', user);

      // Fetching additional profile details from /profiles/details
      const profileResponse = await axios.get(`${config.get('API')}/users/get-user-profile-details`, {
        params: {
          UserId: user.UserId
        }
      });
      const profileDetails = profileResponse.data.available;
      console.log('Profile details:', profileDetails);

      // Combining both results
      const combinedUserDetails = {
        ...user,
        profile: profileDetails,
      };
      console.log( 'Combined user details:', combinedUserDetails );

      // Dispatching combined result
      dispatch({
        type: ActionType.CURRENT_USER,
        payload: combinedUserDetails,
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
      dispatch({
        type: ActionType.CURRENT_USER_FAILED,
        payload: {
          message: "Unable to get current logged in user details",
        },
      });
    }
  };
}

export function getUserPaymentInfo(params) {
  return async function (dispatch: Dispatch) {
    try {
      await axios
        .get(`${config.get('API')}/users/payment/info`, { params })
        .then((res: any) => {
          dispatch({
            type: ActionType.USER_PAYMENT_INFO,
            payload: res,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserTransactions(params) {
  return async function (dispatch: Dispatch) {
    try {
      await axios
        .get(`${config.get('API')}/users/transactions`, { params })
        .then((res: any) => {
          dispatch({
            type: ActionType.USER_TRANSACTIONS,
            payload: res,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
}
