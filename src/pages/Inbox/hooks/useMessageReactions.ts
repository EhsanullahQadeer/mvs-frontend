import { useState } from "react";
import { IMessageReactions, IMessagesData } from "../components/types";
import { addReactionApi, deleteReactionApi } from "api/messenger";

export const useMessageReactions = (
  messages: IMessagesData,
  currentUserId: number
) => {
  // State for reactions per message
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

  const handleEmojiSelect = (messageId, emoji) => {

    setMessageReactions((prevReactions) => {
      const messageReaction = { ...prevReactions[messageId] };
      const newReactionCounts = { ...messageReaction.reactionCounts };

      // Check if the current user has already reacted
      const currentUserReaction = Object.entries(newReactionCounts || {}).find(
        ([reactionEmoji, { userId }]) => userId === currentUserId
      );

      if (currentUserReaction) {
        const [currentEmoji] = currentUserReaction;

        // If the user selects the same emoji, remove the reaction
        if (currentEmoji === emoji) {
          try {
            const body = { emoji: `${emoji}` };
            deleteReactionApi(messageId, body);

            if (newReactionCounts[emoji].count > 1) {
              newReactionCounts[emoji].count -= 1;
            } else {
              delete newReactionCounts[emoji];
            }
          } catch (error) {
            console.log("Error while deleting emoji: ", error);
          }
        } else {
          // If the user selects a different emoji
          try {
            const deleteBody = { emoji: `${currentEmoji}` };
            deleteReactionApi(messageId, deleteBody);

            if (newReactionCounts[currentEmoji].count > 1) {
              newReactionCounts[currentEmoji].count -= 1;
            } else {
              delete newReactionCounts[currentEmoji];
            }

            const addBody = { emoji: `${emoji}` };
            addReactionApi(messageId, addBody);

            if (newReactionCounts[emoji]) {
              newReactionCounts[emoji].count += 1;
            } else {
              newReactionCounts[emoji] = {
                userId: currentUserId,
                count: 1,
              };
            }
          } catch (error) {
            console.log("Error while switching emoji: ", error);
          }
        }
      } else {
        // If the user has not reacted yet, just add the new emoji
        try {
          const addBody = { emoji: `${emoji}` };
          addReactionApi(messageId, addBody);

          if (newReactionCounts[emoji]) {
            newReactionCounts[emoji].count += 1;
          } else {
            newReactionCounts[emoji] = {
              userId: currentUserId,
              count: 1,
            };
          }
        } catch (error) {
          console.log("Error while adding emoji: ", error);
        }
      }

      return {
        ...prevReactions,
        [messageId]: {
          reactionCounts: newReactionCounts,
        },
      };
    });
  };

  return { messageReactions, handleEmojiSelect };
};
