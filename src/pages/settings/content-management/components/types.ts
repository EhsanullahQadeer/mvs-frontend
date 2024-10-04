export interface IComposer {
  id: number;
  name: string;
  roles: string[];
  email: string;
  imgSrc: any;
}

export interface IUploadingFileMetaDataProps {
  privacyValue: string;
  setPrivacyValue: (value: string) => void;
  midiFile: File;
  setMidiFile: (event: any) => void;
  selectedComposer: IUserProfile[];
  setSelectedComposer: (value: any) => void;
}

export interface IEditComposerData {
  id: number;
  name: string;
  roles: string[];
  email: string;
  imgSrc: any;
  percentValue: number;
  isEditable: boolean;
}

export interface IUserProfile {
  id: number;
  first_name: string | null;
  last_name: string | null;
  artist_name: string;
  username: string;
  bio: string;
  email: string | null;
  address: string | null;
  thumbnail: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  gender: string | null;
  primary_label: string;
  sub_label: string;
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
  spotify_artist_id: string;
  is_placeholder_account: boolean;
  percentValue?: number;
  isEditable?: boolean;
  roles?: string[];
}

