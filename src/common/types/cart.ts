import { ReactNode } from 'react';

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
  UPDATE_QUANTITY = 'UPDATE_QUANTITY',
  SET_CART = 'SET_CART',
}
export interface ADD_TO_CART {
  type: CartActionCase.ADD_TO_CART;
  payload: CartItem;
}
export interface REMOVE_FROM_CART {
  type: CartActionCase.REMOVE_FROM_CART;
  payload: Pick<CartItem, 'userProduct'>;
}
export interface UPDATE_QUANTITY {
  type: CartActionCase.UPDATE_QUANTITY;
  payload: Pick<CartItem, 'userProduct' | 'quantity'>;
}
export interface SET_CART {
  type: CartActionCase.SET_CART;
  payload: CartItem[];
}
export type Cart_Action_Type =
  | ADD_TO_CART
  | REMOVE_FROM_CART
  | UPDATE_QUANTITY
  | SET_CART;

export type cartContextType = {
  state: CartItem[];
  dispatch: React.Dispatch<Cart_Action_Type>;
  addToCart: (data: CartTypeInput) => Promise<void>;
  removeFromCart: (data: CartTypeInput) => Promise<void>;
  increaseQuantity: (data: CartTypeInput) => Promise<void>;
  decreaseQuantity: (data: CartTypeInput) => Promise<void>;
};
export type useCartProviderProps = {
  children: ReactNode;
};
