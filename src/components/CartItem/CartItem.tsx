import React, { FunctionComponent } from 'react';
import { TiDelete } from 'react-icons/ti';
import { FiPlus, FiMinus } from 'react-icons/fi';

import CartProduct from '../../models/CartProduct';
import { useStore } from '../../hooks-store/store';
import { CartActions } from '../../hooks-store/cart-store';

import './CartItem.scss';

const CartItem: FunctionComponent<CartProduct> = ({ product, quantity }) => {

  const dispatch = useStore()[1];

  const removeItem = () => {
    dispatch(CartActions.REMOVE_ITEM, product.id);
  };

  const updateQuantity = (newQuantity: number) => {
    dispatch(
      CartActions.UPDATE_QUANTITY,
      {
        productId: product.id,
        newQuantity
      }
    );
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity - 1;
    if (newQuantity <= 0) {
      removeItem();
    } else {
      updateQuantity(newQuantity);
    }
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    if (newQuantity <= product.stock) {
      updateQuantity(newQuantity);
    }
  };

  return (
  <div className="cart-item">
    <div className="row align-center">
      <div className="cart-item-delete" onClick={removeItem}>
        <TiDelete />
      </div>
      <img src={product.image_url} alt={product.productName}/>
      <div className="cart-info">
        <div className="cart-info-title">
          {product.productName}
        </div>
        <div className="cart-item-quantity">
          <span>Quantity:</span>
          <FiMinus
            className={"icon-button"}
            onClick={decreaseQuantity} />
          <div data-testid="quantity" className="quantity-value">
            {quantity}
          </div>
          {
            quantity !== product.stock ?
            <FiPlus
              className="icon-button"
              onClick={increaseQuantity} />
            : null
          }
          <div className="base-price">
            x ${product.price}
          </div>
        </div>
      </div>
    </div>
    <div data-testid="subtotal" className="cart-item-subtotal">
      ${product.price * quantity}
    </div>
  </div>
  );
}

export default CartItem;