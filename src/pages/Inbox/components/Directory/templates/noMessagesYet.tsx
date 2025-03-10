const NoMessagesYetPrompt = () => {
  return (
    <div className="flex flex-col items-center text-center px-[220px] py-[236px]">
      <div className="relative">
      <svg width="115" height="116" viewBox="0 0 115 116" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M105.417 48.4168C105.417 45.3981 103.979 42.571 101.584 40.7502L63.2502 12.0002C61.5913 10.756 59.5737 10.0835 57.5002 10.0835C55.4266 10.0835 53.409 10.756 51.7502 12.0002L13.4168 40.7502C12.2266 41.6428 11.2606 42.8003 10.5952 44.131C9.92989 45.4617 9.5835 46.9291 9.5835 48.4168M105.417 48.4168V96.3335C105.417 98.8752 104.407 101.313 102.61 103.11C100.813 104.907 98.3752 105.917 95.8335 105.917H19.1668C16.6252 105.917 14.1876 104.907 12.3904 103.11C10.5932 101.313 9.5835 98.8752 9.5835 96.3335V48.4168M105.417 48.4168L62.4356 75.7293C60.9563 76.6562 59.2459 77.1477 57.5002 77.1477C55.7545 77.1477 54.0441 76.6562 52.5648 75.7293L9.5835 48.4168" stroke="#242424" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      </div>
      <span className='text-white text-[18px] font-semibold'>No messages yet</span>
      <div className='text-[#999999] text-[16px] font-normal mt-2'>
        It looks like your inbox is empty. Start a conversation or check back later for new messages.
      </div>
    </div>
  );
};

export default NoMessagesYetPrompt;