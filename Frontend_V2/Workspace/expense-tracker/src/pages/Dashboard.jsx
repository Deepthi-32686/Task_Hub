import { useState, useEffect } from "react";
import ExpenseList from "../components/ExpenseList";
import Summary from "../components/Summary";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses"));
    if (stored) setExpenses(stored);
  }, []);

  return (
  <div className="container">
    <h1>Expense Dashboard</h1>
    <Summary expenses={expenses} />
    <ExpenseList expenses={expenses} />
  </div>
);
};

export default Dashboard;