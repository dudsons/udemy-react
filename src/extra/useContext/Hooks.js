import React from 'react'
import ExampleContext from "./ExampleContext";
import HooksChild from "./HooksChild";
const Hooks = () => {
    const value = React.useContext(ExampleContext);
    return (
        <div>
            <strong> Hooks: </strong> {value}
            <HooksChild/>
        </div>
    )
};

export default Hooks;