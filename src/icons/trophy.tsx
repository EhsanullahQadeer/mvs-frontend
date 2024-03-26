import { cn } from 'util/cn';

type PropsType = {
    className?: string;
};

const Trophy = ({ className }: PropsType) => {
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
            <rect width={65} height={65} fill="url(#pattern-goals)" />
            <defs>
                <pattern
                    id="pattern-goals"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <use
                        xlinkHref="#image0_43_398"
                        transform="translate(0 -0.00390625) scale(0.0078125)"
                    />
                </pattern>
                <image
                    id="image0_43_398"
                    width={128}
                    height={129}
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>


    );
};

export default Trophy;
