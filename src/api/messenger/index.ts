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
  IUnreadCount,
  ISearchMessagesParams,
  IReportMessage,
  IViewDemo,
  ISendMessage,
  IToggleMessageRead,
  // ISendMessageReply,
  IGetThreadMessages,
  IDeleteMessage,
  IAddReaction,
  IDeleteReaction,
  IGetReactions,
  ICreateNewConversation,
  ISetConversationFavorite,
  IGetConversationMessages,
  IDeleteConversations,
  IGetConversationsWithUser,
  IToggleConversationIsOpen,
  IGetArchivedConversations,
  IToggleConversationIsArchived,
  IGetSpamConversations,
  IToggleConversationIsSpam,
  IToggleConversationIsPriority,
  ISetConversationMessagesToRead,
  IGetConversationFiles,
  IGetConversationNotes,
  IAddConversationNote,
  IDeleteConversationNote,
  IUpdateConversationNote
} from './objects/api.interfaces';
import { AxiosRequestConfig } from "axios";
import { IGetConversations } from "./hooks/useGetConversations";

export async function unreadCount() {
  return await axios.get('messenger/messages/unread');
}

export async function searchMessages(payload: ISearchMessagesParams) {
  return await axios.get('messenger/search/messages', { params: payload });
}

export async function reportMessage(payload: IReportMessage) {
  return await axios.post('messenger/report/message', payload);
}

export async function viewDemo(payload: IViewDemo) {
  return await axios.post('messenger/event/viewed-demo', payload);
}

export async function sendMessage(payload: ISendMessage) {
  return await axios.post('messenger/message', payload);
}

export async function toggleMessageRead(payload: IToggleMessageRead) {
  return await axios.post('messenger/message/toggle-read', payload);
}

// @TODO Use this when we update this in the backend
// export async function sendMessageReply(payload: ISendMessageReply) {
//   return await axios.post('messenger/message/reply', payload);
// }

export async function sendMessageReply(payload: {
  parentMessageId: number;
  replyContent: string;
}) {
  return axiosInstance.post("/messages/message/reply", payload);
}

export async function sendMessageReplyWithFormData(formData: FormData) {
  return axiosInstance.post("/messages/message/reply", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function getThreadMessages(payload: IGetThreadMessages) {
  return await axios.get(`messenger/thread/${payload.parentMessageId}`);
}

export async function deleteMessage(payload: IDeleteMessage) {
  return await axios.delete(`messenger/message/${payload.messageId}`);
}

export async function addReaction(payload: IAddReaction) {
  return await axios.post(`messenger/message/reactions/${payload.messageId}`, { emoji: payload.emoji });
}

export async function deleteReaction(payload: IDeleteReaction) {
  return await axios.delete(`messenger/message/reactions/${payload.messageId}`, { data: { emoji: payload.emoji } });
}

export async function createNewConversation(payload: ICreateNewConversation) {
  return await axios.post(`messenger/conversation`, payload);
}

export async function toggleConversationFavorite(payload: ISetConversationFavorite) {
  return await axios.post(`messenger/conversation/favorite`, payload);
}

export async function getConversationMessages(payload: IGetConversationMessages) {
  return await axios.get(`messenger/conversation/${payload.conversationId}`, { params: { skip: payload.skip, take: payload.take } });
}

export async function deleteConversationsApi(payload: IDeleteConversations) {
  return await axios.delete(`messenger/conversations`, { data: payload });
}

export async function getConversations(payload: IGetConversations) {
  return await axios.get(`messenger/conversations`, { params: payload });
}

export async function getConversationsWithUser(payload: IGetConversationsWithUser) {
  return await axios.get(`messenger/conversation/user/${payload.userId}`);
}

export async function toggleConversationIsOpen(payload: IToggleConversationIsOpen) {
  return await axios.post(`messenger/conversation/toggle-open`, payload);
}

export async function getArchivedConversations(payload: IGetArchivedConversations) {
  return await axios.get(`messenger/conversations/archived`, { params: payload });
}

export async function toggleConversationIsArchived(payload: IToggleConversationIsArchived) {
  return await axios.post(`messenger/conversations/toggle-archive`, payload);
}

export async function getSpamConversations(payload: IGetSpamConversations) {
  return await axios.get(`messenger/conversations/spam`, { params: payload });
}

export async function toggleConversationsIsSpam(payload: IToggleConversationIsSpam) {
  return await axios.post(`messenger/conversations/toggle-spam`, payload);
}

export async function toggleConversationsIsPriority(payload: IToggleConversationIsPriority) {
  return await axios.post(`messenger/conversations/toggle-priority`, payload);
}

export async function setConversationMessagesToRead(payload: ISetConversationMessagesToRead) {
  return await axios.post(`messenger/conversations/read`, payload);
}

export async function getConversationFiles(payload: IGetConversationFiles) {
  return await axios.post(`messenger/conversation/files`, payload);
}

export async function getConversationNotes(payload: IGetConversationNotes) {
  return await axios.get(`messenger/notes`, { params: payload });
}

export async function addConversationNote(payload: IAddConversationNote) {
  return await axios.post(`messenger/notes`, payload);
}

export async function deleteConversationNote(payload: IDeleteConversationNote) {
  return await axios.delete(`messenger/notes/${payload.noteId}`);
}

export async function updateConversationNote(payload: IUpdateConversationNote) {
  return await axios.put(`messenger/notes/${payload.noteId}`, { content: payload.content });
}

