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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setBreadcrumbs } from "redux/actions/breadcrumb.actions";

const InboxPage = () => {
  // Set breadcrumbs (nav bar) for inbox page
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBreadcrumbs([
      { name: 'DMs', path: '/inbox' },
    ]));
  }, [dispatch]);
  return (
    <Theme isOverflowHidden={true}>
      <div className="flex overflow-hidden grow">
        <MessagesList />
      </div>
    </Theme>
  );
};

export default InboxPage;
