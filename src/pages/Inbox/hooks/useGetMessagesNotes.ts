import { getConversationNotes, getConversationsById } from "api/messenger";
import { IConversation, INotes } from "../components/types";
import moment from "moment";
import { useState } from "react";

const useGetMessagesNotes = (setActiveConversation) => {
  const [localMessages, setLocalMessages] = useState([]);
  const [notes, setNotes] = useState<INotes[]>([]);
  const [loading, setLoading] = useState(false);

  const getConversationMessages = async (conversation: IConversation) => {
    setActiveConversation(conversation);
    const _msgs = await getConversationsById(
      {
        limit: 10,
      },
      conversation.id
    );

    const results = _msgs.data.messages;

    for (var i = 0; i < results.length; i++) {
      results[i].date = moment(results[i].Timestamp).format("YYYY-MM-DD");
    }

    const groups = results.reduce((groups, message) => {
      const date = message.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        messages: groups[date],
      };
    });

    setLocalMessages(groupArrays);
  };

  const getNotes = async (id: number) => {
    const response = await getConversationNotes({
      conversationId: id,
      ascending: true,
    });

    setNotes(response.data);
  };

  const getMessagesNotes = async (selectedConvo: IConversation) => {
    setLoading(true);
    await getConversationMessages(selectedConvo);
    await getNotes(selectedConvo.id);
    setLoading(false);
  };
  
  return {
    localMessages,
    notes,
    loading,
    getConversationMessages,
    getNotes,
    getMessagesNotes,
    setLocalMessages,
  };
};

export default useGetMessagesNotes;
