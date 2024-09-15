export type ISender = {
  id: number;
  first_name: string;
  last_name: string;
  artist_name: string;
  username: string;
  bio: string | null;
  email: string;
  address: string | null;
  thumbnail: string;
  phone: string | null;
  city: string;
  country: string;
  gender: string;
  primary_label: string;
  sub_label: string;
  referral_code: string | null;
  referred_by_id: string | null;
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
  spotify_artist_id: string;
  is_placeholder_account: boolean | null;
};

export type IMessage = {
  id: number;
  conversation_id: string;
  is_read: boolean;
  created_at: string;
  demo_url: string | null;
  audio_recording_url: string | null;
  payment_intent_id: string | null;
  payment_claimed: boolean;
  sender: ISender;
  message_content: string;
  thumbnail: string;
  displayName: string;
  date: string;
  message?: string;
  recipient?: string;
};

type IMessageDateGroup = {
  date: string;
  messages: IMessage[];
};

export type IMessagesData = IMessageDateGroup[];
