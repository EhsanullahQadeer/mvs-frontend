export class UserFiltersDTO {
  tag?: string;
  primaryUserLabel?: string;
  gender?: string;
  topPopular?: boolean;
  recentlyAdded?: boolean;
  limit?: number;
}

export interface IUsersSearchParams {
  limit: number;
  query: string;
}

export interface IGetArtistCreditsParams {
  limit: number;
  skip: number;
  take: number;
  spotify_artist_id: string;
}
