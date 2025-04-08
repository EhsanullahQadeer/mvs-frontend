
import { useContentManager } from "../../context";
import { RootState } from "redux/reducers";
import { useSelector } from "react-redux";
import FileDropper from "./FileDropper";

const FileSelector = () => {
  const user = useSelector((state: RootState) => state.auth?.user);
  const {
    uploadingFile,
    setUploadingFile,
  } = useContentManager();
  
  return (
    <div>
      { user &&
        <div className="py-3 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-platinum">Audio Files</h3>
        <p className="text-sm font-normal text-dimGray">
          Drop your audio files here to start uploading to your profile.
        </p>
      </div>
      }
      <FileDropper
        {...{
          uploadingFile,
          setUploadingFile,
        }}
        isLoginProfile={user}
      />
    </div>
  );
};

export default FileSelector;
