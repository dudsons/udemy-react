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

const httpReducerHandler = (httpReducer, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null };
        case 'RESPONSE':
            return { ...httpReducer, loading: false };
        case 'ERROR':
            return { loading: false, error: action.errorMessage };
        case 'CLOSE':
            return { ...httpReducer, error: null };
        default:
            throw new Error('Should not be reached!');
    }
};


function Ingredients() {
    const [userIngredients, dispatchForIngredients] = useReducer(userIngredientReducer, []);

    // const [userIngredients, setUserIngredients] = useState([]);
    // const [isIndicator, setIsIndicator] = useState(false);
    // const [error, setError] = useState(undefined);
    const [someText, dispatch] = useReducer(textReducer, "A");
    const [httpState, dispatchHttpState] = useReducer(httpReducerHandler,
        {
            isIndicator: false,
            error: "aaa"});


    //get start list
    useEffect(() => {
        // setIsIndicator(true);
        console.log(httpState);
        dispatchHttpState({type: "SEND"});
        fetch("https://react-hook-upda-default-rtdb.firebaseio.com/ingredients.json")
            .then(
                response => response.json()
            )
            .then(ingredientsFromDb => {
                    // setIsIndicator(false);
                    dispatchHttpState({type: "RESPONSE"});
                    const ingredientsList = [];
                    for (let key in ingredientsFromDb) {
                        ingredientsList.push({
                            id: key,
                            amount: ingredientsFromDb[key].amount,
                            title: ingredientsFromDb[key].title
                        })
                    }
                // setUserIngredients(ingredientsList)
                dispatchForIngredients({type: "SET", ingredientsList: ingredientsList})
                }
            ).catch(error => {
            dispatchHttpState({type: "ERROR", errorMessage: `Error when getting start list: `});
        })
    }, []);


    const addIngredientHandler = (ingredient) => {
        // setIsIndicator(true);
        dispatchHttpState({type: "SEND"});
        fetch("https://react-hook-upda-default-rtdb.firebaseio.com/ingredients.json", {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            // setIsIndicator(false);
            dispatchHttpState({type: "RESPONSE"});
            return response.json();
        }).then(response => {
            // setUserIngredients([...userIngredients, {id: response.name, ...ingredient}]);
            dispatchForIngredients({type: "ADD", ingredient: {id: response.name, ...ingredient}})
        });
    };


    const removeIngredientFromList = (id) => {
        // setIsIndicator(true);
        dispatchHttpState({type: "SEND"});
        fetch(`https://react-hook-upda-default-rtdb.firebaseio.com/ingredients/${id}.json`,
            {method: "DELETE"})
            .then(() => {
                    dispatchForIngredients({type: "DELETE", id: id});
                    // setIsIndicator(false);
                    dispatchHttpState({type: "RESPONSE"});
                }
            );
    };

    const getFilteredIngredientsList = useCallback((filteredList) => {
        dispatchForIngredients({type: "SET", ingredientsList: filteredList})
    }, []);

    const closeAlarm = () => {
        // setError(undefined);
        // setIsIndicator(false);
        dispatchHttpState({type:"CLOSE"})
    };

    return (
        <div className="App">
            <button type="button" onClick={() => {
                dispatch({type: "change"})
            }}> UseReducer
            </button>
            <div>Reducer value is {someText}</div>
            {httpState.error && <ErrorModal children={httpState.error} onClose={closeAlarm}/>}
            <IngredientForm onAddIngredients={addIngredientHandler} onIndicator={httpState.isIndicator} onError={httpState.error}/>
            <section>
                <Search onLoadIngredients={getFilteredIngredientsList}/>
                <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientFromList}/>
            </section>
        </div>
    );
}

export default Ingredients;
