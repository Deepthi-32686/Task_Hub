import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(0);
  const [firstNum, setFirstNum] = useState(0);
  const [secondNum, setSecondNum] = useState(0);

  const increment = () => setCount(count + 1);
  
  const calculate = (operation) => {
    let value;
    switch(operation) {
      case 'add':
        value = firstNum + secondNum;
        break;
      case 'sub':
        value = firstNum - secondNum;
        break;
      case 'mul':
        value = firstNum * secondNum;
        break;
      default:
        value = 0;
    }
    setResult(value);
  };

  return (
    <div className="container">
      <div className="counter-section">
        <h2>Count: {count}</h2>
        <button onClick={increment} className="btn">Increment</button>
      </div>
      
      <div className="calculator-section">
        <h2>Calculator</h2>
        <div className="calculator-inputs">
          <input 
            type="number" 
            value={firstNum} 
            onChange={(e) => setFirstNum(Number(e.target.value))}
            placeholder="First number"
            className="num-input"
          />
          <input 
            type="number" 
            value={secondNum} 
            onChange={(e) => setSecondNum(Number(e.target.value))}
            placeholder="Second number"
            className="num-input"
          />
        </div>
        <div className="calculator-buttons">
          <button onClick={() => calculate('add')} className="btn calc">Add</button>
          <button onClick={() => calculate('sub')} className="btn calc">Sub</button>
          <button onClick={() => calculate('mul')} className="btn calc">Mul</button>
        </div>
      </div>
      
      <div className="result-section">
        <h2>Result: {result}</h2>
      </div>
    </div>
  );
}

export default App
