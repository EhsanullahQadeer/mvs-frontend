/*************************************************************************
 * @file search-tag.tsx
 * @author End Quote
 * @desc Component for search functionality with tags management.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import { useState } from 'react';

const SearchWithTags = () => {
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState('');

  const handleAddTag = (e) => {
    e.preventDefault();
    if (search && !tags.includes(search)) {
      setTags([...tags, search]);
      setSearch('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="search flex items-center">
      <form onSubmit={handleAddTag} className="flex items-center">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>

        <div className="relative w-[165px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={25}
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M21 21.5L16.7 17.2M19 11.5C19 15.9183 15.4183 19.5 11 19.5C6.58172 19.5 3 15.9183 3 11.5C3 7.08172 6.58172 3.5 11 3.5C15.4183 3.5 19 7.08172 19 11.5Z"
                stroke="#4C4C4C"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-[#0F0F0F] font-['Mona-Sans-M'] border border-[#191919] text-[#4c4c4c] text-sm rounded-[100px] w-full h-[45px] pl-10 py-2.5"
            placeholder="Search samples."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      {/* TAGS */}
      <div 
        className="flex overflow-x-auto space-x-2 ml-4"
        style={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {tags.map((tag, index) => (
          <div 
            key={index} 
            className="tag flex items-center bg-[#1F1F1F] text-white px-3 py-1 rounded-full"
          >
            <span>
              {tag}
            </span>
            <button
              className="ml-2 text-[#FF0000]"
              onClick={() => 
                handleRemoveTag(tag)
              }
            >
              x
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SearchWithTags;
