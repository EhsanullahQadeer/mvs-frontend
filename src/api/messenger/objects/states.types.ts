type IMessageDateGroup = {
  date: string;
  messages: IMessage[];
};

export type IMessagesData = IMessageDateGroup[];

export type INotes = {
  id: number;
  owner_id: number;
  conversation_id: string;
  content: string;
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

export enum MESSAGE_TYPES {
  MESSAGE = 'message',
  TIP = 'tip',
  DEMO = 'demo',
  SAMPLE = 'sample',
}

export type IMedia = {
  id: number;
  url: string;
  file_name: string;
  duration: number | null;
  file_size_bytes: number;
  mime_type: string;
  format: string;
  type: MEDIA_TYPE;
  created_at: string;
  updated_at: string;
} | null;

export enum MEDIA_TYPE {
  RECORDING = 'audio',
  DEMO = 'demo',
}

interface ThreadStats {
  replyCount: number;
  lastReplierThumbnail: string;
  hasUnreadMessage: boolean;
  professionalName: string;
  id: number;
}

export interface IMessage {
  id: number;
  sender: TUser;
  message_type: MESSAGE_TYPES;
  content: string;
  is_deleted: boolean;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  media: IMedia | null;
  thread: IThread | null;
  conversation: IConversation;
  transaction: ITransaction | null;
  reactions: IMsgReaction[];
  threadStats?: ThreadStats | null;
  parentMessageId?: number | null;
}

export enum TRANSACTION_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export enum TRANSACTION_TYPE {
  DEMO = 'demo',
  TIP = 'tip',
  CONTENT_UNLOCK = 'content_unlock',
  TRANSFER = 'transfer',
  REFUND = 'refund',
}

export interface ITransaction {
  id: number;
  sender: TUser;
  receiver: TUser;
  amount: number;
  platform_fee: number;
  stripe_payment_intent_id: string | null;
  created_at: string;
  updated_at: string;
  type: TRANSACTION_TYPE;
  status: TRANSACTION_STATUS;
}

export interface IReaction {
  count: number;
  users: Array<{ id: number }>;
}

export interface IMessageReactions {
  [messageId: string]: {
    reactionCounts: {
      [emoji: string]: IReaction;
    };
  };
}

export type TUser = {
  id: number;
  name: string;
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

  primaryRole?: string;
  secondaryRole?: string;
};

export type IConversation = {
  id: number;
  conversation_id: string;
  is_read: boolean;
  is_favorite: boolean;
  active_icebreaker: boolean;
  is_open: boolean;
  is_archived: boolean;
  is_spam: boolean;
  is_priority: boolean;
  is_deleted: boolean;
  deleted_at: string | null;
  unread_count: number;
  available_funds: number;
  total_paid: number;
  created_at: string;
  updated_at: string;
  user: TUser;
  messages: any[];

  recipient?: TUser;
  lastMessageSummary?: string;
  lastMessageTimestamp?: string;
};

export type IThread = {
  id: number;
  parent_message: IMessage;
  last_replier: TUser | null;
  reply_count: number;
  created_at: string;
  updated_at: string;
};
