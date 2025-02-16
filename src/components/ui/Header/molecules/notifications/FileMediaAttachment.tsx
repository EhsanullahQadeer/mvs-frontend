import React from "react";

interface FileMediaAttachmentProps {
  icon: string;
  mediaName: string;
  mediaSize?: string;
}

const FileMediaAttachment: React.FC<FileMediaAttachmentProps> = ({
  icon,
  mediaName,
  mediaSize,
}) => {
  return (
    <div className="font-semibold flex items-center text-[10px] text-[#B2B2B2]">
      <img src={icon} alt="Audio Icon" />
      <span className="px-1 text-[12px] text-[#B2B2B2] font-[600]">{mediaName}</span>
      {mediaSize && <span className="font-normal text-[#666666]">{mediaSize}</span>}
    </div>
  );
};

export default FileMediaAttachment;
