import { Dispatch } from 'react';
import { Product } from './product';

export interface Category {
  _id?: string | undefined;
  name: string;
  description?: string;
  thumbnail: string;
  products: Product[];
}

export interface StateCategory {
  categories: Category[];
  error: string | null;
}

export enum CategoryAction {
  SET_CATEGORIES = 'SET_CATEGORIES',
  ADD_CATEGORIES = 'ADD_CATEGORIES',
  UPDATE_CATEGORIES = 'UPDATE_CATEGORIES',
  DELETE_CATEGORIES = 'DELETE_CATEGORIES',
}

export interface SET_CATEGORIES {
  type: CategoryAction.SET_CATEGORIES;
  payload: Category[];
}

export interface ADD_CATEGORY {
  type: CategoryAction.ADD_CATEGORIES;
  payload: Category;
}

export interface UPDATE_CATEGORY {
  type: CategoryAction.UPDATE_CATEGORIES;
  payload: Category;
}

export interface DELETE_CATEGORY {
  type: CategoryAction.DELETE_CATEGORIES;
  payload: Category | string | number;
}

export type Category_Action_Type =
  | SET_CATEGORIES
  | ADD_CATEGORY
  | UPDATE_CATEGORY
  | DELETE_CATEGORY;

export interface CategoryContextType {
  state: StateCategory;
  dispatch: Dispatch<Category_Action_Type>;
  addCategory: (input: Category) => void;
  editCategory: (id: string, input: Category) => void;
  deleteCategory: (id: string) => void;
}

export interface CategoryProviderProps {
  children: React.ReactNode;
}
