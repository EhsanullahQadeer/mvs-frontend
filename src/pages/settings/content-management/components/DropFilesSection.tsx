/*************************************************************************
 * @file DropFilesSection.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component is wrap over custom file uploader component.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/
import CustomFileDropper from "./CustomFileDropper";

type Props = {
  files: File[];
  setFiles: (event: any) => void;
};

const DropFilesSection = (props: Props) => {
  const { files, setFiles } = props;
  return (
    <div>
      <div className="py-3 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-platinum">Audio Files</h3>
        <p className="text-sm font-normal text-dimGray">
          Drop your audio files here to start uploading to your profile.
        </p>
      </div>

      <CustomFileDropper {...{ files, setFiles }} />
    </div>
  );
};

export default DropFilesSection;
