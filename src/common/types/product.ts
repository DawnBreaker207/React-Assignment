import React, { Dispatch } from 'react';
import { Category } from './category';

export interface Product {
  _id?: string | undefined;
  title: string;
  price: number;
  category: Category;
  thumbnail: string;
  description: string;
}

export interface StateProduct {
  products: Product[];
  error: string | null;
}

export enum ProductAction {
  SET_PRODUCTS = 'SET_PRODUCTS',
  ADD_PRODUCT = 'ADD_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
}

export interface SET_PRODUCTS {
  type: ProductAction.SET_PRODUCTS;
  payload: Product[];
}

export interface ADD_PRODUCT {
  type: ProductAction.ADD_PRODUCT;
  payload: Product;
}

export interface UPDATE_PRODUCT {
  type: ProductAction.UPDATE_PRODUCT;
  payload: Product;
}

export interface DELETE_PRODUCT {
  type: ProductAction.DELETE_PRODUCT;
  payload: Product | string | number;
}

export type Product_Action_Type =
  | SET_PRODUCTS
  | ADD_PRODUCT
  | UPDATE_PRODUCT
  | DELETE_PRODUCT;

export interface ProductContextType {
  state: StateProduct;
  dispatch: Dispatch<Product_Action_Type>;
  addProduct: (input: Product) => void;
  editProduct: (id: string, input: Product) => void;
  deleteProduct: (id: string) => void;
}

export interface ProductProviderProps {
  children: React.ReactNode;
}
