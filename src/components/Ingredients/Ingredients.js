import React, {useState, useEffect} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

function Ingredients() {
    const [userIngredients, setUserIngredients] = useState([]);
    const [someTestNumber, setSomeTestNumber] = useState(1);

    const addIngredientHandler = (ingredient) => {
        setUserIngredients([...userIngredients, {id: Math.random().valueOf().toString(), ...ingredient}]);
    }

    const removeIngredientFromList = (id) => {
        let ingredientIndex = userIngredients.findIndex(ingredient => ingredient.id === id)
        let ingredientsList  = [...userIngredients];
        ingredientsList.splice(ingredientIndex, 1);
        setUserIngredients(ingredientsList)
    }

    useEffect(() => {
        setSomeTestNumber(69)
    })

    return (
        <div className="App">
            <IngredientForm onAddIngredient={addIngredientHandler} someTestNumber={someTestNumber}/>
            <section>
                <Search/>
                <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientFromList}/>
            </section>
        </div>
    );
}

export default Ingredients;
