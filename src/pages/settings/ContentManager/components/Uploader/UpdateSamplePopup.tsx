import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { ISample } from "../types";
import { getSampleCollaborators } from "api/sounds";
import UploadingSampleDetails from "./UploadingSampleDetails";

interface Props {
  open: boolean;
  handleClose: () => void;
  sampleToEdit: ISample;
  user: any;
}

interface ICollaborator {
  id: number;
  user: {
    id: number;
    professional_name: string;
    thumbnail: string;
    is_owner: boolean;
    primary_role: string;
    secondary_role: string;
  };
  roles: string[];
  contribution: number;
  isEditable: boolean;
}

export default function UpdateSamplePopup(
  props: Props
) {
  const [collaborators, setCollaborators] = useState<ICollaborator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleClose, sampleToEdit, user, open } = props;

  useEffect(() => {
    const fetchCollaborators = async () => {
      if (!sampleToEdit?.id) return;
      setIsLoading(true);
      try {
        const response = await getSampleCollaborators(sampleToEdit?.id);
        console.log("response", response.data);
        setCollaborators(response.data);

      } catch (error) {
        console.error('Error fetching collaborators:', error);
        setCollaborators([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCollaborators();
  }, [sampleToEdit?.id]);

  return (
    <React.Fragment>
      <Dialog 
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root.MuiDialog-paper": {
            backgroundColor: "#131313",
            maxWidth: "80%",
            minWidth: "65%",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-white">Loading collaborators...</div>
            </div>
          ) : (
            <UploadingSampleDetails
              {...{
                isEditSample: true,
                handleClose,
                sampleToEdit,
                user,
                collaborators,
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
