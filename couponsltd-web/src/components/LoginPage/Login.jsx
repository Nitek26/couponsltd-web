import { React, useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import config from './../../config';
async function loginUser(credentials) {
  return fetch(config.ApiRootUrl + '/users/authenticate', {
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
    setToken(token);
    setIsLoading(false);
  };

  const loginBtn = isLoading ? (
    <button class='btn btn-primary btn-block mt-2' type='button' disabled>
      <span class='spinner-border spinner-border-sm'></span>
      Loading...
    </button>
  ) : (
    <button type='submit' class='btn btn-primary btn-block mt-2'>
      Log in
    </button>
  );

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <h2 class='text-center'>Log in</h2>
        <div class='form-group mb-2'>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type='text'
            class='form-control'
            placeholder='Username'
            required='required'
          ></input>
        </div>
        <div class='form-group'>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            class='form-control'
            placeholder='Password'
            required='required'
          ></input>
        </div>
        <div class='form-group d-flex justify-content-center'>{loginBtn}</div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
