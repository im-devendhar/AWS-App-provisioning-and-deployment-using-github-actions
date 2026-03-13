
// src/App.js

import React, { /* useEffect, */ useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  // CI fails on no-unused-vars; comment out until used.
  /* useNavigate */
} from 'react-router-dom';
import './App.css';

import LoginPage from './components/Login';
import CreateAccount from './components/CreateAccount';
import DonorPage from './components/Donor';
import RecipientPage from './components/Recipient';
import CrowdFunding from './components/CrowdFunding';
import axios from 'axios';
import FoodTable from './components/FoodTable';

function App() {
  const [json, setJson] = useState({});
  const [user, setuser] = useState('');

  /**
   * Handles click to fetch food list.
   * Alignment:
   * - Pass only the payload to FoodTable via setJson(response.data).
   * - Track who triggered the query to drive isRecipient accurately.
   */
  const foodListClickHandler = async (userType) => {
    const userBool = userType === 'donor' ? false : true; // donor => not requesting food
    const rawData = { donate_food: userBool };

    try {
      const response = await axios.post('http://127.0.0.1:5000/get_food_list', rawData);
      // Send only the data payload to components
      setJson(response.data);
    } catch (error) {
      console.error('Food list creation error: ', error);
      alert('Error submitting food donation.');
    }

    setuser(userType);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route
          path="/donor"
          element={<DonorPage foodListClickHandler={foodListClickHandler} />}
        />
        <Route
          path="/recipient"
          element={<RecipientPage foodListClickHandler={foodListClickHandler} />}
        />
        <Route
          path="/crowdfunding"
          element={<CrowdFunding foodListClickHandler={foodListClickHandler} />}
        />
        <Route
          path="/food-list"
          element={
            <FoodTable
              foodList={json}
              // True only for recipients; false for donors
              isRecipient={user === 'recipient'}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
