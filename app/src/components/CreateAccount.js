
// src/components/CreateAccount.js

import { Button, /* TextField, */ Typography } from '@mui/material';
// CI is failing due to ESLint "no-unused-vars" for TextField.
// Commented out until you actually use <TextField /> components.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: 'donor',
    name: '',
    email: '',
    password: '',
    phone_number: '',
    location: '',
  });

  // Disable the button if any required fields are empty.
  let buttonStatus = true;
  if (
    formData.name === '' ||
    formData.email === '' ||
    formData.password === '' ||
    formData.phone_number === '' ||
    formData.location === ''
  ) {
    buttonStatus = false;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/create_user', formData);
      if (response?.data?.status) {
        navigate('/');
      } else {
        alert(response?.data?.message || 'Unable to create account.');
      }
    } catch (error) {
      console.error('Account creation error: ', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="myBackgroundCreateAccount">
      <div className="create-account-page page">
        <Typography variant="h5">Create Account</Typography>

        <div className="input_create_account_div">
          {/* Consider replacing these with MUI <TextField /> components later. */}
          <input
            className="input_field_class"
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Name"
            required
          />
          <input
            className="input_field_class"
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="input_field_class"
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
            required
          />
          {/* Tip: phone numbers are not strictly numeric (leading zero, +country code). Use type="tel". */}
          <input
            className="input_field_class"
            name="phone_number"
            onChange={handleChange}
            type="tel"
            placeholder="Phone"
            required
          />
          <input
            className="input_field_class"
            name="location"
            onChange={handleChange}
            type="text"
            placeholder="Location"
            required
          />

          <label>
            <input
              type="radio"
              name="role"
              value="donor"
              checked={formData.role === 'donor'}
              onChange={handleChange}
            />{' '}
            Donor
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="recipient"
              checked={formData.role === 'recipient'}
              onChange={handleChange}
            />{' '}
            Recipient
          </label>
        </div>

        <Button
          className="buttonLogin"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!buttonStatus}
        >
          Create Account
        </Button>

        <Button
          className="buttonLogin"
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default CreateAccount;
