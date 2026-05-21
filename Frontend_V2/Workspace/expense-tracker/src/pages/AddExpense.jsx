import { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";

const AddExpense = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses"));
    if (stored) setExpenses(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

 return (
  <div className="container">
    <h1>Add Expense</h1>
    <ExpenseForm onAdd={addExpense} />
  </div>
);
};

export default AddExpense;