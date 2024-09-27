import DropFilesSection from "./components/DropFilesSection";
import AttachedFilesSection from "./components/AttachedFilesSection";
import UploadingFilesSection from "./components/UploadingFilesSection";

type Props = {};

const ContentManagement = (props: Props) => {
  return (
    <div>
      <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
        Content Management
      </h2>

      <div className="px-3">
        <DropFilesSection />
        <UploadingFilesSection />
        <AttachedFilesSection />
      </div>
    </div>
  );
};

export default ContentManagement;
