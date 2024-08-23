/*************************************************************************
 * @file index.ts
 * @author Zohaib Ahmad
 * @desc Inbox API's
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import axiosInstance from '../axios';

export async function getConversationsById(params: any,id:string) {
  return axiosInstance.get(`/messenger/conversation/${id}`, { params });
}

export async function sendMessage(params: any) {
  return axiosInstance.post('/messenger/send-message', params);
}

export async function markMessageIsRead(params: any) {
  return axiosInstance.post('/messenger/send-message', params);
}

