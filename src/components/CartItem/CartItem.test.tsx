import React from 'react';
import {render, fireEvent, getByTestId} from '@testing-library/react';

import CartItem from './CartItem';
import CartProduct from '../../models/CartProduct';

const mockProps = () => ({
  product: {
    id: "aaaaa-bbbbb-cccc-ddd-eeeeeeeeee",
    image_url: "mock-link-to-image",
    stock: 4,
    productName: "Mock Product Name",
    price: 15,
    productDescription: "Sunt molestias qui quod recusandae nemo quia optio",
    favorite: 1
  },
  quantity: 2 
});

describe('CartItem Tests', () => {

  let props: CartProduct;
  let container: HTMLElement;

  beforeEach(() => {
    props = mockProps();
    container = render(<CartItem product={props.product} quantity={props.quantity}/>).container;
  });

  test('Should render quantity received by props', () => {
    const quantityEl = getByTestId(container, 'quantity');
    expect(quantityEl.innerHTML).toBe(`${props.quantity}`);
  });

  test('Should render correct subtotal amount', () => {
    const subtotalEl = getByTestId(container, 'subtotal');
    expect(subtotalEl.innerHTML).toBe(`$${props.quantity * props.product.price}`);
  });

}); 