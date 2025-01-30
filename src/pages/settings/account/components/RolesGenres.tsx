/*************************************************************************
 * @file AccountSetting.tsx
 * @author Ehsanullah Qadeer
 * @desc  component AccountSetting for account setting page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import { ReactComponent as EditIcon } from "../../../../assets/icons/editPencilIcon.svg";

// THIRD PARTY IMPORTS
import { useState } from "react";
import { Form, Formik } from "formik";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { genresArr, publishersArr, rolesArr } from "./data";

const RolesGenres = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);

  const initialValues = {
    roles: selectedRoles,
    genres: selectedGenres,
    publishers: selectedPublishers,
  };

  const handleFormSubmit = (values: any) => {
    console.log("values ", values);
  };

  return (
    <section className=" px-4 mt-10 py-5 border-b border-t border-[#242424] w-full">
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        {() => (
          <Form>
            <div className="flex justify-between items-center">
              <h2 className={`text-white py-2.5 text-base font-semibold `}>
                Roles & Genres
              </h2>
              {/* Edit / Save Changes Button */}
              <div className="flex">
                <button
                  type={isEditable ? "button" : "submit"}
                  onClick={() => setIsEditable(!isEditable)}
                  className="flex justify-between items-center gap-1 whitespace-nowrap text-sm px-2 py-1 rounded-lg text-dimGray bg-gunMetal"
                >
                  {isEditable ? (
                    "Save"
                  ) : (
                    <>
                      <span className="text-sm">Edit</span>
                      <div className="text-dimGray">
                        <EditIcon />
                      </div>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="flex gap-3 w-full">
              <MultiSelectDropdown
                {...{
                  dataArr: rolesArr,
                  selectedSkills: selectedRoles,
                  setSelectedSkills: setSelectedRoles,
                  label: "Roles",
                  isEditable,
                  name: "roles",
                }}
              />
              <MultiSelectDropdown
                {...{
                  dataArr: genresArr,
                  selectedSkills: selectedGenres,
                  setSelectedSkills: setSelectedGenres,
                  label: "Genres",
                  isEditable,
                  name: "genres",
                }}
              />
              <MultiSelectDropdown
                {...{
                  dataArr: publishersArr,
                  selectedSkills: selectedPublishers,
                  setSelectedSkills: setSelectedPublishers,
                  label: "Publisher",
                  isEditable,
                  name: "publishers",
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RolesGenres;
