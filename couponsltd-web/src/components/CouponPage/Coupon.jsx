import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppConfig from './../../config';

export default function Coupons(props) {
  const [coupons, setCoupons] = useState(null);

  useEffect(() => {
    debugger;
    axios
      .post(
        AppConfig.ApiRootUrl + 'coupons/searchcoupons',
        { text: 'google', skip: 0, limit: 10, orderBy: 0 },
        {
          headers: { Authorization: `Bearer ${props.token.token}` },
        }
      )
      .then((response) => {
        setCoupons(response.data.result.items);
      })
      .catch(console.log);
  }, []);

  let couponsList = coupons?.map((c, index) => {
    return (
      <div class='card mt-4'>
        <div class='card-body'>
          <div className='row'>
            <div className='col-4'>
              <h5>{c.name}</h5>
              <p>{c.description}</p>
            </div>
            <div className='col-8 d-flex flex-column justify-content-center'>
              <form class='form-inline d-flex'>
                <input
                  type='text'
                  class='form-control'
                  placeholder='Enter Promo Code'
                ></input>
                <div className='ml-2'>
                  {c.isActived ? (
                    <button class='btn btn-success disabled'>Activated</button>
                  ) : (
                    <button type='submit' class='btn btn-primary'>
                      Activate
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  });

  let content =
    coupons != null ? (
      <>
        <h3 className=''>
          Coupons for user: {props.token.firstName} {props.token.lastName}
        </h3>
        {couponsList}
      </>
    ) : (
      <div class='d-flex justify-content-center'>
        <div class='spinner-grow text-primary' role='status'></div>
        <span class='sr-only'>Loading...</span>
      </div>
    );

  return (
    <div className='d-flex justify-content-center mt-4'>
      <div className='w-50'>{content}</div>;
    </div>
  );
}
