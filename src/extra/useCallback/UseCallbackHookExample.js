import React,{useState, useCallback} from 'react'
import CounterButtons from "./CounterButtons";

const UseCallbackHookExample =  () =>{
  const [counter, setCounter] = useState(0);

  const counting = useCallback(
      (sign)=>{
      if(sign === '+'){
          setCounter(c => c + 1);
      }else {
          setCounter(c => c + 1 );
      }
  },[setCounter]);

    console.log('Rendering UseCallbackHookExample');

  return (
      <div>
          <p>Counting</p>
          <div>Current value is : {counter}</div>
          <CounterButtons onCounting={counting}/>
      </div>
  )
};

export default UseCallbackHookExample;