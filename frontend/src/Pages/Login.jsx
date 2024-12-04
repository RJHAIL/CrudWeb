import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { post } from '../../services/ApiEndPoint';

export default function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request= await post('/auth/login',value);
      const response= request.data
      if (response.success) {
        toast.success(response.message)
         
        navigate('/')
     }
     console.log(response)
   } catch (error) {
     if (error.response) {
       toast.error(error.response.data.message)
     
     }
     console.log('error',error)
   }
}

  return (
    <div className='container min-vh-100 d-flex justify-content-center align-items-center'>
      <div className='form-container border shadow p-5 rounded-4 bg-white'>
        <h2 className='text-center mb-4 fw-bold'>Login</h2>
        <form className='d-flex flex-column' onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="form-group mb-3">
            <label htmlFor="email" className='form-label'>Email</label>
            <input
              type="email"
              value={value.email}
              onChange={handleChange}
              name='email'
              className="form-control"
              placeholder="Email"
              required
            />
          </div>

          {/* Password Input */}
          <div className='form-group mb-3'>
            <label htmlFor="password" className='form-label'>Password</label>
            <input
              type="password"
              value={value.password}
              onChange={handleChange}
              name='password'
              className='form-control'
              placeholder='Enter your password'
              required
            />
          </div>

          {/* Submit Button */}
          <button className='btn btn-success w-100 mb-3'>Login</button>

          {/* Link to Register */}
          <div className='text-center'>
            <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
