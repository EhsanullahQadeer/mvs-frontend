/*************************************************************************
 * @file InboxPage.tsx
 * @author Ehsanullah
 * @desc Component for displaying and managing user messages and
 *       conversations.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import Theme from "theme";
import MessagesList from "./components/MessagesList";

const InboxPage = () => {
  return (
    <Theme isOverflowHidden={true}>
      <div className="flex overflow-hidden grow">
        <MessagesList />
      </div>
    </Theme>
  );
};

export default InboxPage;
