import React from 'react';
import {useLocation} from "react-router-dom";

function Success(props) {
    const location = useLocation();

    console.log(location);
    return (
        <div>
            successfull
        </div>
    );
}

export default Success;