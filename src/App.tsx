import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import ProductsList from './containers/ProductsList/ProductsList';
import WishList from './containers/WishList/WishList';
import FullShoppingCart from './containers/ShoppingCart/FullShoppingCart/FullShoppingCart';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Redirect to="/products"></Redirect>
          </Route>
          <Route path="/products">
            <ProductsList />
          </Route>
          <Route path="/wish-list">
            <WishList />
          </Route>
          <Route path="/my-cart">
            <FullShoppingCart />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
