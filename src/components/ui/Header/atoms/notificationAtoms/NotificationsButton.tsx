const NotificationButton = ({ buttonName, bgColor, textColor, borderColor, onClick }) => {
  const defaultBgColor = bgColor || 'bg-transparent'; 
    const defaultTextColor = textColor || 'text-white';
  const defaultBorderColor = borderColor || 'border-white'; 

  return (
    <button
      className={`px-[12px] py-[8px] w-fit text-[12px] border rounded-full ${defaultBgColor} ${defaultTextColor} ${defaultBorderColor} `}
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default NotificationButton;