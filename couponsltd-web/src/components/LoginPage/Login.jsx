import { React, useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import config from './../../config';
async function loginUser(credentials) {
  return fetch(config.ApiRootUrl + 'users/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setIsLoading(false);
    setToken(token);
  };

  const loginBtn = isLoading ? (
    <button className='btn btn-primary btn-block mt-2' type='button' disabled>
      <span className='spinner-border spinner-border-sm'></span>
      Loading...
    </button>
  ) : (
    <button type='submit' className='btn btn-primary btn-block mt-2'>
      Log in
    </button>
  );

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <h2 className='text-center'>Log in</h2>
        <div className='form-group mb-2'>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type='text'
            className='form-control'
            placeholder='Username'
            required='required'
          ></input>
        </div>
        <div className='form-group'>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            className='form-control'
            placeholder='Password'
            required='required'
          ></input>
        </div>
        <div className='form-group d-flex justify-content-center'>
          {loginBtn}
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
