import React, { FunctionComponent, MouseEvent } from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.scss';

export type NavigationItemsProps = {
  clicked?: (event: MouseEvent) => void,
  showCart?: boolean
}

const NavigationItems: FunctionComponent<NavigationItemsProps> = (props) => (
  <ul data-testid="nav-items-container" className="navigation-items" onClick={props.clicked}>
    <NavigationItem link="/products">Products</NavigationItem>
    <NavigationItem link="/wish-list">Wish List</NavigationItem>
    { props.showCart ? <NavigationItem link="/my-cart">My Cart</NavigationItem> : null }
  </ul>
);

export default NavigationItems;