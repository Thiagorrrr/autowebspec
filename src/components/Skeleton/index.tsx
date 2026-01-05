"use client";

type BaseProps = {
    className?: string;
    width?: number | string;
    height?: number | string;
    fullWidth?: boolean;
};

type SkeletonProps =
    | (BaseProps & {
        type: "block";
        rounded?: boolean;
    })
    | (BaseProps & {
        type: "text";
        lines?: number;
    });

export const Skeleton = (props: SkeletonProps) => {
    const style = {
        width: props.fullWidth ? "100%" : props.width,
        height: props.height,
    };

    if (props.type === "block") {
        return (
            <div
                style={style}
                className={`
          animate-pulse bg-gray-200
          ${props.rounded !== false ? "rounded-lg" : ""}
          ${props.className ?? ""}
        `}
            />
        );
    }


    return (
        <div className={`space-y-2 ${props.className ?? ""}`}>
            <div
                style={{
                    width: props.fullWidth
                        ? "100%"
                        : props.width,
                    height: props.height ?? 16,
                }}
                className="animate-pulse rounded bg-gray-200"
            />
        </div>
    );
};
