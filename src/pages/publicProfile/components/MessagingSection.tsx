import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { getConversationsById, getConversationWithUser } from "api/messenger";
import MessagesDetail from "pages/Inbox/components/MessagesDetail";
import { ICurrentUser } from "pages/Inbox/components/types";

interface IProps {
  artistData: any;
}

const currentUser: ICurrentUser = {
  id: 1,
  first_name: null,
  last_name: null,
  professional_name: null,
  username: null,
  bio: null,
  email: "user@example.com",
  address: null,
  thumbnail: "https://example.com/profile.jpg",
  phone: null,
  city: null,
  state: null,
  country: null,
  gender: null,
  primary_label: null,
  sub_label: null,
  referral_code: null,
  referred_by_id: null,
  referral_completed_at: null,
  banner_image: null,
  text_message_price: 5,
  demo_message_price: 10,
  cognito_id: "abcd-1234-xyz",
  email_verified: true,
  active: true,
  first_visit: false,
  created_at: "2024-09-09T12:00:00Z",
  updated_at: "2024-09-09T12:30:00Z",
  popularity_rank: 100,
  followers: 5000,
  total_messages: 200,
  metrics_last_updated: null,
  is_admin: false,
  is_partner: false,
  spotify_artist_id: null,
  is_placeholder_account: null,
};

const MessagingSection = (props: IProps) => {
  const { artistData } = props;
  const [chatData, setChatData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // const user = useSelector((state: RootState) => state);

  // console.log("user...", user);

  const handleGetMessages = async () => {
    if (!artistData?.id) return;

    try {
      setLoading(true);

      // Pass recipient_id as a query parameter
      const response = await getConversationWithUser(artistData.id);
      console.log("conversation with user response:", response);

      if (response.data) {
        const conversation = {
          id: response.data.id,
          thumbnail: artistData.thumbnail,
          displayName: artistData.professional_name,
          // sender: user.auth.user.id,
          sender: currentUser.id,
          recipient_id: artistData.id,
          conversation_id: response.data.id,
        };

        console.log("existing conversation found:", conversation);
        setChatData(conversation);
        await getConversationMessages(conversation);
      } else {
        // For new conversations, use a temporary ID that will be replaced
        const tempId = `temp_${Date.now()}`;
        const conversation = {
          id: tempId, // Add a temporary ID here
          thumbnail: artistData.thumbnail,
          displayName: artistData.professional_name,
          // sender: user.auth.user.id,
          sender: currentUser.id,
          recipient_id: artistData.id,
          conversation_id: null,
          messages: [],
          isNew: true, // Flag to indicate this is a new conversation
        };

        console.log("creating new conversation:", conversation);
        setChatData(conversation);
        setMessages([
          {
            date: new Date().toISOString().split("T")[0],
            messages: [],
          },
        ]);
      }
    } catch (error) {
      console.error("Error opening chat:", error);
    } finally {
      setLoading(false);
    }
  };

  const getConversationMessages = async (conversation) => {
    try {
      console.log("Getting messages for conversation:", conversation);

      // If this is a new conversation that just got created
      if (!conversation.id && conversation.conversation_id) {
        // Update the chatData with the new conversation_id
        setChatData((prev) => ({
          ...prev,
          id: conversation.conversation_id,
          conversation_id: conversation.conversation_id,
        }));
      }

      let conversationId = conversation.id || conversation.conversation_id;
      if (String(conversationId).startsWith("temp")) {
        const response = await getConversationWithUser(artistData.id);

        if (response.data) {
          conversationId = response.data.id;
          setChatData({
            id: response.data.id,
            thumbnail: artistData.thumbnail,
            displayName: artistData.professional_name,
            // sender: user.auth.user.id,
            sender: currentUser.id,
            recipient_id: artistData.id,
            conversation_id: response.data.id,
          });
        }
      }
      if (conversationId) {
        const messagesResponse = await getConversationsById(
          { limit: 10 },
          conversationId
        );

        // Format messages in the expected structure
        const formattedMessages = [
          {
            date: new Date().toISOString().split("T")[0],
            messages: messagesResponse.data.messages || [],
          },
        ];

        console.log("Setting formatted messages:", formattedMessages);
        setMessages(formattedMessages);
      } else {
        // For new conversations, set an empty messages array with the correct structure
        setMessages([
          {
            date: new Date().toISOString().split("T")[0],
            messages: [],
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    handleGetMessages();
  }, []);

  return (
    <div className="flex flex-col">
      <MessagesDetail
        conversation={chatData}
        loading={loading}
        messages={messages}
        getConversationMessages={getConversationMessages}
        getNotes={() => {}}
        notes={[]}
        // currentUserInfo={user.auth.user}
        currentUserInfo={currentUser}
        onClose={() => {}}
        userInfo={artistData}
        isPublicProfile={true}
      />
    </div>
  );
};

export default MessagingSection;
