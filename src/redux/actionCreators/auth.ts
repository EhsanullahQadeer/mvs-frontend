import axios from "util/axios";
import { ActionType } from "redux/actionTypes/index";
import { Dispatch } from "redux";
import cookie from "js-cookie";
import config from "config/config";

export function login(params: any) {
  return async function (dispatch: Dispatch) {
    try {
      const data = {
        email: params.email,
        password: params.password,
      };

      await axios
        .post(`${config.defaults.api_url}/auth/login`, data, {
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
            cookie.set("token", user.data?.results.accessToken);

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
  return async function (dispatch: Dispatch) {
    try {
      await axios
        .get(`${config.defaults.api_url}/users/me`)
        .then((user: any) => {
          dispatch({
            type: ActionType.CURRENT_USER,
            payload: user,
          });
        });
    } catch (error) {
      console.log(error);

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
        .get(`${config.defaults.api_url}/users/payment/info`, { params })
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
        .get(`${config.defaults.api_url}/users/transactions`, { params })
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

export async function register(params) {
  return await axios.post(`${config.defaults.api_url}/auth/register`, params);
}

export async function confirmCode(params) {
  return await axios.post(`${config.defaults.api_url}/auth/confirm`, params);
}

export async function resendCode(params) {
  return await axios.post(
    `${config.defaults.api_url}/auth/resend/code`,
    params
  );
}


export async function verifyCoupon(params) {
  return await axios.post(
    `${config.defaults.api_url}/user/confirm/coupon`,
    params
  );
}

export async function confirmSignup(params) {
  return await axios.post(
    `${config.defaults.api_url}/user/confirm/signup`,
    params
  );
}

