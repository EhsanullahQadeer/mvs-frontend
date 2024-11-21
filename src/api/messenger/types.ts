export type ISendInboxMessagePayloads =
  | {
      senderId: number;
      recipientId: number;
      conversationId: number;
      message: string;
      creditPaymentAmount: number;
      isDemo: boolean;
      audioFile: any;
    }
  | FormData;

export type IReplyToMessagePayloads =
  | {
      senderId: number;
      recipientId: number;
      messageId: number;
      replyContent: string;
      isDemoReply: boolean;
      audioFile: any;
    }
  | FormData;

export interface IToggleMessageToReadPayloads {
  messageId: number;
}

export interface IAddNoteApiPayloads {
  conversation_id: string;
  note_content: string;
}

export interface IDeleteNoteApiParams {
  noteId: string;
}

export interface IUpdateNoteApiParams {
  note_id: string;
  new_content: string;
}

export interface IGetConversationByIdParams {
  limit: number;
}

export interface IGetConversationNotesParams {
  conversation_id: string;
  ascending: boolean;
}

export interface IGetConversationsListParams {
  searchTerm: string;
  order: boolean;
  skip: number;
  take: number;
  limit: number;
}
