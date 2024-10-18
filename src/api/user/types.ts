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

export interface IUserProfessionalNameSearch {
  skip: number;
  professionalName: string;
  take: number;
}

export interface IGetArtistCreditsParams {
  limit: number;
  skip: number;
  take: number;
  spotify_artist_id: string;
}
export interface IgetArtistInfoParams {
  spotify_artist_id: string;
}

export interface IstoreSpotifyArtistBody {
  spotify_artist_id: string;
  artist_name: string;
  popularity: number;
  thumbnail: string;
  tag: string;
  followers: number;
}

export interface IRequestInvitation {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  instagramUsername?: string;
  user_type?: string;
}

export interface IAddNewUser {
  email: "string";
  firstName: "string";
  lastName: "string";
  primary_role: "string";
  secondary_role: "string";
  username: "string";
  professional_name: "string";
  region: "string";
  country: "string";
  password: "string";
  bio: "string";
  thumbnail: "string";
  thumbnail_type: "string";
  ip_number: "string";
  collab_terms: 0;
  publisher: "string";
  main_genre: "string";
  sub_genre: "string";
  instagram_link: "string";
  x_link: "string";
  spotify_link: "string";
  soundcloud_link: "string";
  facebook_link: "string";
  inbox_fee: 0;
  demo_fee: 0;
  meeting_fee: 0;
  follow_users: ["string"];
  connect_users: ["string"];
  stripe_connect_info: "string";
}
