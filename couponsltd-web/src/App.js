import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './components/LoginPage/Login';
import Coupons from './components/CouponPage/Coupon';

function App() {
  const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className='wrapper'>
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path='/coupons'>
            <Coupons />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
