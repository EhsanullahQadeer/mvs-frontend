// src/components/Breadcrumb.tsx
/*************************************************************************
 * @file Breadcrumb.tsx
 * @desc Displays breadcrumb navigation based on the Redux breadcrumb state.
 *************************************************************************/

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/reducers';

const Breadcrumb: React.FC = () => {
  // Access breadcrumb data from Redux store
  const breadcrumbs = useSelector((state: RootState) => state.breadcrumb.breadcrumbs);

  return (
    <nav aria-label="breadcrumb" className="w-full">
      <ol className="flex items-center list-none p-0 m-0">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            <Link className="hover:text-[#9EFF00] text-[#3D3D3D] text-[14px] font-['Mona-Sans-S']" to={crumb.path}>{crumb.name}</Link>
            {index < breadcrumbs.length - 1 && (
              <span className="mx-2 text-[#3D3D3D] text-[14px] font-['Mona-Sans-S']">\</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
