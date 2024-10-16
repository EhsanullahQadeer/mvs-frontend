/*************************************************************************
 * @file MusicIdentity.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for MusicIdentity of the user while registeration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import FormikLabeledField from "components/util/FormikLabeledField";
import FormikSingleSelectDropdown from "components/util/FormikSingleSelectDropdown";
import { Form, Formik } from "formik";
import { musicGenres, publishersArr } from "../sample-data/sampleData";
import MultiSelectDropdown from "pages/settings/account/components/MultiSelectDropdown";
import { useState } from "react";
import SocialMediaLinks from "./SocialMediaLinks";
import FormikOnChange from "./FormikOnChange";

type Props = {
  isPartner: boolean;
  markSectionAsCompleted: () => void;
  formData: any;
  setFormData: (values: any) => void;
};

const MusicIdentity = (props: Props) => {
  const { isPartner, markSectionAsCompleted, formData, setFormData } = props;
  const [selectedPublishers, setSelectedPublishers] = useState([]);

  const [buttonText, setButtonText] = useState("Save Changes");
  const initialValues = {
    propertyNumber: "",
    collaborationTerms: "",
    publisher: selectedPublishers,
    mainGenre: "",
    subGenre: "",
    "instagram-link": "",
    "twitter-link": "",
    "spotify-link": "",
    "soundcloud-link": "",
    "facebook-link": "",
  };

  const handleSubmit = (values) => {
    setFormData({
      ...formData,
      ...values,
      publisher: selectedPublishers,
    });
    setButtonText("Saved");
    markSectionAsCompleted();
  };

  return (
    <div>
      <p className="text-sm font-normal text-mediumGray">
        Set your musical genres and roles to help us match you with relevant
        opportunities and collaborators.
      </p>

      <div className="mt-[40px]">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values }) => {
            return (
              <Form>
                <>
                  <FormikOnChange
                    onChange={() => setButtonText("Save Changes")}
                  />
                  <div className="flex flex-col gap-10">
                    <div className="flex gap-5">
                      <div className="flex-1">
                        <FormikLabeledField
                          name="propertyNumber"
                          label={`Intellectual Property Number (#IP) ${
                            !isPartner ? "(optional)" : ""
                          }`}
                          placeholder="IP# 123456789"
                          inputBgColor="jetBlack"
                          labelColor="white"
                        />

                        <p className="px-2 mt-3 text-xs font-normal text-dimGray">
                          Enter your Intellectual Property Number (IP#) to
                          ensure your works are properly protected and that you
                          receive the rights and royalties you deserve.
                        </p>
                      </div>

                      <div className="flex-1">
                        <FormikLabeledField
                          name="collaborationTerms"
                          label="Preferred Collaboration Terms (optional)"
                          placeholder="%"
                          inputBgColor="jetBlack"
                          labelColor="white"
                        />

                        <p className="px-2 mt-3 text-xs font-normal text-dimGray">
                          Tell us your preferred starting percentage for any
                          song or sample that uses your work or lands a
                          placement. This will help us set clear expectations
                          and make collaboration smoother.
                        </p>
                      </div>

                      <div className="flex-1">
                        <MultiSelectDropdown
                          {...{
                            dataArr: publishersArr,
                            selectedSkills: selectedPublishers,
                            setSelectedSkills: setSelectedPublishers,
                            label: "Publisher (optional)",
                            name: "publisher",
                            inputBgColor: "#0F0F0F",
                            labelColor: "white",
                            screen: "onBoarding",
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <div className="w-[305px]">
                        <FormikSingleSelectDropdown
                          name="mainGenre"
                          label="Main genre"
                          placeholder="Select Genre"
                          dropdownItems={musicGenres}
                          inputBgColor="#0F0F0F"
                          labelColor="white"
                          dropdownBgColor="#1c1c1c"
                        />

                        <p className="px-2 mt-3 text-xs font-normal text-dimGray">
                          Let us know your preferred genre! This will help us
                          match you with the right creators and make connecting
                          with like-minded producers, songwriters, and artists
                          even easier.
                        </p>
                      </div>

                      <div className="w-[305px]">
                        <FormikSingleSelectDropdown
                          name="subGenre"
                          label="Sub genre"
                          placeholder="Select Genre"
                          dropdownItems={musicGenres}
                          inputBgColor="#0F0F0F"
                          labelColor="white"
                          dropdownBgColor="#1c1c1c"
                        />

                        <p className="px-2 mt-3 text-xs font-normal text-dimGray">
                          Tell us your sub-genre preference! This detail will
                          help us fine-tune your connections with other
                          creators.
                        </p>
                      </div>
                    </div>

                    {isPartner && (
                      <div>
                        <SocialMediaLinks />
                      </div>
                    )}

                    <div className="mr-2.5 w-full flex justify-end">
                      <button
                        type="submit"
                        className={`py-3 px-4 rounded-[60px] text-sm font-semibold border ${
                          buttonText === "Saved"
                            ? "cursor-auto bg-transparent border-eclipseGray text-mediumGray"
                            : "cursor-pointer bg-limeGreen border-limeGreen text-jetBlack"
                        }`}
                      >
                        {buttonText}
                      </button>
                    </div>
                  </div>
                </>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default MusicIdentity;
