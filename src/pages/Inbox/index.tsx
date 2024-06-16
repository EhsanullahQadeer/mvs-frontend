import { useEffect, useState } from "react";
import Theme from "theme";
import { fetchCurrentUser } from "redux/actionCreators/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers/combine";
import axios from "util/axios";
import config from "config/config";

const InboxPage = () => {
  const dispatch = useDispatch();
  const [conversationsList, setConversationsList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const state = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (state.auth.user && state.auth.user.UserId) {
      const fetchConversations = async () => {
        try {
          const conversations = await getUserConvo(state.auth.user.UserId);
          setConversationsList(conversations);
        } catch (error) {
          console.error('Error fetching conversations:', error);
        }
      };

      fetchConversations();
    }
  }, [state.auth.user]);

  const getUserConvo = async (userId) => {
    try {
      const response = await axios.get(`${config.defaults.api_url}/messenger/conversations`, {
        params: { userId }
      });
      console.log('API response:', response.data); // Debugging: Log API response

      let conversations = response.data.conversations || []; // Ensure conversations are returned as an array

      // Sort conversations by latestMessage.Timestamp in descending order
      conversations = conversations.sort((a, b) => b.latestMessage.Timestamp - a.latestMessage.Timestamp);


      return conversations;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
  };

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    console.log('conversation.messages', conversation.messages);
    setMessages(conversation.messages || []);
  };

  const handleCloseConversation = () => {
    setSelectedConversation(null);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    // Send the message to the backend
    try {
      await axios.post(`${config.defaults.api_url}/messenger/conversations`, {
        conversationId: selectedConversation.ConversationId,
        userId: state.auth.user.UserId,
        message: newMessage,
      });
      // After sending the message, clear the input box and refresh messages
      setNewMessage("");
      handleConversationClick(selectedConversation);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessages = () => {
    console.log('messages', messages);
    if (!messages.length) return null;

    const renderedMessages = [];
    let lastDate = null;

    messages.forEach((message, index) => {
      const messageDate = new Date(message.Timestamp).toLocaleDateString();

      if (messageDate !== lastDate) {
        renderedMessages.push(
          <div key={`date-${index}`} className="message-date-line">
            {messageDate}
          </div>
        );
        lastDate = messageDate;
      }

      console.log('message', message);
      renderedMessages.push(
        <div key={index} className={`chat-message ${message.UserId === state.auth.user.UserId ? 'right' : 'left'}`}>
          <div className="message-bubble">
            {message.MessageContent}
          </div>
          <div className="message-timestamp">
            {new Date(message.Timestamp).toLocaleTimeString()}
          </div>
        </div>
      );
    });

    return renderedMessages;
  };

  return (
    <Theme>
      <style>{`
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            display: flex;
        }
  
        .container {
            display: flex;
            width: 100%;
            height: 100vh;
        }
  
        .main-content {
            display: flex;
            flex: 1;
            background-color: #121212;
        }
  
        .messages-list {
            flex: ${selectedConversation ? '0 0 60%' : '1'};
            overflow-y: auto;
            width: 10px;
            border-right: 1px solid #333;
            padding: 20px;
            transition: flex 0.3s ease;
        }
  
        .message-item {
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #333;
            cursor: pointer;
            color: #fff;
        }
  
        .message-item:hover {
            background-color: #333;
        }
  
        .message-checkbox {
            margin-right: 10px;
        }
  
        .message-avatar {
            width: 40px;
            height: 40px;
            background-color: #444;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
        }
  
        .message-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
  
        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }
  
        .message-name {
            font-weight: bold;
        }
  
        .message-date {
            color: #aaa;
            font-size: 0.9em;
        }
  
        .message-priority {
            background-color: #ff0000;
            color: #fff;
            padding: 2px 5px;
            border-radius: 5px;
            font-size: 0.8em;
        }
  
        .message-text {
            margin-top: 5px;
            color: #ccc;
        }
  
        .message-amount {
            color: #33ff33;
            margin-left: 10px;
        }
  
        .message-details {
            flex: 1;
            padding: 20px;
            background-color: #1e1e1e;
            color: #fff;
            transition: transform 0.3s ease;
            overflow-y: auto;
            height: 100%;
            width: 100%;
            position: relative;
        }
  
        .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: #fff;
            font-size: 1.5em;
            cursor: pointer;
        }
  
        .chat-message {
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
        }
  
        .chat-message .message-bubble {
            max-width: 60%;
            padding: 10px;
            border-radius: 10px;
            color: #fff;
        }
  
        .chat-message.left .message-bubble {
            background-color: #333;
            align-self: flex-start;
        }
  
        .chat-message.right .message-bubble {
            background-color: #1e90ff;
            align-self: flex-end;
        }
  
        .message-timestamp {
            font-size: 0.8em;
            color: #aaa;
            margin-top: 5px;
        }
  
        .message-input {
            display: flex;
            align-items: center;
            padding: 10px;
            border-top: 1px solid #333;
            background-color: #1e1e1e;
        }
  
        .message-input input {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 5px;
            margin-right: 10px;
        }
  
        .message-input button {
            padding: 10px 20px;
            background-color: #33ff33;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
  
        .message-date-line {
            text-align: center;
            color: #aaa;
            margin: 10px 0;
        }
      `}</style>
      <div className="container">
        <main className="main-content">
          <div className="messages-list">
            {conversationsList.map((conversation, index) => (
              <div
                className="message-item"
                key={index}
                onClick={() => handleConversationClick(conversation)}
              >
                <input type="checkbox" className="message-checkbox" />
                <div className="message-avatar">{conversation.otherUserId.charAt(0).toUpperCase()}</div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-name">{conversation.otherUserId}</span>
                    <span className="message-amount">$34.99</span>
                    <span className="message-date">{new Date(conversation.latestMessage.Timestamp).toLocaleString()}</span>
                    <span className="message-priority">Priority</span>
                  </div>
                  <div className="message-text">{conversation.latestMessage.MessageContent}</div>
                </div>
              </div>
            ))}
          </div>
          {selectedConversation && (
            <div className="message-details">
              <button className="close-button" onClick={handleCloseConversation}>×</button>
              <h2>Conversation with {selectedConversation.otherUserId}</h2>
              <div className="chat">
                {renderMessages()}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </Theme>
  );
};

export default InboxPage;
