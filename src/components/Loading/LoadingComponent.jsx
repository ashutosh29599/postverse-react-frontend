import React from "react";
import { Spinner } from "flowbite-react";

const LoadingComponent = () => {
    return (
        <div className="flex flex-wrap items-center gap-2 dark:bg-gray-900">
            <Spinner
                aria-label="Extra large spinner example"
                size="xl"
                color="purple"
            />
        </div>
    );
};

export default LoadingComponent;
