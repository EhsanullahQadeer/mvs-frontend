import React from "react";

type Props = {};

const NotesSection = (props: Props) => {
  return (
    <div className="flex flex-col p-4 max-w-[100%]">
      <textarea
        placeholder="Type a note..."
        className="bg-transparent resize-none overflow-hidden gap-2.5 px-5 pt-3 pb-16 w-full text-xs leading-none rounded-xl border border-solid border-neutral-800 min-h-[90px] text-neutral-700"
      />

      <div className="flex flex-col justify-center items-end mt-3 w-full text-sm leading-none text-center whitespace-nowrap text-stone-950">
        <div className="gap-2 self-stretch px-4 py-2 bg-lime-400 rounded-lg">
          Save
        </div>
      </div>

      <div className="mt-5 gap-2.5 self-stretch py-4 text-base leading-none border-b border-solid border-b-neutral-700 text-neutral-200">
        History of notes
      </div>

      <div className="flex flex-col text-sm w-[100%] mt-5">
        <div className="flex gap-1 items-start self-start leading-none">
          <div className="flex-1 shrink gap-2.5 self-stretch px-3.5 py-2.5 border border-solid bg-zinc-800 border-neutral-700 rounded-[50px] text-neutral-400 w-[300px]">
            03:37 PM | 05/31/2024
          </div>
          <div className="gap-2.5 self-stretch p-2.5 font-semibold text-blue-400 whitespace-nowrap">
            Edit
          </div>
        </div>
        <div className="flex-1 shrink gap-2.5 self-stretch px-3.5 py-2.5 mt-2 w-full leading-4 rounded-lg border border-solid border-neutral-700 text-neutral-400">
          Joshua is a really dope producer for r&B, he mainly plays guitar and
          its very good at finger arpegios.
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
