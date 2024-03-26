import { cn } from 'util/cn';

type PropsType = {
    className?: string;
};

const HumanBody = ({ className }: PropsType) => {
    return (

        <svg
            width={65}
            height={65}
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={cn('', className)}

        >
            <rect width={65} height={65} fill="url(#pattern-body)" />
            <defs>
                <pattern
                    id="pattern-body"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <use xlinkHref="#image0_43_489" transform="scale(0.0078125)" />
                </pattern>
                <image
                    id="image0_43_489"
                    width={128}
                    height={128}
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>

    );
};


export default HumanBody;
