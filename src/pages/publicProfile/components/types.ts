export interface IArtistProfileData {
  active: boolean;
  address: string | null;
  professional_name: string;
  banner_image: string | null;
  region: string;
  cognito_id: string;
  country: string;
  created_at: string; // ISO date string
  demo_fee: number;
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
  primary_role: string;
  publisher: string | null;
  referral_code: string | null;
  referral_completed_at: string | null; // ISO date string or null
  referred_by_id: number | null;
  spotify_artist_id: string;
  secondary_role: string;
  text_message_price: number;
  thumbnail: string;
  total_messages: number;
  updated_at: string; // ISO date string
  username: string;
  bio: string;
}

export interface ICurrentUser {
  id: number;
  first_name: string | null;
  last_name: string | null;
  professional_name: string | null;
  username: string | null;
  bio: string | null;
  email: string;
  address: string | null;
  thumbnail: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  gender: string | null;
  primary_label: string | null;
  sub_label: string | null;
  referral_code: string | null;
  referred_by_id: number | null;
  referral_completed_at: string | null;
  banner_image: string | null;
  text_message_price: number;
  demo_message_price: number;
  cognito_id: string;
  email_verified: boolean;
  active: boolean;
  first_visit: boolean;
  created_at: string;
  updated_at: string;
  popularity_rank: number;
  followers: number;
  total_messages: number;
  metrics_last_updated: string | null;
  is_admin: boolean;
  is_partner: boolean;
  spotify_artist_id: string | null;
  is_placeholder_account: boolean | null;
  percentValue?: number;
  isEditable?: boolean;
  roles?: string[];
}
