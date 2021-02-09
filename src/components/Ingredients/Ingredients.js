import React, {useReducer, useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import ErrorModal from "../UI/ErrorModal";

const textReducer = (state, action) => {
    switch (action.type) {
        case 'change':
            return "changed B";
        default:
            throw new Error("There is such case for textReducer")
    }
};

const userIngredientReducer = (userIngredients, action) => {
    switch (action.type) {
        case "SET":
            return action.ingredientsList;
        case "ADD":
            return [...userIngredients, action.ingredient];
        case "DELETE":
            return [...userIngredients.filter(ingredient => ingredient.id !== action.id)];
        default:
            throw new Error("no such case in userIngredientReducer")
    }
};

function Ingredients() {
    const [userIngredients, dispatchForIngredients] = useReducer(userIngredientReducer, []);

    // const [userIngredients, setUserIngredients] = useState([]);
    const [isIndicator, setIsIndicator] = useState(false);
    const [error, setError] = useState(undefined);
    const [someText, dispatch] = useReducer(textReducer, "A");

    //get start list
    useEffect(() => {
        setIsIndicator(true);
        fetch("https://react-hook-upda-default-rtdb.firebaseio.com/ingredients.json")
            .then(
                response => response.json()
            )
            .then(ingredientsFromDb => {
                    setIsIndicator(false);
                    const ingredientsList = [];
                    for (let key in ingredientsFromDb) {
                        ingredientsList.push({
                            id: key,
                            amount: ingredientsFromDb[key].amount,
                            title: ingredientsFromDb[key].title
                        })
                    }
                    dispatchForIngredients({type: "SET", ingredientsList: ingredientsList})
                    // setUserIngredients(ingredientsList)
                }
            ).catch(error => {
            setError(error.message);
        })
    }, []);


    const addIngredientHandler = (ingredient) => {
        setIsIndicator(true);
        fetch("https://react-hook-upda-default-rtdb.firebaseio.com/ingredients.json", {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            setIsIndicator(false);
            return response.json();
        }).then(response => {
            dispatchForIngredients({type:"ADD", ingredient:{id: response.name, ...ingredient}})
            // setUserIngredients([...userIngredients, {id: response.name, ...ingredient}]);
        });
    };


    const removeIngredientFromList = (id) => {
        setIsIndicator(true);
        fetch(`https://react-hook-upda-default-rtdb.firebaseio.com/ingredients/${id}.json`,
            {method: "DELETE"})
            .then(() => {
                    dispatchForIngredients({type:"DELETE", id:id});
                    setIsIndicator(false);
                }
            );
    };

    const getFilteredIngredientsList = useCallback((filteredList) => {
        dispatchForIngredients({type:"SET",ingredientsList:filteredList})
    }, []);

    const closeAlarm = () => {
        setError(undefined);
        setIsIndicator(false);
    };

    return (
        <div className="App">
            <button type="button" onClick={() => {
                dispatch({type: "change"})
            }}> UseReducer
            </button>
            <div>Reducer value is {someText}</div>
            {error && <ErrorModal children={error} onClose={closeAlarm}/>}
            <IngredientForm onAddIngredients={addIngredientHandler} onIndicator={isIndicator} onError={error}/>
            <section>
                <Search onLoadIngredients={getFilteredIngredientsList}/>
                <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientFromList}/>
            </section>
        </div>
    );
}

export default Ingredients;
