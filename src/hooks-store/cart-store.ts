import { initStore, StoreActions } from './store';
import { GlobalState } from './store';
import Product from '../models/Product';
import CartProduct from '../models/CartProduct';

export const CartActions = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
}

interface CartStoreState extends GlobalState {
  cartProducts: CartProduct[];
}

const actions: StoreActions = {
  [CartActions.ADD_ITEM]: (
    currState: CartStoreState,
    newProduct: Product
  ) => {
    const updatedCartProducts = [
      ...currState.cartProducts,
      { product: { ...newProduct }, quantity: 1 }
    ];
    return { cartProducts: updatedCartProducts };
  },
  [CartActions.REMOVE_ITEM]: (
    currState: CartStoreState,
    productId: string
  ) => {
    const updatedCartProducts = currState.cartProducts.filter(p => p.product.id !== productId);
    return { cartProducts: updatedCartProducts };
  },
  [CartActions.UPDATE_QUANTITY]: (
    currState: CartStoreState,
    payload: { productId: string, newQuantity: number }
  ) => {
    const productIndex = currState.cartProducts.findIndex(p => p.product.id === payload.productId);
    const updatedCartProducts = [...currState.cartProducts];
    updatedCartProducts[productIndex] = {
      ...currState.cartProducts[productIndex],
      quantity: payload.newQuantity
    }
    return { cartProducts: updatedCartProducts };
  }
};

export const configureStore = () => {
  const initialState = JSON.parse(localStorage.getItem('state') || 'null') || { cartProducts: [] };
  initStore(actions, initialState);
}

export default configureStore;
 