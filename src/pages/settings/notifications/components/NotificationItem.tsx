import { Checkbox } from "@mui/material";
import { ReactComponent as CheckIcon } from "../../../../assets/icons/checkIcon.svg";

type Props = {
  title: string;
  desc: string;
};

const NotificationItem = (props: Props) => {
  const { title, desc } = props;
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-normal text-white">{title}</p>
        <div>
          <Checkbox
            icon={
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #B2B2B2",
                  borderRadius: "3px",
                }}
              />
            }
            checkedIcon={
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #B2B2B2",
                  borderRadius: "3px",
                  backgroundColor: "transparent",
                }}
              >
                <CheckIcon />
              </span>
            }
            sx={{
              padding: 0,
            }}
          />
        </div>
      </div>

      <p className="text-sm font-normal text-coolGray">{desc}</p>
    </div>
  );
};

export default NotificationItem;
