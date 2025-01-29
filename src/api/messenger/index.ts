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
import {
  IAddNoteApiPayloads,
  IAddReactionPayload,
  IDeleteConversationsPayload,
  IDeleteNoteApiParams,
  IDeleteReactionPayload,
  IGetConversationByIdParams,
  IGetConversationNotesParams,
  IGetConversationsListParams,
  IMarkConvoReadPayload,
  IReplyToMessagePayloads,
  ISendInboxMessagePayloads,
  IToggleArchiveConvoPayload,
  IToggleConvoPriorityPayload,
  IToggleFavoriteCovoPayload,
  IToggleMessageToReadPayloads,
  IToggleSpamConvoPayload,
  IUpdateNoteApiParams,
} from "./types";
import { AxiosRequestConfig } from "axios";

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
  await axios.post(`/messenger/send-message`, {
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
    const response = await axios.get(`/messenger/conversations`, {
      params: {
        userId,
      },
    });
    return response.data.conversations || [];
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};

export const getMessages = async (conversationId: string) => {
  try {
    const response = await axios.get(
      `/messenger/conversation/${conversationId}`
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
      `/messenger/conversations/fetchConversationID/${currentUserId}/${otherUserId}`
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

export const getConversationsList = async (
  params: IGetConversationsListParams
) => {
  return axiosInstance.get(`/messenger/get-conversations/`, { params });
};

export const getConversationWithUser = async (recipient_id: number) => {
  return axiosInstance.get(`/messenger/get-conversation-with-user`, {
    params: {
      recipient_id,
    },
  });
};

export async function getConversationsById(
  params: IGetConversationByIdParams,
  id: number
) {
  return axiosInstance.get(`/messenger/conversation/${id}`, { params });
}

export async function getConversationNotes(
  params: IGetConversationNotesParams
) {
  return axiosInstance.get(`/messenger/get-conversation-notes`, {
    params,
  });
}

export async function sendInboxMessage(payload: any) {
  return axiosInstance.post("/messenger/send-message", payload);
}

export async function replyToMessage(payload: IReplyToMessagePayloads) {
  return axiosInstance.post("/messenger/reply-to-message", payload);
}

export async function toggleMessageToRead(
  payload: IToggleMessageToReadPayloads
) {
  return axiosInstance.post("/messenger/toggle-message-is-read", payload);
}

export async function addNoteApi(params: IAddNoteApiPayloads) {
  return axiosInstance.post(
    "/messenger/add-note",
    {},
    {
      params,
    }
  );
}

export async function updateNoteApi(params: IUpdateNoteApiParams) {
  return axiosInstance.post("/messenger/update-note", {}, { params });
}

export async function deleteNoteApi(params: IDeleteNoteApiParams) {
  return axiosInstance.post(
    "/messenger/delete-note",
    {},
    {
      params,
    }
  );
}

export async function markConvoReadApi(payload: IMarkConvoReadPayload) {
  return axiosInstance.post("/messenger/mark-conversation-read", payload);
}

export async function toggleSpamConvoApi(payload: IToggleSpamConvoPayload) {
  return axiosInstance.post("/messenger/toggle-spam-conversation", payload);
}

export async function toggleArchiveConvoApi(
  payload: IToggleArchiveConvoPayload
) {
  return axiosInstance.post("/messenger/archive-conversation", payload);
}

export async function toggleConvoPriorityApi(
  payload: IToggleConvoPriorityPayload
) {
  return axiosInstance.post("/messenger/toggle-conversation-priority", payload);
}

export async function toggleFavoriteCovoApi(
  payload: IToggleFavoriteCovoPayload
) {
  return axiosInstance.post("/messenger/mark-conv-favorite", payload);
}

export async function deleteConversationsApi(
  payload: IDeleteConversationsPayload
) {
  return axiosInstance.delete("/messenger/delete-conversations", {
    data: payload,
  });
}

export async function addReactionApi(
  messageId: number,
  payload: IAddReactionPayload
) {
  return axiosInstance.post(
    `/messenger/message/${messageId}/reaction`,
    payload
  );
}

export async function deleteReactionApi(
  messageId: number,
  payload: IDeleteReactionPayload
) {
  return axiosInstance.delete(`/messenger/message/${messageId}/reaction`, {
    data: payload,
  });
}

export async function getMessageReactionsApi(messageId: number) {
  return axiosInstance.get(`/messenger/message/${messageId}/reactions`);
}

export async function markConversationAsRead(conversationId: number) {
  return axiosInstance.post('/messenger/mark-conversation-read', {
    conversationId
  });
}

export const getConversationFilesInfo = (conversationId: number, skip: number, take: number) => 
  axios.get(`/messenger/conversation/${conversationId}/files`, { params: { skip, take } });

export const deleteMessageApi = async (messageId: number) => {
  return axiosInstance.delete(`/messenger/message/${messageId}`, { data: { messageId } });
}

export const getThreadMessages = async (messageId: number) => {
  return axiosInstance.get(`/messenger/thread/${messageId}/`);
}
