import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseModal from './addExpenseForm';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [modalShow, setModalShow] = useState(false);


  // Fetch expenses from the JSON server
  const fetchItems = async () => {
    try {
      await axios.get('http://localhost:5000/expenses')
      .then(response => setExpenses(response.data))
      .catch(error => console.error('Error fetching expenses:', error));
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Fetch data from JSON Server
  useEffect(() => {
    fetchItems();
  }, []);

  // Callback to handle new entry
  const handleNewEntry = () => {
    fetchItems(); // Re-fetch the items to get the updated list
  };

  const totalAmount = expenses.reduce((sum, expense) => parseFloat(sum) + parseFloat(expense.price), 0);
  const rahulPaid = expenses.filter(e => e.payee === 'Rahul').reduce((sum, e) =>  parseFloat(sum) + parseFloat(e.price), 0);
  const rameshPaid = expenses.filter(e => e.payee === 'Ramesh').reduce((sum, e) =>  parseFloat(sum) + parseFloat(e.price), 0);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-success">Expense Tracker</h2>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Product Purchased</th>
            <th>Price</th>
            <th>Payee</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="table-warning">{expense.date}</td>
              <td className="table-info">{expense.product}</td>
              <td className="table-primary">{expense.price}</td>
              <td className="table-secondary">{expense.payee}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row mt-4">
        <div className="col text-primary">Total: <span className="text-success">{parseFloat(totalAmount)}</span></div>
        <div className="col text-info">Rahul Paid: <span className="text-dark">{parseFloat(rahulPaid)}</span></div>
        <div className="col text-muted">Ramesh Paid: <span className="text-dark">{parseFloat(rameshPaid)}</span></div>
      </div>

      <div className="text-center mt-5">
            <button className="btn btn-primary" onClick={() => setModalShow(true)}>
                Add New Expense
            </button>
            <ExpenseModal show={modalShow} onHide={() => {setModalShow(false);
              handleNewEntry()}
            } />
        </div>
    </div>
  );
};

export default ExpenseTracker;
