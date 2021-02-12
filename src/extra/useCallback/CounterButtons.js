import React from 'react'

const CounterButtons =React.memo( ({onCounting}) =>{

    console.log('Rendering CounterButtons');
    return(
        <div>
            <button onClick={()=>{onCounting('+')}} >Increase</button>
            <button onClick={()=>{onCounting('-')}}>Decrease</button>
        </div>
    )

});

export default CounterButtons;