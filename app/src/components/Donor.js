
// src/components/Donor.js

import { Button, /* TextField, */ Typography } from '@mui/material';
// CI fails due to ESLint "no-unused-vars" for TextField.
// Commented out until you actually use MUI <TextField /> components.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DonorPage = (props) => {
  const { foodListClickHandler } = props;
  const navigate = useNavigate();

  const [foodDetails, setFoodDetails] = useState({
    food_name: '',
    location: '',
    phone_number: '',
    donate_food: true,
  });

  // Disable submit if required fields are empty.
  let buttonStatus = true;
  if (
    foodDetails.food_name === '' ||
    foodDetails.location === '' ||
    foodDetails.phone_number === ''
  ) {
    buttonStatus = false;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFoodDetails({ ...foodDetails, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/create_food_list', foodDetails);
      alert('Food donation submitted successfully.');
    } catch (error) {
      console.error('Food list creation error: ', error);
      alert('Error submitting food donation.');
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const crowdFundingOnClikc = () => {
    navigate('/crowdfunding');
  };

  const ViewListFunc = (user) => {
    navigate('/food-list');
    foodListClickHandler(user);
  };

  return (
    <div className="donorbacground">
      <div className="donor-page page">
        <header className="logout_session_div">
          <Button
            className="logout_button"
            variant="outlined"
            color="inherit"
            onClick={() => ViewListFunc('donor')}
          >
            View List
          </Button>
          <Button
            className="logout_button"
            variant="outlined"
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </header>

        <Typography variant="h5">Donate Food</Typography>

        <input
          className="input_field_class_donor"
          type="text"
          name="food_name"
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          className="input_field_class_donor"
          type="text"
          name="location"
          onChange={handleChange}
          placeholder="Area"
          required
        />
        {/* Tip: phone numbers can include +country code and leading zeros; consider type="tel" */}
        <input
          className="input_field_class_donor"
          type="text" /* or type="tel" */
          name="phone_number"
          onChange={handleChange}
          placeholder="Contact"
          required
        />

        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!buttonStatus}>
          Submit
        </Button>

        <Button variant="text" color="primary" onClick={crowdFundingOnClikc}>
          Crowdfunding
        </Button>
      </div>
    </div>
  );
};

export default DonorPage;
