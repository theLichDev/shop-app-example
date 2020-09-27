import React, { FunctionComponent, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoIosCart } from 'react-icons/io';

import Wrapper from '../../../hoc/Wrapper/Wrapper';
import { useStore } from '../../../hooks-store/store';
import CartItem from '../../../components/CartItem/CartItem';
import CartProduct from '../../../models/CartProduct';

import './SimpleShoppingCart.scss';

const SimpleShoppingCart: FunctionComponent = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [state] = useStore();

  const toggleCart = () => {
    setOpen(!open);
  };

  const getTotalAmount = () => {
    return state.cartProducts.reduce((accumulated: number, p: CartProduct) => {
      return accumulated += p.product.price * p.quantity;
    }, 0);
  };

  return (
    <div className={`simple-shopping-cart ${open ? 'simple-cart-open' : 'simple-cart-close'}`}>
      <div className="simple-cart-toggle" onClick={toggleCart}>
        {
          open ?
            <IoMdClose />
            : <Wrapper>
                <IoIosCart />
                { 
                  state.cartProducts.length 
                    ? <div className="total-products">
                        {state.cartProducts.length}
                      </div> 
                    : null
                }
              </Wrapper>
        }
      </div>
      <div>
        <div className="simple-cart-header">My Cart</div>
        <div className="simple-cart-content">
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
      <div className="simple-cart-footer">
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

export default SimpleShoppingCart;
