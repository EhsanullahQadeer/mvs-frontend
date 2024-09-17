export interface ISendInboxMessagePayloads {
  recipient_id: string;
  conversation_id: string;
  message: string;
}

export interface IAddNoteApiPayloads {
  note: string;
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
  order: boolean;
}

export interface IGetConversationsListParams {
  searchTerm: string;
  order: boolean;
  skip: number;
  take: number;
  limit: number;
}
