import { MdOutlineCheckCircle, MdOutlineCancel } from "react-icons/md";
import CollabTable from "./components/RequestCollabTable";
import AudioPlayer from "./components/AudioPlayer";
import { useEffect, useState } from "react";
import { handleCollaborationRequestData } from "api/sounds";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import Theme from "theme";
import { config } from "config/ConfigManager";
import { handleCollaborationRequest } from "api/sounds";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

interface Collaborator {
  id: number;
  contribution: number;
  roles: string[];
  is_owner: boolean;
  status: string;
  sample_id: number;
  collaborator_id: number;
  collaborator: {
    id: number;
    first_name: string;
    last_name: string;
    professional_name: string;
    primary_role: string;
    [key: string]: any;
  };
}

interface Sample {
  id: number;
  filename: string;
  collaborators: Collaborator[];
  s3_key: string;
  [key: string]: any;
}

interface CollaborationData {
  sample: Sample;
}

const CollaboratorRequest = () => {
  const { collaborationId } = useParams();
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [fileName, setFileName] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [status, setStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCollaborationData = async () => {
      try {
        setIsLoading(true);
        const response: AxiosResponse<CollaborationData> =
          await handleCollaborationRequestData({ collaborationId });
        const data = response.data;
        if (data?.sample) {
          setFileName(data.sample.filename);
          setCollaborators(data.sample.collaborators || []);
          // Set the audio URL using the S3 key
          if (data.sample.s3_key) {
            setAudioUrl(`${config.get("ASSETS")}/${data.sample.s3_key}`);
          }
        }
      } catch (error) {
        console.log("error: ", error);
        toast.error("Failed to load collaboration data");
      } finally {
        setIsLoading(false);
      }
    };

    if (collaborationId) {
      fetchCollaborationData();
    }
  }, [collaborationId]);

  // Group collaborators by primary role
  const collaboratorsByRole = collaborators.reduce(
    (acc: { [key: string]: Collaborator[] }, collab) => {
      const role = collab.collaborator.primary_role.replace(/_/g, " ");
      if (!acc[role]) {
        acc[role] = [];
      }
      acc[role].push(collab);
      return acc;
    },
    {}
  );

  const handleStatusFunc = async (status: boolean) => {
    try {
      await handleCollaborationRequest({ collaborationId, action: status });
      toast.success(
        `${status ? "Accepted" : "Denied"} collaboration request successfully!`
      );
      setStatus(true);
    } catch (error) {
      console.log("error: ", error);
      toast.error(
        `Failed to ${status ? "accept" : "deny"} collaboration request`
      );
    }
  };

  if (isLoading) {
    return (
      <Theme>
        <div className="min-h-screen flex items-center justify-center">
          <CircularProgress
            sx={{
              width: "80px !important",
              height: "80px !important",
              color: "#9EFF00",
            }}
          />
        </div>
      </Theme>
    );
  }

  return (
    <Theme>
      <div className="text-white overflow-x-hidden">
        <div className="max-md:px-4 bg-zinc-900 text-center py-6">
          <div className="md:max-w-4xl mx-auto">
            <h1 className="font-bold text-xl md:text-2xl pb-2">
              You've been invited to collaborate!
            </h1>
            <p className="text-gray-200 max-md:text-sm">
              Listen to the file{" "}
              <span className="text-white font-medium">{fileName}</span>
              and review details before accepting or denying the request. Your
              contribution will be officially credited if you choose to join.
            </p>
          </div>
        </div>

        {/* Audio Player */}
        {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

        <div className="px-4 md:px-5 py-3 max-w-[786px]">
          <h1 className="text-xl md:text-[28px] font-semibold pb-1 text-lightGray">
            File Contributors
          </h1>
          <p className="text-xs md:text-sm text-silver">
            This section displays all collaborators involved in this file or
            song, including producers, songwriters, musicians, and other key
            contributors. Each listed contributor has played a role in shaping
            the track, ensuring proper credit and transparency.
          </p>
        </div>

        <div
          className={`flex flex-wrap justify-between bg-jetBlack p-3 items-center gap-2 border-y border-eerieBlack ${
            status ? "hidden" : "flex"
          }`}
        >
          <p className="text-sm md:text-base text-platinum">
            <b>File Name:</b> {fileName}
          </p>
          <div className="flex gap-x-3">
            <button
              onClick={() => {
                handleStatusFunc(false);
              }}
              className="text-mediumGray flex items-center gap-x-2 rounded-full px-4 text-sm border border-charcoalGray py-[6px]"
            >
              <MdOutlineCancel className="text-lg" />
              Deny
            </button>
            <button
              onClick={() => {
                handleStatusFunc(true);
              }}
              className="bg-lightGreen text-black flex items-center gap-x-2 rounded-full px-4 text-sm py-[6px] font-semibold"
            >
              <MdOutlineCheckCircle className="text-lg" /> Accept
            </button>
          </div>
        </div>

        {/* Tables grouped by primary role */}
        {Object.entries(collaboratorsByRole).map(([role, collabs]) => (
          <CollabTable key={role} data={collabs} heading={role} />
        ))}
      </div>
    </Theme>
  );
};

export default CollaboratorRequest;
