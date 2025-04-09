import React, { useState } from "react";
import { MdOutlinePerson } from "react-icons/md";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const CollabTable = ({ data, heading }) => {
  // State to keep track of expanded rows
  const [expandedRows, setExpandedRows] = useState([]);

  const handleToggle = (index) => {
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
            <th>Publishing Split</th>
            <th className="max-md:hidden">Status</th>
            <th className="max-md:hidden">Role</th>
            <th>Action</th>
            <th className="md:hidden"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((producer, index) => (
            <React.Fragment key={index}>
              <tr className="border-none text-gray-300">
                <td>
                  <div className="bg-gray-200 w-8 h-8 rounded-full m-2"></div>
                </td>
                <td className="font-medium text-white">{producer.name}</td>
                <td>{producer.split}</td>
                <td className="max-md:hidden">{producer.status}</td>
                <td className="max-w-[200px] text-sm max-md:hidden">
                  {producer.role.map((r, i) => (
                    <span
                      key={i}
                      className="bg-zinc-900 rounded-full px-4 mx-1 py-1"
                    >
                      {r}
                    </span>
                  ))}
                </td>
                <td>
                  <Link to="#" className="underline">
                    {producer.action}
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
                      {producer.role.map((r, i) => (
                        <span
                          key={i}
                          className="bg-zinc-900 rounded-full px-4 mx-1 py-1"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                    <div className="py-2">
                      <h3 className="text-white font-medium py-2 text-md mb-1">
                        Status
                      </h3>
                      <span className="bg-zinc-900 rounded-full px-4 mx-1 py-1">
                        <div className="inline-block bg-[#84ff48] w-[10px] h-[10px] me-2 rounded-full"></div>
                        <p className="inline-block">{producer.status}</p>
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
