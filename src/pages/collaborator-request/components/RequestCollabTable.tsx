import React, { useState } from "react";
import { MdOutlinePerson } from "react-icons/md";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { config } from "config/ConfigManager";

interface Collaborator {
  id: number;
  contribution: number;
  roles: string[];
  is_owner: boolean;
  status: string;
  sample_id: number;
  collaborator_id: number;
  collaborator: {
    id: number;
    first_name: string;
    last_name: string;
    professional_name: string;
    primary_role: string;
    thumbnail?: string;
    [key: string]: any;
  };
}

interface CollabTableProps {
  data: Collaborator[];
  heading: string;
}

const CollabTable: React.FC<CollabTableProps> = ({ data, heading }) => {
  // State to keep track of expanded rows
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="md:px-8 py-8 px-4">
      <h1 className="text-gray-200 text-xl font-medium pb-3">{heading}</h1>
      <table className="w-full md:w-[98%] md:mx-[1%] max-md:text-sm">
        <thead className="text-left text-white">
          <tr>
            <th className="ps-4 text-xl">
              <MdOutlinePerson />
            </th>
            <th>User</th>
            <th>Contribution</th>
            <th className="max-md:hidden">Status</th>
            <th className="max-md:hidden">Role</th>
            <th>Action</th>
            <th className="md:hidden"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((collab, index) => (
            <React.Fragment key={collab.id}>
              <tr className="border-none text-gray-300">
                <td>
                  {collab.collaborator.thumbnail ? (
                    <img
                      src={`${config.get("ASSETS")}/${
                        collab.collaborator.thumbnail
                      }`}
                      alt={collab.collaborator.professional_name}
                      className="w-8 h-8 rounded-full m-2 object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 w-8 h-8 rounded-full m-2"></div>
                  )}
                </td>
                <td className="font-medium text-white">
                  {collab.collaborator.professional_name}
                </td>
                <td>{collab.contribution}%</td>
                <td className="max-md:hidden capitalize ">
                  {" "}
                  {collab.status.charAt(0).toUpperCase() +
                    collab.status.slice(1).toLowerCase()}
                </td>
                <td className="max-w-[200px] text-sm max-md:hidden">
                  {collab.roles.map((role, i) => (
                    <span
                      key={i}
                      className="bg-zinc-900 rounded-full px-4 mx-1 py-1"
                    >
                      {role}
                    </span>
                  ))}
                </td>
                <td>
                  <Link to="#" className="underline">
                    {collab.is_owner ? "View" : "Accept/Deny"}
                  </Link>
                </td>
                <td className="md:hidden" onClick={() => handleToggle(index)}>
                  {expandedRows.includes(index) ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </td>
              </tr>

              {/* Show hidden content when the row is expanded */}
              {expandedRows.includes(index) && (
                <tr>
                  <td colSpan={7} className="py-2 text-sm text-gray-400">
                    <div className="py-2">
                      <h3 className="text-white font-medium py-2 text-md mb-1">
                        Roles
                      </h3>
                      {collab.roles.map((role, i) => (
                        <span
                          key={i}
                          className="bg-zinc-900 rounded-full px-4 mx-1 py-1"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                    <div className="py-2">
                      <h3 className="text-white font-medium py-2 text-md mb-1">
                        Status
                      </h3>
                      <span className="bg-zinc-900 rounded-full px-4 mx-1 py-1">
                        <div className="inline-block bg-[#84ff48] w-[10px] h-[10px] me-2 rounded-full"></div>
                        <p className="inline-block">{collab.status}</p>
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollabTable;
