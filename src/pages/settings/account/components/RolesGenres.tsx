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
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { genresArr, publishersArr, rolesArr } from "./data";
import { updateUserProfileAPI } from "api/user";
import * as Yup from 'yup';

// Add validation schema
const validationSchema = Yup.object({
  primary_role: Yup.string().required('Primary role is required'),
  secondary_role: Yup.string().required('Secondary role is required'),
  main_genre: Yup.string().required('Main genre is required'),
  sub_genre: Yup.string().required('Sub genre is required'),
  publisher: Yup.string().required('Publisher is required'),
});

const RolesGenres: React.FC<{ user: any, setUser: any }> = ({ user, setUser }) => { 
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  
  // Initialize state with user's existing values
  const [selectedPrimaryRole, setSelectedPrimaryRole] = useState<string>(user.primary_role || "");
  const [selectedSecondaryRole, setSelectedSecondaryRole] = useState<string>(user.secondary_role || "");
  const [selectedMainGenre, setSelectedMainGenre] = useState<string>(user.main_genre || "");
  const [selectedSubGenre, setSelectedSubGenre] = useState<string>(user.sub_genre || "");
  const [selectedPublisher, setSelectedPublisher] = useState<string>(user.publisher || "");

  // Store original values to reset on cancel
  const [originalValues, setOriginalValues] = useState({
    roles: [] as string[],
    genres: [] as string[],
    publishers: [] as string[]
  });

  // Update selections when user data changes
  useEffect(() => {
    if (!user) return;
    
    const roles = [
      ...(user.primary_role ? [user.primary_role] : []),
      ...(user.secondary_role ? [user.secondary_role] : [])
    ];
    
    const genres = [
      ...(user.main_genre ? [user.main_genre] : []),
      ...(user.sub_genre ? [user.sub_genre] : [])
    ];
    
    const publishers = user.publisher ? [user.publisher] : [];
    
    setSelectedPrimaryRole(roles[0] || "");
    setSelectedSecondaryRole(roles[1] || "");
    setSelectedMainGenre(genres[0] || "");
    setSelectedSubGenre(genres[1] || "");
    setSelectedPublisher(publishers[0] || "");
    
    setOriginalValues({
      roles: [...roles],
      genres: [...genres],
      publishers: [...publishers]
    });
  }, [user]);

  const handleFormSubmit = async () => {
    // Check if all fields are filled
    if (!selectedPrimaryRole || !selectedSecondaryRole || !selectedMainGenre || 
        !selectedSubGenre || !selectedPublisher) {
      setShowValidationError(true);
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const payload = {
        primary_role: selectedPrimaryRole || "",
        secondary_role: selectedSecondaryRole || "",
        main_genre: selectedMainGenre || "",
        sub_genre: selectedSubGenre || "",
        publisher: selectedPublisher || ""
      };
      
      const response = await updateUserProfileAPI(payload);
      
      if (response) {
        setUser({
          ...user,
          ...payload
        });
        
        setOriginalValues({
          roles: [selectedPrimaryRole, selectedSecondaryRole].filter(Boolean),
          genres: [selectedMainGenre, selectedSubGenre].filter(Boolean),
          publishers: [selectedPublisher].filter(Boolean)
        });
        
        setShowValidationError(false);
        setIsEditable(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    setSelectedPrimaryRole(originalValues.roles[0] || "");
    setSelectedSecondaryRole(originalValues.roles[1] || "");
    setSelectedMainGenre(originalValues.genres[0] || "");
    setSelectedSubGenre(originalValues.genres[1] || "");
    setSelectedPublisher(originalValues.publishers[0] || "");
    setShowValidationError(false);
    setIsEditable(false);
  };

  const handleEditToggle = () => {
    if (isEditable) {
      handleFormSubmit();
    } else {
      setIsEditable(true);
      setShowValidationError(false);
      setOriginalValues({
        roles: [
          selectedPrimaryRole || "",
          selectedSecondaryRole || ""
        ],
        genres: [
          selectedMainGenre || "",
          selectedSubGenre || ""
        ],
        publishers: [
          selectedPublisher || ""
        ]
      });
    }
  };

  return (
    <section className="px-4 mt-10 py-5 border-b border-t border-[#242424] w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-white py-2.5 text-base font-semibold">
          Roles & Genres
        </h2>
        {/* Edit / Save Changes Button */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleEditToggle}
            disabled={isSubmitting}
            className="flex justify-between items-center gap-1 whitespace-nowrap text-sm px-2 py-1 rounded-lg text-dimGray bg-gunMetal"
          >
            {isEditable ? (
              isSubmitting ? "Saving..." : "Save"
            ) : (
              <>
                <span className="text-sm">Edit</span>
                <div className="text-dimGray">
                  <EditIcon />
                </div>
              </>
            )}
          </button>
          
          {isEditable && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex justify-between items-center gap-1 whitespace-nowrap text-sm px-2 py-1 rounded-lg text-dimGray bg-gunMetal"
            >
              <span className="text-sm">Cancel</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Only show validation error when showValidationError is true */}
      {showValidationError && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 p-2 rounded mt-2 mb-2">
          Please fill out all fields before saving
        </div>
      )}
      
      <Formik
        initialValues={{
          primary_role: selectedPrimaryRole || "",
          secondary_role: selectedSecondaryRole || "",
          main_genre: selectedMainGenre || "",
          sub_genre: selectedSubGenre || "",
          publisher: selectedPublisher || ""
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched, isValid }) => (
          <Form className="w-full">
            <div className="flex gap-3 w-full mt-2">
              <div className="flex flex-col w-full">
                {touched.primary_role && errors.primary_role && (
                  <div className="text-red-500 text-xs mb-1">{errors.primary_role}</div>
                )}
                <MultiSelectDropdown
                  dataArr={rolesArr}
                  selectedSkills={selectedPrimaryRole}
                  setSelectedSkills={setSelectedPrimaryRole}
                  label="Primary Role"
                  isEditable={isEditable}
                  name="primary_role"
                  maxSelections={1}
                  unselectableSkill={selectedSecondaryRole}
                />
              </div>
              
              <div className="flex flex-col w-full">
                {touched.secondary_role && errors.secondary_role && (
                  <div className="text-red-500 text-xs mb-1">{errors.secondary_role}</div>
                )}
                <MultiSelectDropdown
                  dataArr={rolesArr}
                  selectedSkills={selectedSecondaryRole}
                  setSelectedSkills={setSelectedSecondaryRole}
                  label="Secondary Role"
                  isEditable={isEditable}
                  name="secondary_role"
                  maxSelections={1}
                  unselectableSkill={selectedPrimaryRole}
                />
              </div>
              
              <div className="flex flex-col w-full">
                {touched.main_genre && errors.main_genre && (
                  <div className="text-red-500 text-xs mb-1">{errors.main_genre}</div>
                )}
                <MultiSelectDropdown
                  dataArr={genresArr}
                  selectedSkills={selectedMainGenre}
                  setSelectedSkills={setSelectedMainGenre}
                  label="Main Genre"
                  isEditable={isEditable}
                  name="main_genre"
                  maxSelections={1}
                  unselectableSkill={selectedSubGenre}
                />
              </div>
              
              <div className="flex flex-col w-full">
                {touched.sub_genre && errors.sub_genre && (
                  <div className="text-red-500 text-xs mb-1">{errors.sub_genre}</div>
                )}
                <MultiSelectDropdown
                  dataArr={genresArr}
                  selectedSkills={selectedSubGenre}
                  setSelectedSkills={setSelectedSubGenre}
                  label="Sub Genre"
                  isEditable={isEditable}
                  name="sub_genre"
                  maxSelections={1}
                  unselectableSkill={selectedMainGenre}
                />
              </div>
              
              <div className="flex flex-col w-full">
                {touched.publisher && errors.publisher && (
                  <div className="text-red-500 text-xs mb-1">{errors.publisher}</div>
                )}
                <MultiSelectDropdown
                  dataArr={publishersArr}
                  selectedSkills={selectedPublisher}
                  setSelectedSkills={setSelectedPublisher}
                  label="Publisher"
                  isEditable={isEditable}
                  name="publisher"
                  maxSelections={1}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RolesGenres;
