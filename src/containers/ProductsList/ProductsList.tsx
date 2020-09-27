import React, { useState, useEffect, FunctionComponent } from 'react';

import Product from '../../models/Product';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import ProductCard from '../../components/ProductCard/ProductCard';
import API from '../../Api';

import './ProductsList.scss';

const ProductsList: FunctionComponent = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const products = await API.products.get(page);
        setProducts((prevProducts) => {
          return [...prevProducts, ...products];
        });
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const appContent = document.getElementById('app-content');
    const handleScroll = () => {
      if (appContent) {
        if (appContent.offsetHeight + appContent.scrollTop === appContent.scrollHeight) {
          setPage(prevPage => prevPage + 1);
        }
      }
    }
    appContent?.addEventListener('scroll', handleScroll);
    return () => appContent?.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = (productId: string) => {
    const productIndex = products.findIndex(p => p.id === productId);
    const updatedFavorite = products[productIndex].favorite ? 0 : 1;
    const updateData = async () => {
      try {
        await API.products.update(
          productId,
          { favorite: updatedFavorite }
        );
        const updatedProducts = [...products];
        updatedProducts[productIndex] = {
          ...products[productIndex],
          favorite: updatedFavorite
        }
        setProducts(updatedProducts);
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
            {products.map(product => 
              <ProductCard
                toggleFavorite={toggleFavorite}
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
export default ProductsList;