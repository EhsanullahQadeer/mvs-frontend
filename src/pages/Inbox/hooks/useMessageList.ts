import { getConversationsList } from "api/messenger";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

const useMessageList = () => {
  const user = useSelector((state: RootState) => state);
  const currentUserInfo = user.auth.user;

  const [loadingConversations, setLoadingConversations] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [archivedConversations, setArchivedConversations] = useState([]);
  const [favoriteConversations, setFavoriteConversations] = useState([]);

  const getConversationList = async () => {
    try {
      setLoadingConversations(true);

      const response = await getConversationsList({
        searchTerm: "",
        order: true,
        skip: 0,
        take: 20,
        limit: 20,
      });
      const allConversations = response.data.conversations.filter((convo) => {
        const isUserA = currentUserInfo?.id === convo.user_a.id;
        return isUserA ? convo.has_deleted_a === null : convo.has_deleted_b === null;
      });
      const archived = allConversations.filter((convo) => convo.is_archived);
      const active = allConversations.filter((convo) => !convo.is_archived);
      const favorite = allConversations.filter((convo) => {
        const isFavorite =
          currentUserInfo?.id === convo.user_a.id
            ? convo.favorite_a
            : convo.favorite_b;
        return isFavorite;
      });

      setConversations(active);
      setArchivedConversations(archived);
      setFavoriteConversations(favorite);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingConversations(false);
    }
  };

  return {
    loadingConversations,
    conversations,
    archivedConversations,
    getConversationList,
    favoriteConversations,
    setConversations,
  };
};

export default useMessageList;
