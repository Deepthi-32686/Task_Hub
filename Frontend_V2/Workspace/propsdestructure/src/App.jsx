import Dashboard from "./components/Dashboard"
import Registration from "./components/Registration"
import ReactDOM from "react-dom/client";
function App() {
   // function passed as prop
  function openDashboard(user) {
    const root = ReactDOM.createRoot(document.getElementById("root"));

    // rendering Dashboard WITH PROPS
    root.render(
      <Dashboard name={user.name} age={user.age} />
    );
  }
  
  return (
    <>
    <Registration sendUser={openDashboard}/>
     
    </>
  )
}

export default App
