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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import InboxDirectory from "./components/Directory";
import { MessengerProvider } from "api/messenger/context";
import { setBreadcrumbs } from "redux/actions/breadcrumb.actions";
import { ConversationProvider } from "./components/Directory/context";
import StripeElements from "components/stripe/stripeElements";
const InboxPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBreadcrumbs([
      { name: 'DMs', path: '/inbox' },
    ]));
  }, [dispatch]);

  return (
    <Theme isOverflowHidden={true}>
      <MessengerProvider>
        <ConversationProvider>
          <div className="flex h-full w-full overflow-hidden">
            <InboxDirectory />
          </div>
          <div className="w-full h-full">
            <StripeElements />
          </div>
        </ConversationProvider>
      </MessengerProvider>
    </Theme>
  );
};

export default InboxPage;
