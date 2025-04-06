// locked content modal

const LockedContent = () => {
  return (
    <div className="absolute w-[25em] text-center bg-[#1C1C1C] border-[#3D3D3D] border-2 rounded-md opacity-85
           z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
      <div id="lock-icon" className="flex justify-center items-center pb-2 pt-4">
        <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.87142 13.9843V9.23429C7.87142 7.13466 8.70549 5.12103 10.1902 3.63637C11.6748 2.1517 13.6885 1.31763 15.7881 1.31763C17.8877 1.31763 19.9014 2.1517 21.386 3.63637C22.8707 5.12103 23.7048 7.13466 23.7048 9.23429V13.9843M17.3714 23.4843C17.3714 24.3587 16.6625 25.0676 15.7881 25.0676C14.9136 25.0676 14.2048 24.3587 14.2048 23.4843C14.2048 22.6098 14.9136 21.901 15.7881 21.901C16.6625 21.901 17.3714 22.6098 17.3714 23.4843ZM4.70475 13.9843H26.8714C28.6203 13.9843 30.0381 15.4021 30.0381 17.151V29.8176C30.0381 31.5665 28.6203 32.9843 26.8714 32.9843H4.70475C2.95585 32.9843 1.53809 31.5665 1.53809 29.8176V17.151C1.53809 15.4021 2.95585 13.9843 4.70475 13.9843Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <h4 className="text-lg font-medium text-white">Locked Content</h4>
      <p className="text-sm text-[#999999] pb-3">To unlock the content you must connect with the partner.</p>
    </div>
  )
}

export default LockedContent;
