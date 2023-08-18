import './Body.css';

import { useState } from 'react';

function Body() {
    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [action, setAction] = useState('');
    const [step, setStep] = useState(0);

    function clickNumber(event) {
        event.stopPropagation();
        const symbol = event.target.innerText;
        if (step === 0) {
            if (symbol !== '.' || !first.includes('.')) {
                setFirst(first+symbol);
            }
        } else if (step === 1) {
            if (symbol !== '.' || !second.includes('.')) {
                setSecond(second+symbol);
            }
        }
    }

    function clickOperator(event) {
        event.stopPropagation();
        const action = event.target.innerText;
        if (step === 0) {
            setStep(1);
            setAction(action);
        } else if (step === 1) {
            setFirst(calculate());
            setSecond('');
            setAction(action);
        }
    }

    function calculate() {
        let result = 0;
        let firstFloat = parseFloat(first);
        let secondFloat = parseFloat(second);
    
        if (action === '+') {
            result = firstFloat + secondFloat;
        } else if (action === '-') {
            result = firstFloat - secondFloat;
        } else if (action === '*') {
            result = firstFloat * secondFloat;
        } else if (action === '/') {
            result = firstFloat / secondFloat;
        }
        
        return result;
    }

    function clickCancel() {
        setFirst('');
        setSecond('');
        setAction('');
        setStep(0);
    }

    function clickResult() {
        if (step === 1) {
            setStep(2);
        };
    }

    let result = 0;

    if (step === 0 || (step === 1 && second === '')) {
        result = first !== '' ? first : '0';
    } else if (step === 1) {
        result = second;
    } else if (step === 2) {
        result = calculate();
    }

    return(
        <>
            <section className='body'>
                <div className='body__first'>
                    <button className="body__btn" onClick={clickCancel}>C</button>
                    <div className='body__result'>{result}</div>
                </div>

                <div className='body__second'>
                    <button className="body__btn" onClick={clickNumber}>7</button>
                    <button className="body__btn" onClick={clickNumber}>8</button>
                    <button className="body__btn" onClick={clickNumber}>9</button>
                    <button className="body__btn" onClick={clickOperator}>+</button>

                    <button className="body__btn" onClick={clickNumber}>4</button>
                    <button className="body__btn" onClick={clickNumber}>5</button>
                    <button className="body__btn" onClick={clickNumber}>6</button>
                    <button className="body__btn" onClick={clickOperator}>-</button>

                    <button className="body__btn" onClick={clickNumber}>1</button>
                    <button className="body__btn" onClick={clickNumber}>2</button>
                    <button className="body__btn" onClick={clickNumber}>3</button>
                    <button className="body__btn" onClick={clickOperator}>*</button>

                    <button className="body__btn" onClick={clickNumber}>0</button>
                    <button className="body__btn" onClick={clickNumber}>.</button>
                    <button className="body__btn" onClick={clickResult}>=</button>
                    <button className="body__btn" onClick={clickOperator}>/</button>
                </div>
            </section>
        </>
    )
}

export default Body;