import React from 'react'
import ExampleContext from "./ExampleContext";

const HooksChild = () => {
    const value = React.useContext(ExampleContext);
    return (
        <div>
            <strong> Hooks: </strong> {value}
        </div>
    )
};

export default HooksChild;