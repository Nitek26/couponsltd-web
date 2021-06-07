import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppConfig from './../../config';

export default function Coupons(props) {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    axios
      .post(
        AppConfig.ApiRootUrl + 'coupons/searchcoupons',
        { text: 'google', skip: 0, limit: 10, orderBy: 0 },
        {
          headers: { Authorization: `Bearer ${props.token.token}` },
        }
      )
      .then((response) => {
        debugger;
        setCoupons(response.data.result.items);
        console.log(response.data);
      })
      .catch(console.log);
  }, []);

  return <h2>Coupons: {JSON.stringify(coupons)}.</h2>;
}
