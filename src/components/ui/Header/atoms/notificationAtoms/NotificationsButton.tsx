const NotificationButton = ({ buttonName, bgColor, textColor, borderColor, onClick, icon }) => {
  const defaultBgColor = bgColor || 'bg-transparent'; 
  const defaultTextColor = textColor || 'text-white';
  const defaultBorderColor = borderColor || 'border-white'; 

  return (
    <button
      className={`px-[12px] py-[8px] w-fit text-[12px] flex border rounded-full ${defaultBgColor} ${defaultTextColor} ${defaultBorderColor} `}
      onClick={onClick}
    >
      {buttonName}
      {icon && <span className="ml-2" style={{ color: 'black' }}>{icon}</span>} {/* Render the icon if provided */}
    </button>
  );
};

export default NotificationButton;