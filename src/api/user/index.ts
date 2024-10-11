/*************************************************************************
 * @file index.ts
 * @author End Quote
 * @desc Provides API functions for user-related operations.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import axiosInstance from "../axios";
import {
  IGetArtistCreditsParams,
  IgetArtistInfoParams,
  IstoreSpotifyArtistBody,
  IUserProfessionalNameSearch,
  IUsersSearchParams,
  UserFiltersDTO,
} from "../user/types";

export async function requestInvitationCodeWithEmailAPI(data: any) {
  return axiosInstance.post("/users/request/access", data);
}

export async function checkUsernameAvailabilityAPI(username: string) {
  return axiosInstance.post(`/users/validate-username?username=${username}`);
}

export async function validateEmailAPI(email?: string) {
  return axiosInstance.post(`/users/validate-email?email=${email}`);
}

export async function verifyCodeAPI(data: any) {
  return axiosInstance.post("/users/verify/code", data);
}

export async function redirectUserAPI(data: any) {
  return axiosInstance.post("/users/redirect", data);
}

export async function createNewUserAPI(params: any) {
  return axiosInstance.post("/users/new", params);
}

export async function updateUserAPI(params: any, id: any) {
  return axiosInstance.post(`/users/update/${id}`, params);
}

export async function updateUserPasswordAPI(params: any) {
  return axiosInstance.post("/users/update/password", params);
}

export async function verifyCouponAPI(params: any) {
  return axiosInstance.post("/user/confirm/coupon", params);
}

export async function confirmSignupAPI(params: any) {
  return axiosInstance.post("/user/confirm/signup", params);
}

export async function artistProfileAPI(username: string) {
  return axiosInstance.get(`/users/username/${username}`);
}

export async function userArtistSearch(params: IUsersSearchParams) {
  return axiosInstance.get("/users/search", { params });
}


export async function userProfessionalNameSearch(
  params: IUserProfessionalNameSearch
) {
  return axiosInstance.get("/users/search/by-professional-name", { params });
}

export async function getUsersByTag(params: UserFiltersDTO, limit=20) {
  return axiosInstance.get(`/users/by-tag`, {
    params: {
      ...params,
      limit,
    },
  });
}

export async function getArtistCredits(params: IGetArtistCreditsParams) {
  return axiosInstance.get(`/users/get-artist-credits`, {
    params,
  });
}
export async function getArtistInfo(params: IgetArtistInfoParams) {
  return axiosInstance.get(`/users/get-artist-info`, {
    params,
  });
}

export async function storeSpotifyArtist(body: IstoreSpotifyArtistBody) {
  return axiosInstance.post(`/misc/store-artist-wiki`, body);
}
