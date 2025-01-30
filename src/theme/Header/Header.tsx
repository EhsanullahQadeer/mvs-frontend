/*************************************************************************
 * @file Header.tsx
 * @author End Quote
 * @desc Provides layout and navigation for the application.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import React from "react";
import { classNames, HeaderProps } from "./Header.types";

const Header: React.FC<HeaderProps> = ({ headerTitle }) => {
  return <div className="font-normal text-dimGray">{headerTitle}</div>;
};

export default Header;
