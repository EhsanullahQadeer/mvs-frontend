type IMessageDateGroup = {
  date: string;
  messages: IMessage[];
};

export type IMessagesData = IMessageDateGroup[];

export type INotes = {
  id: number;
  owner_id: number;
  conversation_id: string;
  note: string;
  created_at: string;
  updated_at: string;
};

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
}

type MessageSender = {
  id: number;
  first_name: string;
  last_name: string;
  professional_name: string;
  username: string;
  bio: string | null;
  short_bio: string | null;
  email: string;
  address: string | null;
  thumbnail: string;
  phone: string | null;
  region: string | null;
  country: string | null;
  gender: string | null;
  primary_role: string | null;
  secondary_role: string | null;
  referral_code: string | null;
  referred_by_id: number | null;
  referral_completed_at: string | null;
  stripe_customer_id: string | null;
  banner_image: string | null;
  inbox_fee: number;
  demo_fee: number;
  meeting_fee: number;
  ip_number: string | null;
  collab_terms: string | null;
  publisher: string | null;
  main_genre: string;
  sub_genre: string;
  instagram_link: string | null;
  x_link: string | null;
  spotify_link: string | null;
  soundcloud_link: string | null;
  facebook_link: string | null;
  cognito_id: string;
  active: boolean;
  first_visit: boolean;
  created_at: string;
  updated_at: string;
  credits: number;
  icebreakers: number;
  popularity_rank: number;
  total_messages: number;
  metrics_last_updated: string | null;
  is_admin: boolean;
  is_partner: boolean;
  is_claimed: boolean;
  spotify_id: string;
  completed_onboarding: string | null;
};

export type IAudioMedia = {
  id: number;
  url: string;
  duration: number | null;
  file_size_bytes: number;
  mime_type: string;
  file_name: string;
  format: string;
  is_demo: boolean;
  created_at: string;
  updated_at: string;
} | null;

export type IMessageReply = {
  id: number;
  message_content: string;
  is_read: boolean;
  created_at: string;
  credit_payment: string | null;
  claimed: boolean;
  sender: MessageSender;
} | null;

export interface IMsgReaction {
  emoji: string;
  count: number;
  users: { id: number; name: string }[];
}

export type IMessage = {
  id: number;
  message_content: string;
  is_read: boolean;
  created_at: string;
  credit_payment: string | null;
  claimed: boolean;
  audio_media: IAudioMedia;
  message_reply: IMessageReply;
  thumbnail: string;
  displayName: string;
  date: string;
  sender: MessageSender;
  total_payments: string;
  reactions?: IMsgReaction[];

  conversation_id?: any;
  recipient_id?: number;
  UnreadCount?: number;
  last_message_summary?: string;
  last_updated_timestamp?: string;
  audio_recording_url?: string;
};

interface IReaction {
  userId: number;
  count: number;
}

export interface IMessageReactions {
  [messageId: string]: {
    reactionCounts: {
      [emoji: string]: IReaction;
    };
  };
}

type User = {
  id: number;
  first_name: string;
  last_name: string;
  professional_name: string;
  username: string;
  bio: string | null;
  short_bio: string | null;
  email: string;
  address: string | null;
  thumbnail: string;
  phone: string | null;
  region: string;
  country: string;
  gender: string | null;
  primary_role: string | null;
  secondary_role: string | null;
  referral_code: string | null;
  referred_by_id: number | null;
  referral_completed_at: string | null;
  stripe_customer_id: string | null;
  banner_image: string | null;
  inbox_fee: number;
  demo_fee: number;
  meeting_fee: number;
  ip_number: string | null;
  collab_terms: string | null;
  publisher: string | null;
  main_genre: string;
  sub_genre: string;
  instagram_link: string | null;
  x_link: string | null;
  spotify_link: string | null;
  soundcloud_link: string | null;
  facebook_link: string | null;
  cognito_id: string;
  active: boolean;
  first_visit: boolean;
  created_at: string;
  updated_at: string;
  credits: number;
  icebreakers: number;
  popularity_rank: number;
  total_messages: number;
  is_admin: boolean;
  is_partner: boolean;
  is_claimed: boolean;
  spotify_id: string | null;
  completed_onboarding: string | null;
};

export type IConversation = {
  id: number;
  last_message_summary: string;
  last_updated_timestamp: string;
  unread_count_a: number;
  unread_count_b: number;
  has_deleted_a: boolean | null;
  has_deleted_b: boolean | null;
  favorite_a: boolean;
  favorite_b: boolean;
  active_icebreaker: boolean;
  is_open: boolean;
  is_archived: boolean;
  is_spam: boolean;
  is_priority: boolean;
  created_at: string;
  updated_at: string;
  total_payments_a: string;
  total_payments_b: string;
  user_a: User;
  user_b: User;
  displayName: string;
  recipient_id: number;
  thumbnail: string;

  UnreadCount?: number;
};
