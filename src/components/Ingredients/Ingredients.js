import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

function Ingredients() {
    const [userIngredients, setUserIngredients] = useState([]);
    const [isIndicator , setIsIndicator] = useState(false);

    const addIngredientHandler = (ingredient) => {
        setIsIndicator(true);
        fetch("https://react-hook-upda-default-rtdb.firebaseio.com/ingredients.json", {
            method:'POST',
            body: JSON.stringify(ingredient),
            headers:{
              'Content-Type':'application/json'
            }
        }).then(response =>{
            setIsIndicator(false);
            return response.json();
        }).then(response=>{
            setUserIngredients([...userIngredients, {id: response.name, ...ingredient}]);
        });
    };

    //get start list
    useEffect(()=>{
        setIsIndicator(true);
        fetch("https://react-hook-upda-default-rtdb.firebaseio.com/ingredients.json")
            .then(
                response=>response.json()
            )
            .then( ingredientsFromDb =>{
                setIsIndicator(false)
                const ingredientsList = [];
                for(let key in ingredientsFromDb){
                    ingredientsList.push({id:key, amount: ingredientsFromDb[key].amount, title: ingredientsFromDb[key].title})
                }
                setUserIngredients(ingredientsList)
            }
        )
    },[]);


    const removeIngredientFromList = (id) => {
        setIsIndicator(true);
        let ingredientIndex = userIngredients.findIndex(ingredient => ingredient.id === id);
        let ingredientsList  = [...userIngredients];
        fetch(`https://react-hook-upda-default-rtdb.firebaseio.com/ingredients/${id}.json`,
            {method:"DELETE"})
            .then(()=>{
                setUserIngredients([...userIngredients.filter(ingredient =>ingredient.id !== id)]);
                setIsIndicator(false);
            }
                );
    };

    const getFilteredIngredientsList =useCallback((filteredList) =>{
        setUserIngredients(filteredList)
    },[]);

    return (
        <div className="App">
            <IngredientForm onAddIngredients={addIngredientHandler} onIndicator={isIndicator}/>
            <section>
                <Search onLoadIngredients={getFilteredIngredientsList} />
                <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientFromList}/>
            </section>
        </div>
    );
}

export default Ingredients;
