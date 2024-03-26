import { cn } from 'util/cn';

type PropsType = {
    className?: string;
};

const Heart = ({ className }: PropsType) => {
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
            <rect width={65} height={65} fill="url(#pattern-heart)" />
            <defs>
                <pattern
                    id="pattern-heart"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <use
                        xlinkHref="#image0_43_628"
                        transform="translate(0 -0.00390625) scale(0.0078125)"
                    />
                </pattern>
                <image
                    id="image0_43_628"
                    width={128}
                    height={129}
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
};

export default Heart;
