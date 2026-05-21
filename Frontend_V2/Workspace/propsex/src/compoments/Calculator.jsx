function Calculator(props){
    function calculate(operation) {
        const a = Number(document.getElementById("n1").value);
        const b = Number(document.getElementById("n2").value);
    
        operation(a, b); // calling function received via props
      }

    return(
        <>
        <div>
      <h2>Calculator</h2>

      <input id="n1" type="number" placeholder="Enter number 1" />
      <br /><br />

      <input id="n2" type="number" placeholder="Enter number 2" />
      <br /><br />

      <button onClick={() => calculate(props.add)}>Add</button>
      <button onClick={() => calculate(props.sub)}>Sub</button>
      <button onClick={() => calculate(props.mul)}>Mul</button>
      <button onClick={() => calculate(props.div)}>Div</button>
    </div>
  
        </>
    )
}
export default Calculator