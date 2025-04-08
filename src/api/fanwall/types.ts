export interface IGetFanwallPostsParams {
  fanwall_owner: number;
  skip: number;
  take: number;
}

export interface IGetFanwallPostRepliesParams {
  post_id: number;
  skip: number;
  take: number;
}

export interface ICreateFanwallPost {
  post: string;
  main_post_id?: number;
  reply_to_id?: number;
  fanwall_owner_id: number;
}

export interface IToggleFanwallPostLike {
  postId: number;
}
