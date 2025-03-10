export interface IUnreadCount extends Record<string, never> {}

export interface ISearchMessagesParams {
  searchTerm: string;
  skip?: number | null;
  take?: number | null;
}

export interface IReportMessage {
  messageId: number;
  reason: string;
  description?: string | null;
}

export interface IViewDemo {
  recipientId: number;
  audioMediaId: number;
}


export interface ISendMessage {
  conversationId: string;
  message: string;
  messageType: string;
  audioMediaId?: number | null;
  creditPaymentAmount?: number | null;
  stripePaymentIntentId?: string | null;
}


export interface IToggleMessageRead {
  messageId: number;
}

export interface IGetThreadMessages {
  parentMessageId: number;
}

export interface IDeleteMessage {
  messageId: number;
}

export interface IAddReaction {
  messageId: number;
  emoji: string;
}

export interface IDeleteReaction {
  messageId: number;
  emoji: string;
}

export interface IGetReactions {
  messageId: number;
}

export interface ICreateNewConversation {
  recipientId: number;
}

export interface ISetConversationFavorite {
  conversationId: string;
}

export interface IGetConversationMessages {
  conversationId: string;
  skip?: number | null;
  take?: number | null;
}

export interface IDeleteConversations {
  conversationIds: number[];
}

export interface IGetConversationsWithUser {
  userId: number;
}

export interface IToggleConversationIsOpen {
  conversationId: string;
}

export interface IGetArchivedConversations {
  skip?: number | null;
  take?: number | null;
}

export interface IToggleConversationIsArchived {
  conversationIds: number[];
}

export interface IGetSpamConversations {
  skip?: number | null;
  take?: number | null;
}

export interface IToggleConversationIsSpam {
  conversationIds: number[];
}

export interface IToggleConversationIsPriority {
  conversationIds: number[];
}

export interface ISetConversationMessagesToRead {
  conversationId: string;
}

export interface IGetConversationFiles {
  conversationId: string;
  skip?: number | null;
  take?: number | null;
}

export interface IAddConversationNote {
  conversationId: number;
  noteContent: string;
}

export interface IDeleteConversationNote {
  noteId: number;
}

export interface IGetConversationNotes {
  conversationId: number;
  ascending: boolean;
}

export interface IUpdateConversationNote {
  noteId: number;
  content: string;
}