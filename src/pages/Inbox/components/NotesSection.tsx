import { addNoteApi, deleteNoteApi } from "api/messenger";
import moment from "moment";
import React, { useState } from "react";
import { INotes } from "./types";
type Props = {
  notes: INotes[];
  conversation_id: string;
  getNotes: (conversation_id: string) => void;
  setOverlayLoading: (value: boolean) => void;
};

const NotesSection = (props: Props) => {
  const { notes, conversation_id, getNotes, setOverlayLoading } = props;
  const [noteText, setNoteText] = useState("");
  const addNewNote = async () => {
    const params = {
      conversation_id,
      note_content: noteText,
    };
    setOverlayLoading(true);
    await addNoteApi(params);
    setNoteText("");
    await getNotes(conversation_id);
    setOverlayLoading(false);
  };

  const handleDeleteNote = async (noteId: any) => {
    const params = {
      noteId,
    };
    setOverlayLoading(true);
    await deleteNoteApi(params);
    await getNotes(conversation_id);
    setOverlayLoading(false);
  };
  return (
    <div className="flex flex-col p-4 max-w-[100%]">
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
        {notes.length ? (
          notes.map((noteData) => {
            const { updated_at, note, id } = noteData;
            const formattedTime = moment(updated_at).format("h:mm A");
            const formattedDate = moment(updated_at).format("MM/DD/YYYY");
            return (
              <div key={id} className="flex flex-col">
                <div className="flex gap-3 items-center self-start leading-none">
                  <div className="flex-1 shrink gap-2.5 self-stretch px-3.5 py-2.5 border border-solid bg-zinc-800 border-neutral-700 rounded-[50px] text-neutral-400 w-[300px]">
                    {formattedTime} | {formattedDate}
                  </div>
                  <div className="font-semibold text-blue-400 whitespace-nowrap cursor-pointer">
                    Edit
                  </div>

                  <div
                    onClick={() => handleDeleteNote(id)}
                    className="font-semibold text-darkRed whitespace-nowrap cursor-pointer"
                  >
                    Delete
                  </div>
                </div>
                <div className="flex-1 shrink gap-2.5 self-stretch px-3.5 py-2.5 mt-2 w-full leading-4 rounded-lg border border-solid border-neutral-700 text-neutral-400">
                  {note}
                </div>
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
