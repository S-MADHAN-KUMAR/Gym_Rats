import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RegisterStart, RegisterSuccess, RegisterFailure } from '../../redux/user/userSlice.js';
import { registerValidate } from './helpers/validations.js';
import axios from 'axios'; 
import GoogleAuthBtn from '../../components/user/GoogleAuthBtn.jsx';
import {showToast} from '../../helpers/toast.js'

const RegisterPage = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = registerValidate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    dispatch(RegisterStart());

    try {
      console.log(formData);

      const response = await axios.post('http://localhost:3000/user/register', formData);

      if (response.status === 200) {
        showToast('OTP sent to your email. Please check and verify!', 'success');
        dispatch(RegisterSuccess(response.data));
        setIsOpenPopup(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);

      const errorMessage =
        error.response?.data?.message || 'An unexpected error occurred!';
      dispatch(RegisterFailure({ message: errorMessage }));
      showToast(errorMessage, 'error');
    }
  };

  return (
    <div className="flex justify-between items-center min-h-screen bg-gray-50 px-6 md:px-12">
      {/* Form Section */}
      <div className="w-full md:w-1/2 max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="flex">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
            Register
          </button>

          <div className="">
          <GoogleAuthBtn/>
          </div>
              </div>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden md:block w-1/2">
        <img
          src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4685.jpg"
          alt="Secure Login"
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default RegisterPage;