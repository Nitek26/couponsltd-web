import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppConfig from './../../config';

export default function Coupons(props) {
  const [coupons, setCoupons] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [promoCodes, setPromoCodes] = useState({});

  useEffect(() => {
    axios
      .post(
        AppConfig.ApiRootUrl + 'coupons/searchcoupons',
        { text: searchText, skip: 0, limit: 10, orderBy: 0 },
        {
          headers: { Authorization: `Bearer ${props.token.token}` },
        }
      )
      .then((response) => {
        setCoupons(response.data.result.items);
      })
      .catch(console.log);
  }, [searchText]);

  const handlePromoCode = (id, code) => {
    let codes = { ...promoCodes };
    codes[id] = code;
    setPromoCodes(codes);
  };

  async function handleActivate(couponId, e) {
    e.preventDefault();

    let promoCode = promoCodes[couponId];
    axios
      .post(
        `${AppConfig.ApiRootUrl}coupons/activatebonus/${couponId}/${promoCode}`,
        { text: searchText, skip: 0, limit: 10, orderBy: 0 },
        {
          headers: { Authorization: `Bearer ${props.token.token}` },
        }
      )
      .then((response) => {
        let newCoupons = [...coupons];
        var activatedArr = newCoupons.map((c) => {
          var coupon = { ...c };
          if (c.id === couponId) {
            coupon.isActived = true;
          }
          return coupon;
        });

        setCoupons(activatedArr);
      })
      .catch(console.log);
  }

  let couponsList = coupons?.map((c, index) => {
    return (
      <div className='card mt-4' key={c.id}>
        <div className='card-body'>
          <div className='row'>
            <div className='col-4'>
              <h5>{c.name}</h5>
              <p>{c.description}</p>
            </div>
            <div className='col-8 d-flex flex-column justify-content-center'>
              <form className='form-inline d-flex'>
                {!c.isActived ? (
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter Promo Code'
                    onChange={(e) => handlePromoCode(c.id, e.target.value)}
                  ></input>
                ) : (
                  <input
                    disabled
                    type='text'
                    className='form-control'
                    placeholder='Already active Promo Code'
                  ></input>
                )}
                <div className='ml-2'>
                  {c.isActived ? (
                    <button className='btn btn-success disabled'>
                      Activated
                    </button>
                  ) : (
                    <button
                      type='submit'
                      className='btn btn-primary'
                      onClick={(e) => handleActivate(c.id, e)}
                    >
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
        <form className='form-inline d-flex'>
          <input
            type='text'
            className='form-control'
            placeholder='Search'
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <div className='ml-2'></div>
        </form>
        {couponsList}
      </>
    ) : (
      <div className='d-flex justify-content-center'>
        <div className='spinner-grow text-primary' role='status'></div>
        <span className='sr-only'>Loading...</span>
      </div>
    );

  return (
    <div className='d-flex justify-content-center mt-4'>
      <div className='w-50'>{content}</div>
    </div>
  );
}
