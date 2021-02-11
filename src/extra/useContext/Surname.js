import React, {useContext} from 'react'
import ExampleContext from "./ExampleContext";

const Surname = () => {
    const {surname, setSurname} = useContext(ExampleContext);

    return(
        <div>
            <button onClick={()=>setSurname(Math.random())}>Random surname</button>
            <div>Surname: {surname}</div>
        </div>
    )
};

export default Surname;