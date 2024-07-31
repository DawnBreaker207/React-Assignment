import { ReactNode } from 'react';
import { CartState } from '../../reducers/cartReducer';

export type CartItem = {
  userProduct: string;
  quantity: number;
  price: number;
};

export interface CartTypeInput {
  userId: string | undefined;
  userProduct: string;
  quantity: number;
  price: number;
}
export type CartTypeUser = Pick<CartTypeInput, 'userId'>;
export enum CartActionCase {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  REMOVE_CART = 'REMOVE_CART',
  UPDATE_QUANTITY = 'UPDATE_QUANTITY',
  SET_CART = 'SET_CART',
  SET_SUBTOTAL = 'SET_SUBTOTAL',
  SET_QUANTITY_TOTAL = 'SET_QUANTITY_TOTAL',
  SET_SHIPPING_FEE = 'SET_SHIPPING_FEE',
}
export interface ADD_TO_CART {
  type: CartActionCase.ADD_TO_CART;
  payload: CartItem;
}
export interface REMOVE_FROM_CART {
  type: CartActionCase.REMOVE_FROM_CART;
  payload: Pick<CartItem, 'userProduct'>;
}
export interface REMOVE_CART {
  type: CartActionCase.REMOVE_CART;
}
export interface UPDATE_QUANTITY {
  type: CartActionCase.UPDATE_QUANTITY;
  payload: Pick<CartItem, 'userProduct' | 'quantity'>;
}
export interface SET_CART {
  type: CartActionCase.SET_CART;
  payload: CartState;
}
export interface SET_SUBTOTAL {
  type: CartActionCase.SET_SUBTOTAL;
  payload: number;
}
export interface SET_QUANTITY_TOTAL {
  type: CartActionCase.SET_QUANTITY_TOTAL;
  payload: number;
}
export interface SET_SHIPPING_FEE {
  type: CartActionCase.SET_SHIPPING_FEE;
  payload: number;
}
export type Cart_Action_Type =
  | ADD_TO_CART
  | REMOVE_FROM_CART
  | UPDATE_QUANTITY
  | SET_CART
  | SET_SUBTOTAL
  | SET_QUANTITY_TOTAL
  | SET_SHIPPING_FEE
  | REMOVE_CART;

export type cartContextType = {
  state: CartState;
  dispatch: React.Dispatch<Cart_Action_Type>;
  addToCart: (data: CartTypeInput) => Promise<void>;
  removeFromCart: (data: CartTypeInput) => Promise<void>;
  removeCart: (data: string) => Promise<void>;
  increaseQuantity: (data: CartTypeInput) => Promise<void>;
  decreaseQuantity: (data: CartTypeInput) => Promise<void>;
  setShippingFee: (fee: number) => void;
};
export type useCartProviderProps = {
  children: ReactNode;
};
