import React, {useContext} from 'react'
import ExampleContext from "./ExampleContext";
import HooksChild from "./HooksChild";

const Name = () => {
    const { name, setName } = React.useContext(ExampleContext);

    return React.useMemo ( () => {
        return (
            <div>
                <h2>Name: {name}</h2>
                <button onClick={() => setName(Math.random())}>
                    Change name
                </button>
                <br/>
                Random: {Math.random()}
            </div>
        )
    },[name])
}

export default Name;