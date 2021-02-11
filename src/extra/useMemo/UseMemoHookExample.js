import React, {useState, useMemo} from 'react'

const UseMemoHookExample = () => {
    const [counter, setCounter] = useState(0);
    const [numbers, setNumbers] = useState({a: 1, b: 90});
    console.log("UseMemoHookExample is rerender ");

    const memo = useMemo (() =>{
        console.log("Render use memo");
        return numbers.a + numbers.b;
    },[numbers]);

    return (
        <div>
            <div>Counter:{counter}</div>
            <button onClick={() => {
                setCounter(counter + 1)
            }}>Increase counter
            </button>
            <button onClick={() => {
                setCounter(counter - 1)
            }}>Decrease counter
            </button>

            <div>Memo part</div>
            <div>Actual memo value is:{memo}</div>

            <button onClick={()=>setNumbers({a:numbers.a+1,b:numbers.b+1})}>Change memo value</button>

        </div>
    )
};

export default UseMemoHookExample;