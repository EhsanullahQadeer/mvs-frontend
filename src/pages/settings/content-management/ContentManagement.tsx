import DropFilesSection from "./components/DropFilesSection";
import AttachedFilesSection from "./components/AttachedFilesSection";
import UploadingFilesSection from "./components/UploadingFilesSection";
import { useState } from "react";

type Props = {};

const ContentManagement = (props: Props) => {
  const [files, setFiles] = useState<File[]>([]);

  console.log("files", files);

  return (
    <div>
      <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
        Content Management
      </h2>

      <div className="px-3">
        <DropFilesSection {...{ files, setFiles }} />
        {files.length > 0 && <UploadingFilesSection {...{ files, setFiles }} />}
        <AttachedFilesSection />
      </div>
    </div>
  );
};

export default ContentManagement;
