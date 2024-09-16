/*************************************************************************
 * @file index.ts
 * @author End Quote
 * @desc API functions for messenger related functions.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */

/* LOCAL IMPORTS */
import axiosInstance from "api/axios";
import axios from "api/axios";
import { config } from "config/ConfigManager";

export const sendMessage = async ({
  // General info
  senderUserId,
  recipientUserId,
  conversationId,
  message,
  // Demo track
  fileURL,
  paymentIntentId,
  clientSecret,
  paymentProcessed,
  // Accept transaction
  audioURL,
}) => {
  await axios.post(`${config.get("API")}/messenger/send-message`, {
    // General information
    senderUserId: senderUserId,
    recipientUserId: recipientUserId,
    conversationId: conversationId,
    messageContent: message,
    // Content
    fileURL: fileURL,
    paymentIntentId: paymentIntentId,
    clientSecret: clientSecret,
    paymentProcessed: paymentProcessed,
    // Partner Content
    audioURL: audioURL,
  });
};

export const getUserConvo = async (userId: string) => {
  try {
    const response = await axios.get(
      `${config.get("API")}/messenger/conversations`,
      {
        params: {
          userId,
        },
      }
    );
    return response.data.conversations || [];
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};

export const getMessages = async (conversationId: string) => {
  try {
    // Get messages
    const response = await axios.get(
      `${config.get("API")}/messenger/conversation/${conversationId}`
    );
    return response.data.messages || [];
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export const fetchConversationId = async (currentUserId, otherUserId) => {
  try {
    const response = await axios.get(
      `${config.get(
        "API"
      )}/messenger/conversations/fetchConversationID/${currentUserId}/${otherUserId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching conversation ID:", error);
    return null;
  }
};

export const checkConversationExists = async (
  UserId: string,
  OtherUserId: string
) => {
  const response = await axios.get("/messenger/check-conversation-exists", {
    params: {
      UserId: UserId,
      OtherUserId: OtherUserId,
    },
  });
};

export const getInboxMessages = async (params: any) => {
  return axiosInstance.get(`/messenger/get-conversations/`, { params });
};

export async function getConversationsById(params: any, id: string) {
  return axiosInstance.get(`/messenger/conversation/${id}`, { params });
}

export async function sendInboxMessage(params: any) {
  return axiosInstance.post("/messenger/send-message", params);
}
