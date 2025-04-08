/*************************************************************************
 * @file considering.tsx
 * @author Zohaib Ahmed
 * @desc Modal component to display users considering a sample download.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import Modal from "react-modal";
import { getSampleConsidering } from "api/sounds";
import React, { useEffect, useState } from "react";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/notificationThumbnail";

interface ConsideringModalProps {
  considering: boolean;
  setConsidering: (value: boolean) => void;
  sampleId?: number;
}

const ConsideringModal: React.FC<ConsideringModalProps> = ({ 
  considering, 
  setConsidering,
  sampleId 
}) => {
  const [consideringList, setConsideringList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConsideringData = async () => {
      if (!sampleId) return;
      
      console.log('Fetching considering data for sample:', sampleId);
      setLoading(true);
      try {
        const response = await getSampleConsidering(sampleId);
        console.log('Considering data response:', response);
        setConsideringList(response.data);
      } catch (error) {
        console.error('Error fetching considering data:', error);
        setConsideringList([]);
      } finally {
        setLoading(false);
      }
    };

    if (considering && sampleId) {
      fetchConsideringData();
    }
  }, [considering, sampleId]);

  //console.log('Modal props:', { considering, sampleId, loading, consideringList });

  return (
    <Modal
      ariaHideApp={false}
      className="bg-transparent"
      isOpen={considering}
      onRequestClose={() => setConsidering(false)}
      style={{
        overlay: {
          zIndex: 1000,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 1,
          backgroundColor: "rgba(0, 0, 0, .3)",
          backdropFilter: "blur(12px)",
          overflow: "hidden",
        },
      }}
    >
      <div className="z-modal animate-fade-in fixed left-0 top-0 flex flex-col items-stretch w-full h-screen overflow-y-auto">
        <div className="flex flex-grow items-center justify-center py-4 w-full">
          <div
            role="dialog"
            tabIndex={-1}
            data-ismodal="true"
            className="focus:outline-none"
            style={{ width: 800 }}
          >
            <div className="rounded-4xl relative py-8 px-8 ml-[80px]">
              <div className="flex flex-col justify-center px-10 py-9 rounded-lg border border-solid shadow bg-zinc-900 border-zinc-800 max-w-[565px] max-md:px-5">
                <button
                  onClick={() => setConsidering(false)}
                  className="cursor-pointer flex justify-center items-center self-end px-1 w-6 h-6 bg-neutral-200 rounded-[29px]"
                >
                  <span className="text-black">&times;</span>
                </button>

                <div className="mt-1 text-xl font-semibold text-zinc-100 max-md:max-w-full font-['Mona-Sans-M']">
                  Spark Creativity, Claim Exclusivity 🧑‍🎨
                </div>
                
                {/* <div className="mt-4 text-sm italic leading-6 text-justify text-stone-300 max-md:max-w-full font-['Mona-Sans-M']">
                  This platform isn't just about finding amazing samples – it's about pushing boundaries. 
                  See exactly who else in our exclusive producer network is using the same sounds you're drawn to. 
                  This offers a glimpse into current trends or sparks a chance for a unique collaboration.
                  <br /><br />
                  We want to empower your creative vision. Whoever requests a{" "}
                  <span className="italic font-semibold">Split-Agreement</span> or{" "}
                  <span className="italic font-semibold">Master-Agreement</span>{" "}
                  first for a particular <span className="italic font-semibold">sample</span> or{" "}
                  <span className="italic font-semibold">instrumental</span> gets to claim it exclusively 
                  for their track.
                </div> */}

                <div className="self-start mt-3.5 ml-2.5 text-base font-semibold text-white font-['Mona-Sans-M']">
                  Who is currently considering:
                </div>

                <div className="flex flex-col px-2.5 pt-2.5 mt-3.5 text-xs text-white rounded-lg border border-solid bg-neutral-900 border-neutral-800 max-md:max-w-full">
                  <div className="max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    {loading ? (
                      <div className="py-4 text-center">Loading...</div>
                    ) : consideringList.length > 0 ? (
                      consideringList.map((person: any, index: number) => (
                        <div key={index} className="flex gap-2 py-2.5 border-b border-solid border-stone-900 last:border-b-0">
                          <Thumbnail professionalName={person.user.professional_name} thumbnail={person.user.thumbnail} size="30" userId={person.user.id}/>
                          <div className="my-auto">{person.user.professional_name}</div>
                        </div>
                      ))
                    ) : (
                      <div className="py-4 text-center">No one is considering this sample yet</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConsideringModal;
