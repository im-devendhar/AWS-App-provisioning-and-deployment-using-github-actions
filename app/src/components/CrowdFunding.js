
// src/components/CrowdFunding.js

import { Button, /* TextField, */ Typography } from '@mui/material';
// CI fails due to ESLint "no-unused-vars" when imports aren’t used.
// Commented out TextField until you actually use MUI <TextField />.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Unused right now because the POST is commented out.

const CrowdFunding = (props) => {
  const { foodListClickHandler } = props;
  const navigate = useNavigate();

  const [donation, setDonation] = useState({
    donor_email: '',
    amount: 0,
    note: '',
  });

  // Disable the button if required fields are empty.
  // NOTE: donation.amount is a number; comparing to "" will never be true.
  // You can optionally use: (!donation.donor_email || !donation.amount) or Number(donation.amount) <= 0
  let buttonStatus = true;
  if (donation.donor_email === '' || donation.amount === '') {
    buttonStatus = false;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDonation({ ...donation, [name]: value });
  };

  const handleSubmit = async () => {
    // If you re-enable the POST below, also re-enable the axios import at the top.
    // try {
    //   await axios.post('http://127.0.0.1:5000/donate_money', donation);
    alert('Donation successful.');
    // } catch (error) {
    //   console.error('Donation error: ', error);
    //   alert('Error making donation.');
    // }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const donorhandler = () => {
    navigate('/donor');
  };

  const ViewListFunc = (user) => {
    navigate('/food-list');
    foodListClickHandler(user);
  };

  return (
    <div className="CrowdFundBackground">
      <div className="recipient-page page">
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

        <Typography variant="h5">Crowdfunding Form</Typography>

        {/* Consider type="email" for donor_email and validating amount > 0 */}
        <input
          className="input_field_class_donor"
          name="donor_email"
          onChange={handleChange}
          type="text"
          placeholder="Email"
          required
        />
        <input
          className="input_field_class_donor"
          name="amount"
          onChange={handleChange}
          type="number"
          placeholder="Amount"
          required
        />
        <input
          className="input_field_class_donor"
          name="note"
          onChange={handleChange}
          type="text"
          placeholder="Note(Optional)"
        />

        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!buttonStatus}>
          Submit
        </Button>
        <Button variant="contained" color="primary" onClick={donorhandler}>
          Donate
        </Button>
      </div>
    </div>
  );
};

export default CrowdFunding;
