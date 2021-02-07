import React, {useState, useEffect} from 'react';
import Card from '../UI/Card';
import './Search.css';

const Search = props => {

    const {onLoadIngredients}= props;
    const [enteredFilter, setEnteredFilter] = useState('');

    useEffect(()=>{
        console.log("use efect work?");
        const query =
            enteredFilter.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch("https://react-hook-upda-default-rtdb.firebaseio.com/ingredients.json" + query)
        .then(response=>response.json())
        .then( ingredientsFromDb =>{
                    const ingredientsList = [];
                    for(const key in ingredientsFromDb){
                        ingredientsList.push({
                          id:key,
                          amount: ingredientsFromDb[key].amount,
                          title: ingredientsFromDb[key].title
                        });
                    }
            onLoadIngredients(ingredientsList);
        });
    },[enteredFilter, onLoadIngredients]);



  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text"
                 value={enteredFilter}
                 onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
};

export default Search;
