export interface IUserData {
  active: boolean;
  address: string | null;
  artist_name: string;
  banner_image: string | null;
  city: string;
  cognito_id: string;
  country: string;
  created_at: string; // ISO date string
  demo_message_price: number;
  email: string;
  email_verified: boolean;
  first_name: string;
  first_visit: boolean;
  followers: number;
  gender: "male" | "female" | "other";
  id: number;
  is_admin: boolean;
  is_partner: boolean;
  is_placeholder_account: boolean | null;
  last_name: string;
  metrics_last_updated: string | null; // ISO date string or null
  phone: string | null;
  popularity_rank: number;
  primary_label: string;
  referral_code: string | null;
  referral_completed_at: string | null; // ISO date string or null
  referred_by_id: number | null;
  spotify_artist_id: string;
  sub_label: string;
  text_message_price: number;
  thumbnail: string;
  total_messages: number;
  updated_at: string; // ISO date string
  username: string;
  bio: string;
}
export interface IArtistProfileData extends IUserData {
  available: IUserData
};

type IAudioFile = {
  id: number;
  s3_key: string;
  filename: string;
  mime_type: string;
  length: string;
  bpm: string;
  key: string;
  tags: string | null;
  owner_id: string;
  is_public: boolean;
  created_at: string; // ISO date string
  collaborators: string[]; // assuming collaborators is an array of strings
};

export type MusicTableArr = IAudioFile[];
