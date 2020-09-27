import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {render, fireEvent, screen, getByTestId} from '@testing-library/react';

import NavigationItems, { NavigationItemsProps } from './NavigationItems';

const mockProps = () => ({
  clicked: () => {},
  showCart: true
});

describe('NavigationItems Test Props Set 1', () => {

  let props: NavigationItemsProps;

  beforeEach(() => {
    props = mockProps();
    render(
      <BrowserRouter>
        <NavigationItems clicked={props.clicked} showCart={props.showCart}/>
      </BrowserRouter>
    );
  });

  test('Should render "Products" navigation item', () => {
    const productsNavItem = screen.queryByText('Products');
    expect(productsNavItem).toBeTruthy();
  });

  test('Should render "Wish List" navigation item', () => {
    const wishListNavItem = screen.queryByText('Wish List');
    expect(wishListNavItem).toBeTruthy();
  });

  test('Should render "My Cart" navigation item', () => {
    const cartNavItem = screen.queryByText('My Cart');
    expect(cartNavItem).toBeTruthy();
  });

});

describe('NavigationItems Test Props Set 2', () => {

  let container: HTMLElement;
  let mockClickedFn = jest.fn(() => {});

  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <NavigationItems clicked={mockClickedFn} showCart={false}/>
      </BrowserRouter>
    ).container;
  });

  test('Should not render cart navigation item if prop showCart is false', () => {
    const cartNavItem = screen.queryByText('My Cart');
    expect(cartNavItem).toBeFalsy();
  });

  test('Should call clicked prop when click performed in navigation items container', () => {
    const navItemsContainer = getByTestId(container, 'nav-items-container');
    fireEvent.click(navItemsContainer);
    expect(mockClickedFn.mock.calls.length).toBe(1);
  });

});