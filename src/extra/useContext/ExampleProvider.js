import React,{useState} from 'react';
// Konfiguracja ContextAPI
import ExampleContext from "./ExampleContext";
import Hooks from "./Hooks";
import Name from "./Name";
import Surname from "./Surname";
// Importujemy 3 "rodzaje" komponentów,
// aby pokazać jak korzystać z ContextAPI dla każdego typu komponentu

const ExampleProvider = () =>{
    const [name, setName] = useState("Default name");
    const [surname, setSurname] = useState("Default surname");
    const value = {
        name,
        setName,
        surname,
        setSurname
    };

    return (
    <ExampleContext.Provider value={value}>
        {/*<Hooks />*/}
        <Name/>
        <Surname/>
    </ExampleContext.Provider>
    )
};

export default ExampleProvider;