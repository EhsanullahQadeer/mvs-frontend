import axiosPublic from "api/axios";
import {
  ICreateFanwallPost,
  IGetFanwallPostRepliesParams,
  IGetFanwallPostsParams,
  IToggleFanwallPostLike,
} from "./types";
import axiosInstance from "api/axios";

export async function getFanwallPosts(params: IGetFanwallPostsParams) {
  return axiosPublic.get(`/users/fanwall/posts`, {
    params,
  });
}

export async function getFanwallPostReplies(
  params: IGetFanwallPostRepliesParams
) {
  return axiosPublic.get(`/users/fanwall/replies`, {
    params,
  });
}

export async function createFanwallPost(body: ICreateFanwallPost) {
  return axiosInstance.post(`/users/fanwall/post`, body);
}

export async function toggleFanwallPostLike(body: IToggleFanwallPostLike) {
  return axiosPublic.post(`/users/fanwall/like`, body);
}
