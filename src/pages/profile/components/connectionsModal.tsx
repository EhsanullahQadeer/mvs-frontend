import { Dialog } from "@mui/material";
import { ReactComponent as CancelIcon } from "../../../assets/icons/cancelIcon.svg";
import { getMutualConnections } from "api/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ConnectionsModalProps {
  open: boolean;
  handleClose: () => void;
  fetchConnections: (cursor: number | null) => void;
  userId: number;
  mutualConnections: any;
}

const ConnectionsModal = ({ open, handleClose, userId, mutualConnections, fetchConnections }: ConnectionsModalProps) => {
  const navigate = useNavigate();

  // Use the mutualConnections data directly instead of maintaining separate state
  const connections = mutualConnections?.connections || [];
  const hasMore = mutualConnections?.hasMore || false;
  const cursor = mutualConnections?.cursor;
  const [loading, setLoading] = useState<boolean>(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const distanceFromBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
    const isNearBottom = distanceFromBottom < 50;
    
    if (isNearBottom && hasMore && !loading && cursor !== null) {
      setLoading(true);
      fetchConnections(cursor)
      setLoading(false);
    }
  };

  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#08090A",
          padding: "16px 20px",
          maxWidth: "100%",
          border: "1px solid #3D3D3D",
          borderRadius: "12px",
          width: "480px",
          height: "480px",
        },
      }}
      open={open}
      onClose={handleClose}
      className="fixed scrollbar-custom inset-0 flex items-center justify-center z-50 rounded-xl"
    >
      <div className="relative flex flex-col h-full">
        <div className="flex justify-between text-lg text-gray-300 items-center font-semibold mb-4">
          <h2 className="text-softGray">Connections</h2>
          <div
            onClick={handleClose}
            className="rounded-full w-6 h-6 flex justify-center items-center bg-eclipseGray cursor-pointer text-coolGray"
          >
            <CancelIcon className="w-2 h-2" />
          </div>
        </div>
        <div
          className="flex-1 overflow-y-auto scrollbar-custom border border-[#3D3D3D] rounded-xl p-2"
          onScroll={handleScroll}
          style={{ minHeight: "300px" }}
        >
          {connections.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-dimGray text-base">No connections yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {connections.map((connection) => (
                <div
                  key={connection.id}
                  className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-lg cursor-pointer"
                  onClick={() => {
                    navigate(`/profile/${connection.username}`);
                    handleClose();
                  }}
                >
                  <img
                    src={connection.thumbnail || "/avatar.png"}
                    alt={connection.professional_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-white text-sm font-medium">
                      {connection.professional_name}
                    </h3>
                    <p className="text-dimGray text-xs">
                      {connection.primaryRole} / {connection.secondaryRole}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-center py-4">
                  <div className="text-dimGray">Loading...</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ConnectionsModal;