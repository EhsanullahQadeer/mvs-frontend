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
    <Theme isOverflowHidden={true}>
      <div className="grid grid-cols-2 content-start overflow-hidden">
        <MessagesList />
      </div>
    </Theme>
  );
};

export default InboxPage;
