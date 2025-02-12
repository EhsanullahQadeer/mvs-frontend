import axiosInstance from "../axios";
import {
  ICreateFanwallPost,
  IGetFanwallPostRepliesParams,
  IGetFanwallPostsParams,
  IToggleFanwallPostLike,
} from "./types";

export async function getFanwallPosts(params: IGetFanwallPostsParams) {
  return axiosInstance.get(`/users/fanwall/posts`, {
    params,
  });
}

export async function getFanwallPostReplies(
  params: IGetFanwallPostRepliesParams
) {
  return axiosInstance.get(`/users/fanwall/replies`, {
    params,
  });
}

export async function createFanwallPost(body: ICreateFanwallPost) {
  return axiosInstance.post(`/users/fanwall/post`, body);
}

export async function toggleFanwallPostLike(body: IToggleFanwallPostLike) {
  return axiosInstance.post(`/users/fanwall/like`, body);
}
