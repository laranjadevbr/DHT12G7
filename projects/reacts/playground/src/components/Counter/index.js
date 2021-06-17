import React, {
    useState,
    useEffect,
} from 'react';
export default function Counter () {
    const [ counter, setCounter ] = useState(0);
    useEffect(() => {
        console.log('value: ' + counter);
    });
    return (
        <div>
            <h1>Counter</h1>
            <span>{ counter }</span>
            <div>
                <button onClick={ () => {
                    return setCounter(counter - 1);
                } }>
                    { 'decrement' }
                </button>
                <button onClick={ () => {
                    return setCounter(counter + 1);
                } }>
                    { 'increment' }
                </button>
            </div>
        </div>
    );
};