type Props = {
  title: string;
  desc: string;
  active: boolean;
  value: string;
  onToggle: (value: string) => void; // Add onToggle prop type
  isDisabled: boolean; // Add isDisabled prop type
};

const NotificationItem = (props: Props) => {
  const { title, desc, active, value, onToggle, isDisabled } = props;
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-normal text-white">{title}</p>
        <label htmlFor={`toggle-${value}`} className="relative inline-block w-12 h-6">
          <input
            id={`toggle-${value}`}
            type="checkbox"
            className="opacity-0 w-0 h-0"
            checked={active}
            onChange={() => onToggle(value)} // Call onToggle with the value
            disabled={isDisabled}
          />
          <span className="slider round"></span>
        </label>
        </div>
      <p className="text-sm font-normal text-coolGray">{desc}</p>
    </>
  );
};

export default NotificationItem;