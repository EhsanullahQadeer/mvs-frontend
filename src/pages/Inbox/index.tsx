/*************************************************************************
 * @file InboxPage.tsx
 * @author Ehsanullah
 * @desc Component for displaying and managing user messages and
 *       conversations.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */

/* IMPORTS */
import Theme from "theme";
import MessagesList from "./components/MessagesList";

const InboxPage = () => {
  return (
    <Theme>
      <div className="grid grid-cols-2 content-start">
        <MessagesList />
      </div>
    </Theme>
  );
};

export default InboxPage;
