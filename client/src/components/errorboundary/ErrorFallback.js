import React from "react";
import "./ErrorFallback.scss";

const ErrorFallback = () => {
    return (
        <div className="error-fallback">
            <h3>Oops something went wrong! we are working on it!</h3>
            <p>Please try again later</p>
        </div>
    );
};

export default ErrorFallback;