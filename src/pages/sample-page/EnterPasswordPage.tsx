import linesImg from "../../assets/img/lines.png";
import publicLinksBg from "../../assets/img/publicLinksBg.png";
import defaultImg from "../../assets/img/artistImg.png";
import { useState } from "react";
import { FiLock } from "react-icons/fi";
import { toast } from "react-toastify";

interface IProps {
  setIsLoading: (value: boolean) => void;
  handleGetSound: (password?: string) => Promise<void>;
  user: any;
  isLoggedIn: boolean;
  require_logged_in: boolean;
}
const EnterPasswordPage = (props: IProps) => {
  const { setIsLoading, handleGetSound, user, require_logged_in, isLoggedIn } = props;
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await handleGetSound(passwordInput);
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
        position: "top-center",
        hideProgressBar: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-svh flex flex-col">
      <div
        className="flex-1 overflow-hidden relative"
        style={{ backgroundImage: `url(${publicLinksBg})` }}
      >
        <img src={linesImg} alt="linesImg" className="w-full h-full" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-wrap justify-center items-center gap-6 p-5 border border-eerieBlack rounded-lg">
            <div className="w-[108px] h-[108px] bg-darkGray border border-eerieBlack rounded-lg p-[22px]">
              <div className="w-full h-full rounded-full relative">
                <img
                  src={user?.thumbnail}
                  alt=""
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {require_logged_in && !isLoggedIn ? (
                <div className="w-[313px] text-center">
                  <p className="text-dimGray text-sm mb-2">Log in required.</p>
                  <a 
                    href="/login" 
                    className="bg-limeGreen text-jetBlack text-sm font-semibold w-full h-[42px] flex justify-center items-center rounded-[60px]"
                  >
                    Log in
                  </a>
                </div>
              ) : (
                <>
                  <div className="relative w-[313px]">
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter your password"
                      className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full p-[14px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg text-sm"
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 right-4">
                      <FiLock className="text-dimGray w-5 h-5" />
                    </div>
                  </div>

                  <div
                    onClick={passwordInput ? handleSubmit : () => {}}
                    className={`${
                      passwordInput ? "cursor-pointer" : "cursor-not-allowed"
                    } bg-limeGreen text-jetBlack text-sm font-semibold w-full h-[42px] flex justify-center items-center rounded-[60px]`}
                  >
                    Submit
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterPasswordPage;
