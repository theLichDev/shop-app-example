import React, { useState, useEffect, FunctionComponent } from 'react';

import Product from '../../models/Product';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import ProductCard from '../../components/ProductCard/ProductCard';
import API from '../../Api';

import './WishList.scss';

const WishList: FunctionComponent = () => {

  const [wishProducts, setWishProducts] = useState<Product[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const wishProducts = await API.products.getFavorites()
        setWishProducts(wishProducts);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  const removeFavorite = (productId: string) => {
    const updateData = async () => {
      try {
        await API.products.update(
          productId,
          { favorite: 0 }
        );
        const updatedProducts = wishProducts.filter(p => p.id !== productId);
        setWishProducts(updatedProducts);
      } catch {
        setError(true);
      }
    }
    updateData();
  };

  return (
    <Wrapper>
      { 
        error ? 
          <div className="http-error">Something went wrong...</div> : 
          <div className="products-container">
            {wishProducts.map(product =>
              <ProductCard
                toggleFavorite={removeFavorite}
                product={product}
                key={product.id}
              >
              </ProductCard>
            )}
          </div>
      }
    </Wrapper>
  );

}
export default WishList;