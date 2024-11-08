import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ExpenseTracker from './components/expenseTracker';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav>
          <Link to="/">Home</Link> | @ Expence Tracker 2024
        </nav>
        <Routes>
          <Route path="/" element={<ExpenseTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
