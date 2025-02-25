export type ISendInboxMessagePayloads =
  | {
      senderId: number;
      recipientId: number;
      conversationId: number;
      message: string;
      creditPaymentAmount: number;
      isDemo: boolean;
      audioMediaId: number;
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
  conversationId: number;
  noteContent: string;
}

export interface IDeleteNoteApiParams {
  noteId: string;
}

export interface IUpdateNoteApiParams {
  noteId: number;
  content: string;
}

export interface IGetConversationByIdParams {
  limit: number;
}

export interface IGetConversationNotesParams {
  conversationId: number;
  ascending: boolean;
}

export interface IGetConversationsListParams {
  searchTerm: string;
  ascending: boolean;
  skip: number;
  take: number;
  afterDate: Date;
  sortByTime: boolean;
  hasActiveIcebreaker: boolean;
}

export interface IDeleteConversationsPayload {
  conversationIds: number[];
}

export interface IMarkConvoReadPayload {
  conversationId: number;
}

export interface IToggleSpamConvoPayload {
  conversationIds: number[];
}

export interface IToggleArchiveConvoPayload {
  conversationIds: number[];
}

export interface IToggleConvoPriorityPayload {
  conversationIds: number[];
}

export interface IToggleFavoriteCovoPayload {
  conversationId: number;
}

export interface IAddReactionPayload {
  emoji: string;
}

export interface IDeleteReactionPayload {
  emoji: string;
}
