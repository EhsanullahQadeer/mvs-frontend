import { useEffect, useState, useCallback } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RxPerson } from "react-icons/rx";
import cover from "../../assets/img/artistImg.png";
import {
  Box,
  Tab,
  Tabs,
  Switch,
  Dialog,
  IconButton,
  InputAdornment,
  Input,
  CircularProgress,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FaLink } from "react-icons/fa6";
import { FiDownload, FiLock } from "react-icons/fi";
import { getSamplePublicUrl, soundPublicUrl, updateSampleSettings, setSamplePassword, getSamplePassword, getSampleCollaborators } from "api/sounds";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

interface Collaborator {
  id: number;
  role?: string;
  user: {
    professional_name: string;
    thumbnail: string;
    id: number;
    is_owner: boolean;
  }
}
const ShareSetting = ({ isOpen, onClose, sample }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"link" | "members">("link");
  const [linkEnabled, setLinkEnabled] = useState(sample.enable_public_access);
  const [allowDownloads, setAllowDownloads] = useState(sample.is_downloadable);
  const [requirePassword, setRequirePassword] = useState(sample.require_logged_in);
  const [requireAccount, setRequireAccount] = useState(false);
  const [password, setPassword] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [code, setCode] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      await setSamplePassword(sample.id, tempPassword);
      setPassword(tempPassword);
      toast.success('Password updated successfully');
    } catch (error) {
      console.error('Error setting password:', error);
      toast.error('Failed to update password');
      setRequirePassword(false);
    }
  };

  const handleCancel = () => {
    setTempPassword(password);
    setRequirePassword(false);
  };

  const handleGenerateNewUrl = async () => {
    try {
      setLoader(true);
      const uniqueId = uuidv4().replace(/-/g, '');
      const bodySoundPublic = {
        samplePublicId: uniqueId,
      };

      await soundPublicUrl(sample.id, bodySoundPublic);
      const newUrl = `${window.location.origin}/sample/${uniqueId}`;
      setGeneratedUrl(newUrl);
      // navigate(`/sample/${uniqueId}`);
    } catch (error) {
      console.log("error ", error);
    } finally {
      setLoader(false);
    }
  };

  const getUrl = async () => {
    try {
      const response = await getSamplePublicUrl(sample.id);
      if (response.data) {
        const fullUrl = `${window.location.origin}/sample/${response.data}`;
        setGeneratedUrl(fullUrl);
      }
    } catch (error) {
      console.error("Error getting public URL:", error);
    }
  }

  useEffect(() => {
    getUrl();
  }, [code]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      if (!sample.id) return;
      
      setLoading(true);
      try {
        const response = await getSampleCollaborators(sample.id);
        console.log('Raw collaborators response:', response);
        console.log('Collaborators data:', response.data);
        setCollaborators(response.data);
      } catch (error) {
        console.error('Error fetching collaborators:', error);
        setCollaborators([]);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "members") {
      fetchCollaborators();
    }
  }, [sample.id, activeTab]);

  const debouncedUpdate = useCallback(
    debounce(async (id, settings) => {
      try {
        await updateSampleSettings(id, settings);
      } catch (error) {
        console.error('Error updating settings:', error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedUpdate(sample.id, {
      enable_public_access: linkEnabled,
      require_logged_in: requirePassword,
      is_downloadable: allowDownloads
    });
  }, [linkEnabled, requirePassword, allowDownloads]);

  useEffect(() => {
    const getExistingPassword = async () => {
      try {
        const response = await getSamplePassword(sample.id);
        setPassword(response.data);
        setTempPassword(response.data);
      } catch (error) {
        console.error('Error getting password:', error);
      }
    };

    if (requirePassword) {
      getExistingPassword();
    }
  }, [sample.id]);

  const handlePasswordToggle = () => {
    if (requirePassword) {
      // If turning off password protection, show confirmation
      setShowConfirmDialog(true);
    } else {
      // If turning on password protection, just enable it
      setRequirePassword(true);
    }
  };

  const handleRemovePassword = async () => {
    try {
      await setSamplePassword(sample.id, ''); // Clear password
      setPassword('');
      setTempPassword('');
      setRequirePassword(false);
      setShowConfirmDialog(false);
      toast.success('Password protection removed');
    } catch (error) {
      console.error('Error removing password:', error);
      toast.error('Failed to remove password protection');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            border: "none",
            boxShadow: "none",
            background: "#131313",
            outline: "none"
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.8)"
          },
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              outline: "none",
              border: "none"
            }
          }
        }}
        open={isOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.8)" }
        }}
      >
        {loader && (
          <>
            <div className="absolute top-0 left-0 z-[9999] bg-black opacity-40 w-full h-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]">
              <CircularProgress
                sx={{
                  width: "80px !important",
                  height: "80px !important",
                  color: "#9EFF00",
                }}
              />
            </div>
          </>
        )}

        <div className="flex justify-between items-center text-white px-4 py-2 pb-3 bg-black">
          <h2 className=" font-semibold">Share Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray transition"
          >
            ✕
          </button>
        </div>

        <div>
          <Tabs
            value={activeTab}
            onChange={(_, newValue: "link" | "members") =>
              setActiveTab(newValue)
            }
            textColor="inherit"
            indicatorColor="primary"
            sx={{
              backgroundColor: "black",
              color: "white",
              "& .MuiTabs-flexContainer": {
                justifyContent: "flex-start",
                paddingX: "8px",
              },
              "& .MuiTab-root": {
                fontSize: "14px",
                textAlign: "left",
                padding: "1px 12px",
                minWidth: 0,
                color: "white",
                textTransform: "capitalize",
              },
              "& .Mui-selected": {
                color: "white",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#242424",
                height: "2px",
              },
            }}
          >
            <Tab value="link" label="Link" />
            <Tab value="members" label="Members" />
          </Tabs>

          <div className="p-1 bg-[#181A1D]">
            {/* Tab Content */}
            {activeTab === "link" && (
              <Box sx={{ background: "#131313" }}>

                <Box
                  sx={{
                    width: "97%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="flex flex-col  px-4 gap-0.5 py-2 ">
                    <label className="text-white ">Enable Link</label>
                    <span className="text-slateGray-2 text-xs">
                      {" "}
                      invite anyone to collaborate in your space without an
                      account
                    </span>
                  </div>
                  <Switch
                    checked={linkEnabled}
                    onChange={() => setLinkEnabled(!linkEnabled)}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "white",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#9EFF00",
                      },
                      "& .MuiSwitch-track": {
                        backgroundColor: "gray",
                      },
                    }}
                  />
                </Box>

                {linkEnabled && (
                  <>
                    <Box mt={1} mx={3} display="flex" gap={1}>
                      <input
                        type="text"
                        value={generatedUrl || ""}
                        readOnly
                        className="px-2 border border-eclipseGray py-2 bg-[#131313] text-white w-full text-sm rounded-lg"
                      />
                    </Box>
                    
                    <div className="flex items-center gap-2 mt-2 mx-3">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(generatedUrl || window.location.href);
                          toast.success('Link copied to clipboard!', {
                            position: "top-center",
                            autoClose: 2000,
                          });
                        }}
                        className="px-2 justify-center items-center flex gap-1 py-2 bg-limeGreen text-black whitespace-nowrap text-sm rounded-full"
                      >
                        <FaLink />
                        <span>Copy Link</span>
                      </button>

                      <button 
                        onClick={handleGenerateNewUrl} 
                        className="text-[#7ECC00] text-sm cursor-pointer hover:underline"
                      >
                        Reset Link
                      </button>
                    </div>
                  </>
                )}

                <div className="px-4 mt-10">
                  <h3 className="text-white">Options</h3>
                </div>
                <div className="">
                  <Box>
                    <Box
                      sx={{
                        width: "97%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div className="flex items-center text-sm  text-gainsBoro   px-4 gap-2 py-2">
                        <FiDownload className="text-[16px] cursor-pointer" />
                        <label className="tetx-sm">Allow Downloads</label>
                      </div>
                      <Switch
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "white",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#92FF24",
                            },
                          "& .MuiSwitch-track": {
                            backgroundColor: "gray",
                          },
                        }}
                        checked={allowDownloads}
                        onChange={() => setAllowDownloads(!allowDownloads)}
                        color="primary"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      width: "97%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="flex items-center  text-gainsBoro  text-sm  px-4 gap-2 py-2">
                      <FiLock />
                      <label className=" ">Require Password</label>
                    </div>
                    <Switch
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "white",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "#9EFF00",
                        },
                        "& .MuiSwitch-track": {
                          backgroundColor: "gray",
                        },
                      }}
                      checked={requirePassword}
                      onChange={handlePasswordToggle}
                      color="primary"
                    />
                  </Box>

                  {requirePassword && (
                    <Box mx={3} display="flex" gap={1}>
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={tempPassword}
                        onChange={(e) => setTempPassword(e.target.value)}
                        readOnly={false}
                        className="px-2 border outline-none border-eclipseGray focus:outline-none focus:ring-0 focus:border-none py-1 bg-[#131313] text-white w-full text-sm rounded-lg"
                        sx={{
                          '& .MuiInput-input': {
                            color: 'white',
                          },
                          '&:before': {
                            borderBottom: 'none',
                          },
                          '&:after': {
                            borderBottom: 'none',
                          },
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: 'white' }}
                            >
                              {showPassword ? (
                                <Visibility sx={{ color: 'white', fontSize: '16px' }} />
                              ) : (
                                <VisibilityOff sx={{ color: 'white', fontSize: '16px' }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />

                      <div className="flex gap-1 w-[40%]">
                        <button
                          className="px-2 justify-center items-center flex gap-1 py-2 bg-limeGreen text-black w-full whitespace-nowrap text-sm rounded-full"
                          onClick={handleSave}
                        >
                          <span>Save</span>
                        </button>
                        
                        <button
                          className="px-2 border border-white justify-center items-center flex gap-1 py-2 text-white w-full whitespace-nowrap text-sm rounded-full"
                          onClick={handleCancel}
                        >
                          <span>Cancel</span>
                        </button>
                      </div>
                    </Box>
                  )}

                  <Box
                    sx={{
                      width: "97%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="flex items-center  text-gainsBoro   px-4 gap-1 py-2">
                      <RxPerson />

                      <label className="">Require Account</label>
                    </div>
                    <Switch
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "white",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "#9EFF00",
                        },
                        "& .MuiSwitch-track": {
                          backgroundColor: "gray",
                        },
                      }}
                      checked={requireAccount}
                      onChange={() => setRequireAccount(!requireAccount)}
                      color="primary"
                    />
                  </Box>
                </div>
              </Box>
            )}
          </div>
          
          {activeTab === "members" && (
            <div className="bg-[#131313] p-4">
              <div className="bg-eclipseGray rounded-md">
                {loading ? (
                  <div className="p-4 text-center text-coolGray">Loading...</div>
                ) : collaborators.length > 0 ? (
                  collaborators.map((collaborator, index) => (
                    <div key={collaborator.id} className={`flex justify-between pr-4 py-2 items-center ${
                      index !== collaborators.length - 1 ? "bg-eclipseGray" : ""
                    }`}>
                      <div className="flex px-4 gap-2">
                        <div className="w-8 h-8 rounded-full border-2 border-charcoalGray aspect-square">
                          <img
                            src={collaborator.user.thumbnail || cover}
                            alt={collaborator.user.professional_name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex gap-2 items-center">
                            <span className="text-white text-sm">
                              {collaborator.user.professional_name}
                            </span>
                            {collaborator.user.is_owner && (
                              <span className="text-coolGray px-1 py-0.5 rounded-sm bg-black text-[10px]">
                                you
                              </span>
                            )}
                          </div>
                          <span className="text-coolGray text-[10px]">
                            {collaborator.role || "Collaborator"}
                          </span>
                        </div>
                      </div>
                      {collaborator.user.is_owner && (
                        <div className="text-coolGray text-xs">owner</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-coolGray">
                    No collaborators found
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            border: "none",
            boxShadow: "none",
            background: "#131313",
            outline: "none"
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.8)"
          }
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>Remove Password Protection?</DialogTitle>
        <DialogContent>
          <p className="text-slateGray-2">
            Are you sure you want to remove the password protection? This will make the sample accessible without a password.
          </p>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <button
            onClick={() => setShowConfirmDialog(false)}
            className="px-4 py-2 border border-white text-white rounded-full mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleRemovePassword}
            className="px-4 py-2 bg-limeGreen text-black rounded-full"
          >
            Remove Password
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShareSetting;
