/*************************************************************************
 * @file InboxPage.tsx
 * @author Zohaib Ahmad
 * @desc Component for displaying and managing user messages and 
 *       conversations.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */

/* IMPORTS */
import {
  useEffect,
  useRef,
  useState
} from "react";
import Theme from "theme";
import React from "react";
import MessagesList from "./list";
import MessagesDetail from "./detail";



const InboxPage = (

) => {


  return (
    <Theme>
      <div className="relative">
        <MessagesList />
        <MessagesDetail />
      </div>
    </Theme>
  );
};

export default InboxPage;
