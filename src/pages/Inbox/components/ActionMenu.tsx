import { useEffect, useRef, useState } from "react";

type Props = {
  menuItems: { label: string; icon: any; func: () => void }[];
  setMenuSection: (value: boolean) => void;
  isConvoListMenu?: boolean;
};

const ActionMenu = (props: Props) => {
  const { menuItems, setMenuSection, isConvoListMenu = false } = props;

  const menuRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCloseMenu = () => {
    setMenuSection(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleCloseMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={menuRef}
        className={`absolute z-[9999] ${
          isConvoListMenu ? "w-[189px] top-10" : "w-[224px] top-12 right-0"
        }`}
      >
        <div
          className={`bg-eerieBlack border border-charcoalGray rounded-lg ${
            isConvoListMenu ? "" : "p-2.5"
          }`}
        >
          {menuItems.map((item, idx) => {
            const { label, icon, func } = item;
            const isLastItem = idx + 1 === menuItems.length;
            const isFirstItem = idx === 0;
            return (
              <div
                key={idx}
                className={`px-3 flex justify-start items-center cursor-pointer bg-transparent hover:text-white hover:bg-[#2C2C2C] transition-all ${
                  isConvoListMenu
                    ? `text-grayBlue py-2.5 gap-2.5 ${
                        isLastItem
                          ? "rounded-b-lg"
                          : "border-b border-charcoalGray"
                      } ${isFirstItem ? "rounded-t-lg" : ""}`
                    : "text-silver py-2 gap-2 rounded-lg"
                }`}
                onClick={() => {
                  func();
                  handleCloseMenu();
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span
                  className={`flex items-center justify-center ${
                    isConvoListMenu ? "w-4 h-4" : "w-6 h-6"
                  }`}
                >
                  {icon}
                </span>
                <span className={`flex-1 font-normal text-xs leading-4`}>
                  {label}
                </span>

                {isConvoListMenu ? (
                  <div
                    className={`flex w-2 h-2 rounded-full ${
                      hoveredIndex === idx ? "bg-[#F56755]" : "bg-transparent"
                    }`}
                  />
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ActionMenu;
