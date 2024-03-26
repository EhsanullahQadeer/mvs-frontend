import { cn } from 'util/cn';

type PropsType = {
    className?: string;
};

const Profile = ({ className }: PropsType) => {
    return (

        <svg
            width={65}
            height={66}
            viewBox="0 0 65 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={cn('', className)}
        >
            <rect y="0.5" width={65} height={65} fill="url(#pattern-profile)" />
            <defs>
                <pattern
                    id="pattern-profile"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <use
                        xlinkHref="#image0_43_378"
                        transform="translate(0 -0.00390625) scale(0.0078125)"
                    />
                </pattern>
                <image
                    id="image0_43_378"
                    width={128}
                    height={129}
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>

    );
};

export default Profile;
