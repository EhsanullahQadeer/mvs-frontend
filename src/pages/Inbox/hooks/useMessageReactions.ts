import { useState, useEffect } from "react";
import { IMessageReactions, IMessagesData } from "../components/types";
import { addReactionApi, deleteReactionApi, getMessageReactionsApi } from "api/messenger";

export const useMessageReactions = (
  messages: IMessagesData,
  currentUserId: number
) => {

  const [messageReactions, setMessageReactions] = useState<IMessageReactions>(
    () =>
      (messages[0]?.messages || []).reduce((acc, msg) => {
        acc[msg.id] = {
          reactionCounts: msg.reactions.reduce((counts, reaction) => {
            counts[reaction.emoji] = {
              userId: reaction.users[0]?.id,
              count: reaction.count,
            };
            return counts;
          }, {}),
        };
        return acc;
      }, {})
  );


  // emojis background refreshing
  useEffect(() => {
    const refreshReactions = async () => {
      try {
        const messagesToUpdate = messages[0]?.messages || [];
        
        // referesh reactions for all messages in background
        const updatedReactions = await Promise.allSettled(
          messagesToUpdate.map(msg => 
            getMessageReactionsApi(msg.id)
              .then(response => ({
                messageId: msg.id,
                data: response.data
              }))
          )
        );

        updatedReactions.forEach(result => {
          if (result.status === 'fulfilled') {
            const { messageId, data } = result.value;
            const processed = processReactions(data, messageId);
            setMessageReactions(prev => ({
              ...prev,
              [messageId]: processed[messageId]
            }));
          }
        });
      } catch (error) {
        console.error("Background refresh error:", error.message);
      }
    };

  }, [messages]);

  const handleEmojiSelect = async (messageId: number, emoji: string) => {
    try {
      const reactions = await getMessageReactionsApi(messageId);
      const currentReactions = reactions.data.reduce((acc, reaction) => {
        if (!acc[reaction.emoji]) {
          acc[reaction.emoji] = {
            count: 0,
            users: []
          };
        }
        acc[reaction.emoji].count += 1;
        acc[reaction.emoji].users.push(reaction.user);
        return acc;
      }, {});
      let previousEmoji: string | null = null;
      
      // Find existing user reaction
      for (const emojiKey in currentReactions) {
        const reaction = currentReactions[emojiKey];
        if (reaction.users.some(user => user.id === currentUserId)) {
          previousEmoji = emojiKey;
          break;
        }
      }

      // Remove previous reaction if exists
      if (previousEmoji) {
        await deleteReactionApi(messageId, {emoji: previousEmoji});
      }

      // Add new reaction if it's different from previous
      if (previousEmoji !== emoji) {
        await addReactionApi(messageId, {emoji: emoji});
      }

      // Refresh reactions after update
      const response = await getMessageReactionsApi(messageId);
      const processedReactions = processReactions(response.data, messageId);
      setMessageReactions(prev => ({
        ...prev,
        [messageId]: processedReactions[messageId]
      }));
    } catch (error) {
      console.error("Error handling emoji select", error.message);
    }
  };

  const processReactions = (data: Array<{ emoji: string; user: { id: number } }>, messageId: number) => {
    return data.reduce((acc, reaction) => { 
      if (!acc[messageId]) {
        acc[messageId] = { reactionCounts: {} };
      }
      const emoji = reaction.emoji;
      if (!acc[messageId].reactionCounts[emoji]) {
        acc[messageId].reactionCounts[emoji] = {
          count: 0,
          users: [],
        };
      }
      acc[messageId].reactionCounts[emoji].count += 1;
      acc[messageId].reactionCounts[emoji].users.push(reaction.user);
      
      console.log("ACC", acc)
      return acc;
    }, {} as IMessageReactions);
  };

  return { messageReactions, handleEmojiSelect };
};
