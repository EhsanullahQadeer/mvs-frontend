import { cn } from 'util/cn';
import clockIcon from "assets/img/clock.png";

type PropsType = {
    className?: string;
};

const Clock = ({ className }: PropsType) => {
    return (

        <img className={cn('', className)}
            src={clockIcon}
            alt='subcribed'
        />



    );
};

export default Clock;
