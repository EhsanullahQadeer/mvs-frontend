import  axios from 'util/axios';
import  config from "config/config"


  export async function currentUser() {
    return axios.get(`${config.defaults.api_url}/auth/me`)
  }

  export async function updateProfile(data:any) {
    return axios.put(`${config.defaults.api_url}/api/auth/profile`,data)
  }

  export async function changePassword(data:any) {
    return axios.put(`${config.defaults.api_url}/api/auth/change-password`,data)
  }

  export async function forgotPassword(data:any) {
    return axios.post(`${config.defaults.api_url}/auth/forgot/password`,data)
  }

  export async function confirmEmail(data:any) {
    return axios.post(`${config.defaults.api_url}/auth/confirm`,data)
  }

  /**
   * @description This function looks into the database and checks if 
   *              the username is available.
   * @param data 
   * @returns 
   */
  export async function requestInvitationCodeWithEmail(data:any) {
    return axios.post(`${config.defaults.api_url}/users/request/access`,data)
  }

  /**
   * @description This function looks into the database and checks if 
   *              the username is available.
   * @param data 
   * @returns 
   */
  export async function validateUsername(username?: string, email?: string) {
  
    let url = `${config.defaults.api_url}/users/validate-username?`;
    if (username) {
      url += `username=${username}`;
    }
    if (email) {
      if (username) url += '&';
      url += `email=${email}`;
    }
    return axios.post(url);
  }

  /**
   * @description This function looks into the database and checks if 
   *              the username is available.
   * @param data 
   * @returns 
   */
  export async function validateEmail( email?: string ) {
    return axios.post(`${config.defaults.api_url}/users/validate-email?email=${email}`)
  }

  export async function verifyCode(data:any) {
    return axios.post(`${config.defaults.api_url}/users/verify/code`,data)
  }

  export async function resendCode(data:any) {
    return axios.post(`${config.defaults.api_url}/auth/resend/code`,data)
  }

  export async function resetPassword(data:any) {
    return axios.post(`${config.defaults.api_url}/auth/confirm/password`,data)
  }

  export async function register(data:any) {
    return axios.post(`${config.defaults.api_url}/api/auth/sign-up`,data)
  }

  export async function sendVerificationEmail(data:any) {
    return axios.post(`${config.defaults.api_url}/api/auth/send-email-address-verification-email`,data)
  }

  export async function redirectUser(data:any) {
    return axios.post(`${config.defaults.api_url}/users/redirect`,data)
  }

  export async function verifyEmail(data:any) {
    return axios.put(`${config.defaults.api_url}/api/auth/verify-email`,data)
  }

  export function CheckImage(path:any) {
    axios
      .get(path)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
 
  export async function getAnncouncements(params) {
    return axios.get(`${config.defaults.api_url}/announcements`, { params })
  }

  export async function createNewUser(params: any) {
    return axios.post(`${config.defaults.api_url}/users/new`, params);
  }
  
  export async function updateUser(params: any, id: any) {
    return axios.post(`${config.defaults.api_url}/users/update/${id}`, params);
  }

  export async function updateUserPassword(params: any) {
    return axios.post(`${config.defaults.api_url}/users/update/password/`, params);
  }