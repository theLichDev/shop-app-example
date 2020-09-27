import React, { FunctionComponent, useState, useEffect } from 'react';
import { Redirect, NavLink } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';

import { useStore } from '../../../hooks-store/store';
import CartItem from '../../../components/CartItem/CartItem';
import CartProduct from '../../../models/CartProduct';

import './FullShoppingCart.scss';

const FullShoppingCart: FunctionComponent = () => {

  const [width, setWidth] = useState(window.innerWidth);
  const [state] = useStore();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getTotalAmount = () => {
    return state.cartProducts.reduce((accumulated: number, p: CartProduct) => {
      return accumulated += p.product.price * p.quantity;
    }, 0);
  };

  return (
    width > 736
    ? <Redirect to="/products"/>
    : <div className="full-shopping-cart">
        <div className="arrow-back">
          <NavLink to="/products">
            <IoIosArrowBack />
          </NavLink>
        </div>
        <div>
          <div className="full-cart-header">My Cart</div>
          <div className="full-cart-content">
            {
              state.cartProducts.map(
                (cartProduct: CartProduct) => 
                  <CartItem
                    key={cartProduct.product.id}
                    product={cartProduct.product}
                    quantity={cartProduct.quantity}
                  />
              )
            }
          </div>
        </div>
        <div className="full-cart-footer">
          <div className="total">
            <span>Total Amount: </span>${getTotalAmount()}
          </div>
          <button
            onClick={() => { alert(`Checkout - Total Amount: $${getTotalAmount()}`)}}
            className="checkout-button">
              Checkout
          </button>
        </div>
      </div>
  );

}

export default FullShoppingCart;
