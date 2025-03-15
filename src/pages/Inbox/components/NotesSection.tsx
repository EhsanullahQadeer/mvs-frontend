import moment from "moment";
import { useState } from "react";
import { INotes } from "./types";
import { useMessenger } from "api/messenger/context";
import { useChatbox } from "pages/Inbox/components/Chatbox/context";
import { useAddConversationNote } from "api/messenger/hooks/useAddConversationNote";
import { useGetConversationNotes } from "api/messenger/hooks/useGetConversationNotes";
const NotesSection = () => {

  const { 
    activeConversation,
    conversationNotes,
    getConversationNotes,
    addConversationNote,
    deleteConversationNote,
    updateConversationNote
  } = useMessenger();


  const [noteText, setNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editedNote, setEditedNote] = useState<string>("");

  const fetchNotes = async () => {
    await getConversationNotes({ conversationId: activeConversation?.id, ascending: true });
  };

  const addNewNote = async () => {
    if (!noteText.trim()) {
      return;
    }
    const params = {
      conversationId: activeConversation.id,
      noteContent: noteText,
    };
    console.log(params);
    //setOverlayLoading(true);
    await addConversationNote(params);
    setNoteText("");
    await fetchNotes();
    //setOverlayLoading(false);
  };

  const handleDeleteNote = async (noteId: any) => {
    const params = {
      noteId: noteId,
    };
    //setOverlayLoading(true);
    await deleteConversationNote(params);
    await fetchNotes();
    //setOverlayLoading(false);
  };

  const handleEditNote = (noteId: number, currentNote: string) => {
    setEditingNoteId(noteId);
    setEditedNote(currentNote);
  };

  const handleSaveNote = async (noteId: number) => {
    if (!editedNote.trim()) {
      return;
    }
    const params = {
      noteId: noteId,
      content: editedNote,
    };
    console.log("params", params);
    //setOverlayLoading(true);
    await updateConversationNote(params);
    await fetchNotes();
    //setOverlayLoading(false);
    setEditingNoteId(null);
  };

  return (
    <div className="flex flex-col py-4 px-8 max-w-[100%]">
      {/* Content */}
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Type a note..."
        className="bg-transparent resize-none overflow-hidden gap-2.5 px-5 pt-3 pb-16 w-full text-xs leading-none rounded-xl border border-solid border-neutral-800 min-h-[90px] text-neutral-700"
      />

      <div className="flex flex-col justify-center items-end mt-3 w-full text-sm leading-none text-center whitespace-nowrap text-stone-950">
        <div
          onClick={addNewNote}
          className="gap-2 self-stretch px-4 py-2 bg-lime-400 rounded-lg cursor-pointer"
        >
          Save
        </div>
      </div>

      <div className="mt-5 gap-2.5 self-stretch py-4 text-base leading-none border-b border-solid border-b-neutral-700 text-neutral-200">
        History of notes
      </div>

      <div className="flex flex-col text-sm w-[100%] mt-5 gap-5">
        {conversationNotes.length ? (
          conversationNotes.map((noteData) => {
            const { content, created_at, updated_at, id } = noteData;
            const formattedTime = moment(updated_at).format("h:mm A");
            const formattedDate = moment(updated_at).format("MM/DD/YYYY");

            const isEditing = editingNoteId === id;
            return (
              <div key={id} className="flex flex-col">
                <div className="flex gap-3 items-center self-start leading-none">
                  <div className="flex-1 shrink gap-2.5 self-stretch px-3.5 py-2.5 border border-solid bg-zinc-800 border-neutral-700 rounded-[50px] text-neutral-400 w-[300px]">
                    {formattedTime} | {formattedDate}
                  </div>

                  <div
                    onClick={() =>
                      !isEditing ? handleEditNote(id, content) : handleSaveNote(id)
                    }
                    className="font-semibold text-blue-400 whitespace-nowrap cursor-pointer"
                  >
                    {!isEditing ? "Edit" : "Save"}
                  </div>

                  <div
                    onClick={() => {
                      handleDeleteNote(id);
                    }}
                    className="font-semibold text-darkRed whitespace-nowrap cursor-pointer"
                  >
                    Delete
                  </div>
                </div>

                <input
                  value={isEditing ? editedNote : content}
                  onChange={(e) => isEditing && setEditedNote(e.target.value)}
                  readOnly={!isEditing}
                  autoFocus={isEditing}
                  className={`bg-transparent overflow-hidden gap-2.5 px-3.5 py-2.5 mt-2 w-full leading-4 text-xs rounded-lg border border-solid border-neutral-700 text-neutral-400`}
                />
              </div>
            );
          })
        ) : (
          <div className="text-neutral-500">No notes available.</div>
        )}
      </div>
    </div>
  );
};

export default NotesSection;
