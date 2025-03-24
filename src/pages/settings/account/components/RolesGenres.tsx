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

const RolesGenres: React.FC<{ user: any, setUser: any }> = ({ user, setUser }) => { 
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize state with user's existing values
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  
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
    
    setSelectedRoles(roles);
    setSelectedGenres(genres);
    setSelectedPublishers(publishers);
    
    setOriginalValues({
      roles: [...roles],
      genres: [...genres],
      publishers: [...publishers]
    });
  }, [user]);

  const handleFormSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const payload = {
        primary_role: selectedRoles[0] || "",
        secondary_role: selectedRoles[1] || "",
        main_genre: selectedGenres[0] || "",
        sub_genre: selectedGenres[1] || "",
        publisher: selectedPublishers[0] || ""
      };
      
      const response = await updateUserProfileAPI(payload);
      
      if (response) {
        setUser({
          ...user,
          ...payload
        });
        
        setOriginalValues({
          roles: [...selectedRoles],
          genres: [...selectedGenres],
          publishers: [...selectedPublishers]
        });
        
        setIsEditable(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    setSelectedRoles([...originalValues.roles]);
    setSelectedGenres([...originalValues.genres]);
    setSelectedPublishers([...originalValues.publishers]);
    setIsEditable(false);
  };

  const handleEditToggle = () => {
    if (isEditable) {
      handleFormSubmit();
    } else {
      setIsEditable(true);
      setOriginalValues({
        roles: [...selectedRoles],
        genres: [...selectedGenres],
        publishers: [...selectedPublishers]
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
      <div className="flex gap-3 w-full mt-2">
        <MultiSelectDropdown
          dataArr={rolesArr}
          selectedSkills={selectedRoles}
          setSelectedSkills={setSelectedRoles}
          label="Roles"
          isEditable={isEditable}
          name="roles"
          maxSelections={2}
        />
        <MultiSelectDropdown
          dataArr={genresArr}
          selectedSkills={selectedGenres}
          setSelectedSkills={setSelectedGenres}
          label="Genres"
          isEditable={isEditable}
          name="genres"
          maxSelections={2}
        />
        <MultiSelectDropdown
          dataArr={publishersArr}
          selectedSkills={selectedPublishers}
          setSelectedSkills={setSelectedPublishers}
          label="Publisher"
          isEditable={isEditable}
          name="publishers"
          maxSelections={1}
        />
      </div>
    </section>
  );
};

export default RolesGenres;
