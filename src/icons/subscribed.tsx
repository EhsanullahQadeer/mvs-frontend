import { cn } from 'util/cn';
import SubscribedIcon from "assets/img/subscrbed.png";

type PropsType = {
    className?: string;
};

const Subscribed = ({ className }: PropsType) => {
    return (

        <img className={cn('', className)}
            src={SubscribedIcon}
            alt='subcribed'
        />



    );
};

export default Subscribed;
