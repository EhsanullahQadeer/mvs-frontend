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
  selectedComposer: ICollaborator[];
  setSelectedComposer: (value: any) => void;
  isEditSample?: boolean;
  handleClose?: () => void;
  sample?: ISample;
  sampleOwner?: IUserProfile;
  isLoginProfile?: boolean;

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
  id?: number;
  first_name?: string | null;
  last_name?: string | null;
  professional_name?: string;
  username?: string;
  bio?: string;
  email?: string | null;
  address?: string | null;
  thumbnail?: string | null;
  phone?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  gender?: string | null;
  primary_label?: string;
  sub_label?: string;
  referral_code?: string | null;
  referred_by_id?: number | null;
  referral_completed_at?: string | null;
  banner_image?: string | null;
  text_message_price?: number;
  demo_message_price?: number;
  cognito_id?: string;
  email_verified?: boolean;
  active?: boolean;
  first_visit?: boolean;
  created_at?: string;
  updated_at?: string;
  popularity_rank?: number;
  followers?: number;
  total_messages?: number;
  metrics_last_updated?: string | null;
  is_admin?: boolean;
  is_partner?: boolean;
  spotify_artist_id?: string;
  is_placeholder_account?: boolean;
  percentValue?: number;
  isEditable?: boolean;
  roles?: string[];
}

export interface ISample {
  id: number;
  name: string | null;
  s3_key: string;
  filename: string;
  thumbnail: string | null;
  mime_type: string;
  length: number;
  bpm: string;
  key: string;
  tags: string[] | null;
  type: string | null;
  owner_id: number;
  owner_roles: string[] | null;
  owner_contribution: number;
  is_private: boolean;
  created_at: string;
  collaborators: ICollaborator[];
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

export interface ISampleSearchConstraints {
  skip: number;
  take: number;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  limit: number;
} 

export interface IGetUserSamplesResponse {
  samples: ISample[];
  total: number;
  pagination: IPagination;

}

export interface ICollaborator {
  user: {
    id: number;
    professional_name: string;
    thumbnail: string;
    is_owner: boolean;
    primary_role: string;
    secondary_role: string;
  };
  contribution: number;
  id: number;
  roles: string[];
  isEditable: boolean;
}
