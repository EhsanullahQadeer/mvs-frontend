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
  IAddNewUser,
  IcreateWikiProfileBody,
  IGetArtistCreditsParams,
  IgetArtistInfoParams,
  IRequestInvitation,
  IUserProfessionalNameSearch,
  IUsersSearchParams,
  UserFiltersDTO,
} from "../user/types";

export async function getUserNotifications(types?: string[]) {
  return axiosInstance.get("/users/notifications", {
    params: {
      skip: 0,
      take: 25,
      type: types,
    },
  });
}

export async function toggleNotificationAsRead(id?: number) {
  return axiosInstance.post(`/notifier/toggle-read/${id}`);
}

export async function requestInvitationCodeWithEmailAPI(body: IRequestInvitation) {
  return axiosInstance.post("/users/request/access", body);
}

export async function addNewUser(body: any) {
  return axiosInstance.post("/users/user", body);
}

export async function checkUsernameAvailabilityAPI(username: string) {
  return axiosInstance.post(`/users/validate-username?username=${username}`);
}

export async function validateEmailAPI(email?: string) {
  return axiosInstance.post(`/users/validate-email?email=${email}`);
}

export async function requestEmailChange(newEmail: string) {
  return axiosInstance.post("/users/request-email-change", { newEmail });
}

export async function updateEmail(newEmail: string, code: number) {
  return axiosInstance.put("/users/email", { newEmail, code });
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
  return axiosInstance.get("/users/search-users", { params });
}

export async function searchAllUsers(
  query: string, 
  limit: number,
  searchSpotify: boolean,
  getTopPopular: boolean
) {
  const params = { 
    query,
    limit,
    searchSpotify,
    getTopPopular
  }; 
  return axiosInstance.get("/users/search", { params });
}

export async function getUserBySpotifyId(spotifyId: string) {
  return axiosInstance.get(`/users/by-spotify-id/${spotifyId}`);
}

export async function getUserByIdAPI(id: string) {
  return axiosInstance.get(`/users/search/${id}`);
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

export async function getSpotifyArtistTopTracks(params: IGetArtistCreditsParams) {
  return axiosInstance.get(`/spotify/artist-top-tracks`, {
    params,
  });
}
export async function getArtistInfo(params: IgetArtistInfoParams) {
  return axiosInstance.get(`/users/get-artist-info`, {
    params,
  });
}
export async function createWikiProfile(body: IcreateWikiProfileBody) {
  return axiosInstance.post(`/users/wiki-profile`, body);
}

export async function requestConncetAPI(params: any) {
  return axiosInstance.post("/users/request-connections", params);
}

export async function checkPendingConnectAPI(recipientId: number) {
  return axiosInstance.get(`/users/check-pending-connection/${recipientId}`);
}

// =======================================================================================
export async function verifyAndRetrieveInviteCodeDetails(inviteCode: string) {
  return axiosInstance.post('/users/verify/invite-code', {
    invite_code: inviteCode,
  });
}
// =======================================================================================
export async function verifyChangePasswordCode(code: string) {
  return axiosInstance.post('/auth/verify/change-password-code', {
    invite_code: code,
  });
}
export async function validatePasswordAPI(password?: string) {
  return axiosInstance.post(`/users/validate-password`, { password });
}
// =======================================================================================
export async function checkUsernameIsAvailable(username: string) {
  return axiosInstance.get(`/users/check-username-is-available?username=${username}`);
}
// =======================================================================================
export async function getTopPopularUsers(paginationDto: {skip, take}) {
  return axiosInstance.get(`/users/get-top-popular`, {
    params: {
      skip: paginationDto.skip,
      take: paginationDto.take,
    },
  });
}
// =======================================================================================
export const resendInvitationCodeAPI = async (email: string) => {
  try {
    const response = await axiosInstance.post('/users/request/resend-invitation-code', { email });
    return response.data;
  } catch (error) {
    console.error('Error resending invitation code:', error);
    throw error;
  }
};

export const handleConnectionRequest = async (requestId: number, acceptRequest: boolean) => {
  try {
    const response = await axiosInstance.post('/users/handle-connection-request', { 
      requestId,
      acceptRequest,
     });
    return response.data;
  } catch (error) {
    console.error('Error resending invitation code:', error);
    throw error;
  }
};

export const handleFollowUsers = async (followUserIds: number[]) => {
  try {
    const response = await axiosInstance.post('/users/follow-users', { 
      followUserIds,
     });
    return response.data;
  } catch (error) {
    console.error('Error resending invitation code:', error);
    throw error;
  }
};

export async function checkIfFollowing( id: number ) {
  const respose = axiosInstance.get(`/users/is-following/${id}`);
  return (await respose).data;
};