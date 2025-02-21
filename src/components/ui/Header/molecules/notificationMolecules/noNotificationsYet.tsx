const NoNotificationsYetPrompt =() => {
  return (
    <div className="flex flex-col items-center h-[calc(618px-120px)] text-center px-[30px] pt-[100px]">
      <div className="relative mb-4 pr-[18px]">
        <svg width="133" height="131" viewBox="0 0 133 131" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.499748 21.9266L0.951057 17.7509L13.1532 6.47681L2.93268 5.37217L3.43986 0.679503L21.1368 2.59219L20.6941 6.68834L8.44362 18.0377L19.7776 19.2627L19.2704 23.9553L0.499748 21.9266Z" fill="#242424"/>
        <path d="M19.787 55V52.9L25.247 46.64H20.107V44.28H29.007V46.34L23.527 52.64H29.227V55H19.787Z" fill="#242424"/>
        <path d="M110.458 87.3965C114.292 94.584 118.125 97.459 118.125 97.459H31.875C31.875 97.459 46.25 87.8756 46.25 54.334C46.25 38.5215 59.1875 25.584 75 25.584C78.3542 25.584 81.2292 26.0632 84.1042 27.0215M66.8544 116.626C67.6564 118.084 68.8355 119.301 70.2684 120.148C71.7013 120.996 73.3355 121.443 75.0002 121.443C76.665 121.443 78.2991 120.996 79.732 120.148C81.165 119.301 82.344 118.084 83.1461 116.626M118.125 54.334C118.125 62.2731 111.689 68.709 103.75 68.709C95.8109 68.709 89.375 62.2731 89.375 54.334C89.375 46.3949 95.8109 39.959 103.75 39.959C111.689 39.959 118.125 46.3949 118.125 54.334Z" stroke="#242424" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className='text-white text-[18px] font-semibold'>No notifications yet</span>
      <div className='text-[#999999] text-[16px] font-normal mt-2'>
        You're all caught up! Check back later for updates or new activity.
      </div>
    </div>
  );
};

export default NoNotificationsYetPrompt;
