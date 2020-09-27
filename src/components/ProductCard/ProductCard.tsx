import React, { FunctionComponent } from 'react';

import Product from '../../models/Product';
import CartProduct from '../../models/CartProduct';
import WishButton from '../shared/WishButton/WishButton';
import { useStore } from '../../hooks-store/store';
import { CartActions } from '../../hooks-store/cart-store';

import './ProductCard.scss';

type ProductCardProps = {
  toggleFavorite: (productId: string) => void;
  product: Product;
};

const ProductCard: FunctionComponent<ProductCardProps> = ({
  product,
  toggleFavorite
}) => {

  const [state, dispatch] = useStore();

  const addToCart = () => {
    dispatch(CartActions.ADD_ITEM, product);
  };

  const disableAddButon = () => {
    return !product.stock || state.cartProducts.some((p: CartProduct) => p.product.id === product.id);
  }

  return (
    <div className="product-card">
      <WishButton active={product.favorite} clicked={() => { toggleFavorite(product.id) }} />
      <img src={product.image_url} alt={product.productName}/>
      <div className="product-info">
        <div>
          <div className="product-header">
            <span className="title">{product.productName}</span>
            <span>${product.price}</span>
          </div>
          <span className="description">
            {product.productDescription}
          </span>
        </div>
        <div className="product-footer">
          {
            product.stock ?
              <div className="in-stock">
                In Stock: <span>{product.stock}</span>
              </div> : 
              <div className="out-stock">
                Out of Stock
              </div>
          }
          <button 
            disabled={disableAddButon()}
            onClick={addToCart}
            className="add-button">
              + Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;