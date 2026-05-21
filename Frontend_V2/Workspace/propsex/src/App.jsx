import Student from './compoments/Student'
import Student1 from './compoments/Student1'
import Calculator from './compoments/Calculator'
function App() {


  function add(a, b) {
    alert("Addition = " + (a + b));
  }

  function sub(a, b) {
    alert("Subtraction = " + (a - b));
  }

  function mul(a, b) {
    alert("Multiplication = " + (a * b));
  }

  function div(a, b) {
    alert("Division = " + (a / b));
  }


  return (
    <>
      <Student name="suneetha" age={10} />
      <Student name="joythi" age={17} />
      <Student name="deepthi" age={18} />
      <Student1 name="destucturing method" age={12} />

      <Calculator
      add={add}
      sub={sub}
      mul={mul}
      div={div}
    />


    </>
  )
}

export default App
