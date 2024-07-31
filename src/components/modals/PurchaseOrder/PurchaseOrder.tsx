/* eslint-disable @typescript-eslint/no-unused-vars */


import Modal from "react-modal";
import usePurchaseOrderModalHooks from "./PurchaseOrder.hooks";

const PurchaseOrderModal = ({
  show,
  recipientId,
}) => {

  /* States and Hooks */
  const {
    modalIsOpen, closeModal,
    user
  } = usePurchaseOrderModalHooks( recipientId );

  return(
    <Modal
    isOpen={show}
    onRequestClose={closeModal}
    contentLabel="Send Demo Track Modal"
    className="modal-overlay"
    overlayClassName="your-custom-overlay-class"
    shouldCloseOnOverlayClick={true}
    >
    <div className="w-[548px] h-[756px] p-6 bg-neutral-900 rounded-xl border border-gray-500/opacity-50 flex-col justify-start items-center gap-2.5 inline-flex">

      {/* Title */}
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="py-1 justify-center items-center flex">
          <div className="text-stone-300 text-xl font-semibold font-['Mona Sans'] leading-normal">
            Purchase Order
          </div>
        </div>
        <div className="w-6 h-6 relative">
          <div className="w-6 h-6 left-0 top-0 absolute bg-zinc-800 rounded-full" />
          <div className="w-5 h-5 p-1.5 left-[2px] top-[2px] absolute justify-start items-start gap-2.5 inline-flex" />
        </div>
      </div>

      {/* User's basic information */}
      <div className="self-stretch justify-start items-center gap-2 inline-flex">
        <div className="justify-start items-center gap-2 flex">
          <div className="justify-start items-start gap-2.5 flex">
            <img className="w-9 h-9 rounded-full" src={user?.Thumbnail} />
          </div>

          {/* User Info */}
          <div className="flex-col justify-center items-start inline-flex">
            <div className="w-[100px] text-white text-sm font-bold font-['Mona Sans']">
              {user?.profileFirstName} {user?.profileLastName}
            </div>
            <div className="w-[100px] text-zinc-400 text-xs font-normal font-['Mona Sans']">
              Los Angeles, CA
            </div>
          </div>
        </div>
      </div>

      {/* Modal description */}
      <div className="self-stretch h-[26px] flex-col justify-center items-start gap-2 flex">
        <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
          <div className="grow shrink basis-0 text-zinc-400 text-xs font-normal font-['Mona Sans']">You are about to pay the Partner's fee to unlock their inbox. This transaction allows you to submit one audio demo for the Partner to review.</div>
        </div>
      </div>


      <div className="self-stretch h-5 p-2.5 flex-col justify-start items-start gap-2.5 flex">
        <div className="self-stretch h-[0px] border border-neutral-700"></div>
      </div>


      <div className="self-stretch h-[546px] flex-col justify-center flex">
        <div className="self-stretch h-[132px] flex-col justify-center items-start gap-3 flex">
          <div className="self-stretch py-1 justify-between items-center inline-flex">
            <div className="w-5 h-5 p-[1.67px] justify-center items-center flex" />
          </div>
          <div className="self-stretch h-[9px] flex-col justify-center items-start gap-2 flex">
            <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
              <div className="grow shrink basis-0">
                <span style={{ color: '#D1D1D1', fontSize: '12px', fontWeight: '400', fontFamily: 'Mona Sans' }}>Messages with tips are prioritized in the recipient's inbox.</span></div>
            </div>
          </div>
        </div>

        <div className="self-stretch justify-start items-center gap-4 inline-flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">

<div className="h-[23px] justify-center items-center gap-2.5 inline-flex">
  <div className="text-zinc-400 text-xs font-normal font-['Mona Sans'] leading-[17px]">Tip Amount</div>
</div>

<div className="self-stretch p-3 bg-zinc-900 rounded-lg border border-zinc-800 justify-start items-center gap-2.5 inline-flex">
  <input 
    type="text" 
    placeholder="0.00" 
    className="grow shrink basis-0 text-neutral-700 text-sm font-normal font-['Mona Sans'] bg-transparent border-none outline-none"
    onInput={(e) => {
      const input = e.target as HTMLInputElement;
      input.value = input.value.replace(/[^0-9.]/g, '');
    }}
  />
  <div className="text-neutral-700 text-sm font-medium font-['Mona Sans']">USD</div>
</div>


          </div>


          <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
            <div className="w-[90px] h-[23px] justify-start items-center gap-2.5 inline-flex">
              <div className="text-neutral-700 text-[10px] font-medium font-['Mona Sans']">(Highest Bid {user?.HighestBid})</div>
            </div>
            <div className="self-stretch p-3 bg-lime-400 rounded-lg border justify-center items-center gap-2.5 inline-flex">
              <div className="text-black text-sm font-semibold font-['Mona Sans'] leading-[17px]">Match Bid</div>
            </div>
          </div>
        </div>


        <div className="self-stretch h-28 flex-col justify-center items-start gap-1 flex">
          <div className="self-stretch h-[75px] py-2 border-t border-b border-neutral-800 flex-col justify-start items-start gap-1 flex">
            <div className="self-stretch justify-between items-start inline-flex">
              <div className="justify-center items-center gap-2.5 flex">
                <div className="text-zinc-400 text-xs font-normal font-['Mona Sans']">Price</div>
              </div>
              <div className="justify-center items-center gap-2.5 flex">
                <div className="text-zinc-400 text-xs font-medium font-['Mona Sans']">$149.99</div>
              </div>
            </div>
            <div className="self-stretch justify-between items-start inline-flex">
              <div className="justify-center items-center gap-2.5 flex">
                <div className="text-zinc-400 text-xs font-normal font-['Mona Sans']">Service Fee (2.9%)</div>
              </div>
              <div className="justify-center items-center gap-2.5 flex">
                <div className="text-zinc-400 text-xs font-medium font-['Mona Sans']">$13.05</div>
              </div>
            </div>
            <div className="self-stretch justify-between items-start inline-flex">
              <div className="justify-center items-center gap-2.5 flex">
                <div className="text-zinc-400 text-xs font-normal font-['Mona Sans']">Tip</div>
              </div>
              <div className="justify-center items-center gap-2.5 flex">
                <div className="text-zinc-400 text-xs font-medium font-['Mona Sans']">$0.00</div>
              </div>
            </div>
          </div>
          <div className="self-stretch py-2 border-b border-neutral-800 justify-between items-start inline-flex">
            <div className="justify-center items-center gap-2.5 flex">
              <div className="text-zinc-400 text-xs font-medium font-['Mona Sans']">Total Amount</div>
            </div>
            <div className="justify-center items-center gap-2.5 flex">
              <div className="text-lime-500 text-xs font-medium font-['Mona Sans']">$478.05</div>
            </div>
          </div>
        </div>





        <div className="self-stretch h-[86px] flex-col justify-start items-start gap-2 flex">
          <div className="py-1 justify-center items-center gap-2.5 inline-flex">
            <div className="text-neutral-200 text-lg font-semibold font-['Mona Sans'] leading-snug">Payment Method</div>
          </div>
          <div className="self-stretch p-3 bg-zinc-900 rounded-lg border border-zinc-800 justify-between items-center inline-flex">
            <div className="justify-center items-center gap-2.5 flex">
              <div className="text-neutral-700 text-sm font-normal font-['Mona Sans'] leading-[17px]">None</div>
            </div>
            <div className="w-6 h-6 px-1.5 justify-center items-center flex" />
          </div>
        </div>
        <div className="self-stretch p-3 bg-zinc-900 rounded-lg border border-zinc-800 justify-center items-center gap-2.5 inline-flex">
          <div className="w-[136px] h-6 justify-center items-center gap-2.5 flex">
            <div className="text-neutral-700 text-sm font-normal font-['Mona Sans'] leading-[17px]">Enter Discount Code</div>
          </div>
        </div>
        <div className="self-stretch justify-end items-center gap-3 inline-flex">
          <div className="px-6 py-3 rounded-lg justify-center items-center flex">
            <div className="text-neutral-200 text-sm font-semibold font-['Mona Sans'] leading-[17px]">Close</div>
          </div>
          <div className="px-5 py-3 bg-lime-400 rounded-lg justify-center items-center gap-2.5 flex">
            <div className="text-black text-sm font-semibold font-['Mona Sans'] leading-[17px]">Send Demo</div>
          </div>
        </div>
      </div>

    </div>
  </Modal>
  )
}

export default PurchaseOrderModal;