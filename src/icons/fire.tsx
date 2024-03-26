import { cn } from 'util/cn';
import FireIcon from "assets/img/fire.png";

type PropsType = {
    className?: string;
};

const Fire = ({ className }: PropsType) => {
    return (

        <img className={cn('', className)}
            src={FireIcon}
            alt='fire-icon'
        />



    );
};

export default Fire;
