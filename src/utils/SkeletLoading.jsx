import React from "react";
import Skeleton from "react-loading-skeleton";
// LOADING SKELET
import "react-loading-skeleton/dist/skeleton.css";

const SkeletLoading = (props) => {
    const { height, count, rodius, gap = 5 } = props;
    return (
        <div>
            <Skeleton
                height={height}
                count={count}
                borderRadius={rodius}
                style={{ marginBottom: `${gap}px` }}
            />
        </div>
    );
};

export default SkeletLoading;
