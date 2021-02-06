import React, {useState, useEffect} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

function Ingredients() {
    const [userIngredients, setUserIngredients] = useState([]);
    const [someTestNumber, setSomeTestNumber] = useState(1);

    const addIngredientHandler = (ingredient) => {
        fetch("https://react-hook-upda-default-rtdb.firebaseio.com/ingredients.json", {
            method:'POST',
            body: JSON.stringify(ingredient),
            headers:{
              'Content-Type':'application/json'
            }
        }).then(response =>{
            return response.json();
        }).then(response=>{
            setUserIngredients([...userIngredients, {id: response.name, ...ingredient}]);
        })
    };

    useEffect(()=>{
        fetch("https://react-hook-upda-default-rtdb.firebaseio.com/ingredients.json")
            .then(response=>response.json())
            .then( ingredientsFromDb =>{
                const ingredientsList = [];
                console.log(ingredientsFromDb);
                for(let key in ingredientsFromDb){
                    ingredientsList.push({id:key, amount: ingredientsFromDb[key].amount, title: ingredientsFromDb[key].title})
                }
                setUserIngredients(ingredientsList)
            }
        )
    },[]);


    const removeIngredientFromList = (id) => {
        let ingredientIndex = userIngredients.findIndex(ingredient => ingredient.id === id);
        let ingredientsList  = [...userIngredients];
        ingredientsList.splice(ingredientIndex, 1);
        setUserIngredients(ingredientsList)
    };

    useEffect(() => {
        setSomeTestNumber(69)
    });

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
