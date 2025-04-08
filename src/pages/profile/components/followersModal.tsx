import { Dialog } from "@mui/material";
import { getUserFollowers } from "api/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CancelIcon } from "../../../assets/icons/cancelIcon.svg";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/notificationThumbnail";

interface FollowersModalProps {
  open: boolean;
  handleClose: () => void;
  followers?: any[];
  userId: number;
}

const FollowersModal = ({ open, handleClose, userId }: FollowersModalProps) => {
  const [followers, setFollowers] = useState<any[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const fetchFollowers = async (currentCursor: number | null) => {
    if (!hasMore || loading) {
      return;
    }
    
    setLoading(true);
    try {
      const res = await getUserFollowers(userId, 10, currentCursor || 0);
      const newFollowers = res.data?.results?.followers || [];
      setCursor(res.data?.results?.cursor);
      setHasMore(res.data?.results?.hasMore || false);
      setFollowers(prev => [...prev, ...newFollowers]);
    } catch (error) {
      console.error('Error fetching followers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setFollowers([]);
      setCursor(null);
      setHasMore(true);
      fetchFollowers(null);
    }
  }, [open]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const distanceFromBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
    const isNearBottom = distanceFromBottom < 50;
    if (isNearBottom && hasMore && !loading && cursor !== null) {
      console.log('Fetching more followers with cursor:', cursor);
      fetchFollowers(cursor);
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
          <h2 className="text-softGray">Followers</h2>
          <div
            onClick={handleClose}
            className="rounded-full w-6 h-6 flex justify-center items-center bg-eclipseGray cursor-pointer text-coolGray"
          >
            <CancelIcon className="w-2 h-2" />
          </div>
        </div>
        <div
          className="flex-1 overflow-y-auto custom-dropdown border border-[#3D3D3D] rounded-xl p-2"
          onScroll={handleScroll}
          style={{ minHeight: "300px" }}
        >
          {followers.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-dimGray text-base">No followers yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {followers.map((follower) => (
                <div
                  key={follower.id}
                  className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-lg cursor-pointer"
                  onClick={() => {
                    navigate(`/profile/${follower.username}`);
                    handleClose();
                  }}
                >
                  <Thumbnail professionalName={follower.professional_name} thumbnail={follower.thumbnail} size="40" userId={follower.id}/>
                  <div className="flex-1">
                    <h3 className="text-white text-sm font-medium">
                      {follower.professional_name}
                    </h3>
                    <p className="text-dimGray text-xs">
                      {follower.primary_role} / {follower.secondary_role}
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

export default FollowersModal;