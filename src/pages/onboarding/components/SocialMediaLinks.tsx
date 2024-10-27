/*************************************************************************
 * @file SocialMediaLinks.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for SocialMediaLinks of the user while registeration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/


import { Field } from "formik";
import { FaFacebook, FaInstagram, FaSoundcloud } from "react-icons/fa";
import { FaSpotify, FaXTwitter } from "react-icons/fa6";
import { IoUnlink } from "react-icons/io5";

type Props = {};

const SocialMediaLinks = (props: Props) => {
  return (
    <>
      <div className="text-base font-semibold text-white">
        Social media links
      </div>

      <div className="mt-[18px] flex flex-col gap-3">
        <div className="flex gap-3.5">
          <div className="flex-1 relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-5 text-white">
              <FaInstagram className="w-6 h-6" />
            </div>
            <Field
              id="instagram_link"
              name="instagram_link"
              placeholder="@beckyhill"
              style={{
                boxShadow: "none",
              }}
              className={`w-full text-dimGray text-sm font-normal px-4 py-3 pl-[54px] rounded-lg bg-jetBlack border border-eclipseGray hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none`}
            />
          </div>

          <div className="border border-eclipseGray bg-jetBlack px-2.5 rounded-lg text-white flex items-center justify-center">
            <IoUnlink className="w-6 h-6" />
          </div>
        </div>

        <div className="flex gap-3.5">
          <div className="flex-1 relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-5 text-white">
              <FaXTwitter className="w-6 h-6" />
            </div>
            <Field
              id="x_link"
              name="x_link"
              placeholder="@beckyhill"
              style={{
                boxShadow: "none",
              }}
              className={`w-full text-dimGray text-sm font-normal px-4 py-3 pl-[54px] rounded-lg bg-jetBlack border border-eclipseGray hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none`}
            />
          </div>

          <div className="border border-eclipseGray bg-jetBlack px-2.5 rounded-lg text-white flex items-center justify-center">
            <IoUnlink className="w-6 h-6" />
          </div>
        </div>

        <div className="flex gap-3.5">
          <div className="flex-1 relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-5 text-white">
              <FaSpotify className="w-6 h-6" />
            </div>
            <Field
              id="spotify_link"
              name="spotify_link"
              placeholder="https://open.spotify.com/artist/example"
              style={{
                boxShadow: "none",
              }}
              className={`w-full text-dimGray text-sm font-normal px-4 py-3 pl-[54px] rounded-lg bg-jetBlack border border-eclipseGray hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none`}
            />
          </div>

          <div className="border border-eclipseGray bg-jetBlack px-2.5 rounded-lg text-white flex items-center justify-center">
            <IoUnlink className="w-6 h-6" />
          </div>
        </div>

        <div className="flex gap-3.5">
          <div className="flex-1 relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-5 text-white">
              <FaSoundcloud className="w-6 h-6" />
            </div>
            <Field
              id="soundcloud_link"
              name="soundcloud_link"
              placeholder="https://soundcloud.com/example"
              style={{
                boxShadow: "none",
              }}
              className={`w-full text-dimGray text-sm font-normal px-4 py-3 pl-[54px] rounded-lg bg-jetBlack border border-eclipseGray hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none`}
            />
          </div>

          <div className="border border-eclipseGray bg-jetBlack px-2.5 rounded-lg text-white flex items-center justify-center">
            <IoUnlink className="w-6 h-6" />
          </div>
        </div>

        <div className="flex gap-3.5">
          <div className="flex-1 relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-5 text-white">
              <FaFacebook className="w-6 h-6" />
            </div>
            <Field
              id="facebook_link"
              name="facebook_link"
              placeholder="https://facebook.com/example"
              style={{
                boxShadow: "none",
              }}
              className={`w-full text-dimGray text-sm font-normal px-4 py-3 pl-[54px] rounded-lg bg-jetBlack border border-eclipseGray hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none`}
            />
          </div>

          <div className="border border-eclipseGray bg-jetBlack px-2.5 rounded-lg text-white flex items-center justify-center">
            <IoUnlink className="w-6 h-6" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialMediaLinks;
