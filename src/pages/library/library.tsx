/*************************************************************************
 * @file library.tsx
 * @author Karla Zamora
 * @desc Page component for displaying user's downloaded and liked items.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import { setBreadcrumbs } from "redux/actions/breadcrumb.actions";
import Theme from "theme";

/* THIRD PARTY IMPORTS */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom";

/* ICON IMPORTS */
import { ReactComponent as LikesImg } from "./components/likes.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { ReactComponent as EmptyImg } from "./components/empty.svg";
import { ReactComponent as DownloadIcon } from "assets/icons/downloadIcon.svg";
import { ReactComponent as DownloadsImg } from "./components/downloads.svg";
import { ReactComponent as LockIcon } from "assets/icons/lockIcon.svg"

const Library = () => {

  const tabs = [
    { name: "My Downloads", path: "my/downloads", icon: <DownloadIcon className="mr-1 items-center justify-center" /> },
    { name: "My Likes", path: "my/likes", icon: <LikeIcon className="mr-1 items-center justify-center" /> },
  ];

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        { name: "Library", path: "/library" },
      ])
    );
  }, [dispatch]);

  // Get appropriate top image based on child page
  const renderTopImg = () => {
    if (location.pathname.includes("my/likes")) return <LikesImg />;
    if (location.pathname.includes("my/downloads")) return <DownloadsImg />;
    return <EmptyImg />;
  };

  // Get dynamic label for the second line of text
  const renderDynamicLabel = () => {
    if (location.pathname.includes("my/likes")) return "Likes";
    if (location.pathname.includes("my/downloads")) return "My Downloads";
    return "";
  };

  return (
    <Theme>
      {location.pathname === '/library' && (
        <Navigate to="/library/my/downloads" replace />
      )}
      <div>
        <div id="top-section" className="p-4 border-b border-eclipseGray flex gap-4">
          <div>{renderTopImg()}</div>
          <div className="flex flex-col justify-start mt-4">
            <div className="flex gap-2 items-center leading-[20px]">
              <LockIcon />
              <p className="text-[#848484] text-[14px] font-['Mona-Sans-M']">
                Private
              </p>
            </div>
            <p className="text-white text-[32px] leading-[38.4px] font-bold font-['Mona-Sans-M']">
              {renderDynamicLabel()}
            </p>
          </div>
        </div>

        <div className="flex gap-3 px-3 py-6">
          {tabs.map((tab, index) => (
            <NavLink
              key={index}
              to={`/library/${tab.path}`}
              className={({ isActive }) =>
                `flex items-center py-2 px-3 border rounded-[30px] text-xs font-semibold ${isActive
                  ? "text-eerieBlack border-[#7ECC00] bg-limeGreen shadow-custom-inset"
                  : "border-gunMetal bg-richBlack text-charcoalGray"
                }`
              }
            >
              {tab.icon}
              {tab.name}
            </NavLink>
          ))}
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </Theme>
  );
};

export default Library;
