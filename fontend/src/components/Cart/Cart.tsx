import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import './cart.css';

const Cart = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const addToCartHandler = () => {
    window.location.href = '/checkout';
  }

  return (
    <div className="container">
      <main className="main">
        <div className="box-left">
          <table>
            <thead>
              <tr>
                <th style={{ width: '15%' }}></th>
                <th style={{ width: '15%' }}>Product</th>
                <th style={{ width: '20%' }}>Price</th>
                <th style={{ width: '20%' }}>Quantity</th>
                <th style={{ width: '10%' }}>Subtotal</th>
                <th style={{ width: '10%' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src={queryParams.image} alt={queryParams.name} />
                </td>
                <td style={{ color: '#9F9F9F' }}>{queryParams.name}</td>
                <td style={{ color: '#9F9F9F' }}>{queryParams.price}</td>
                <td>1</td>
                <td>{queryParams.price}</td>
                <td><i className="fa-solid fa-trash" style={{ color: 'red' }}></i></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="box-right">
          <div className="title">
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Cart Totals</h2>
          </div>
          <div className="subtotal">
            <p>Subtotal {queryParams.price}</p>
          </div>
          <div className="total">
            <p>Total  {queryParams.price}</p>
          </div>
          <Link to="/checkout">
            <p onClick={addToCartHandler}>Check out</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Cart;
