import { getConversationMessages, getConversationNotes } from "api/messenger";
import { IConversation, INotes } from "../components/types";
import moment from "moment";
import { useState } from "react";
import { IGetConversationMessages } from "api/messenger/objects/api.interfaces";

const useGetMessagesNotes = (setActiveConversation) => {
  const [localMessages, setLocalMessages] = useState([]);
  const [notes, setNotes] = useState<INotes[]>([]);
  const [loading, setLoading] = useState(false);

  const getConvMessages = async (conversation: IConversation) => {
    setActiveConversation(conversation);
    const payload: IGetConversationMessages = {
      conversationId: String(conversation.conversation_id),
      skip: 0,
      take: 10,
    }
    const _msgs = await getConversationMessages(payload);
    console.log('getConvMessages _msgs:', _msgs);

    const results = Array.isArray(_msgs.data?.results) 
      ? _msgs.data?.results 
      : Object.values(_msgs.data?.results || {});
    
    console.log('getConvMessages results:', results);
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
    await getConvMessages(selectedConvo);
    await getNotes(selectedConvo.id);
    setLoading(false);
  };
  
  return {
    localMessages,
    notes,
    loading,
    getConvMessages,
    getNotes,
    getMessagesNotes,
    setLocalMessages,
  };
};

export default useGetMessagesNotes;
