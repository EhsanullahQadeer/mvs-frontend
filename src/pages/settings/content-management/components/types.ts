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
  selectedComposer: IComposer[];
  setSelectedComposer: (value: any) => void;
  composersArr: IComposer[];
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
