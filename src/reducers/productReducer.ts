import {
  Product_Action_Type,
  ProductAction,
  StateProduct,
} from '../common/types/product';

export const initialState: StateProduct = {
  products: [],
  error: null,
};

const productReducer = (
  state: StateProduct,
  action: Product_Action_Type
): StateProduct => {
  const { products } = state;
  const { payload, type } = action;

  switch (type) {
    case ProductAction.SET_PRODUCTS:
      return { ...state, products: payload };
    case ProductAction.ADD_PRODUCT:
      return { ...state, products: [...products, payload] };
    case ProductAction.UPDATE_PRODUCT:
      return {
        ...state,
        products: products.map((product) =>
          product._id === payload._id ? payload : product
        ),
      };
    case ProductAction.DELETE_PRODUCT:
      return {
        ...state,
        products: products.filter((product) => product._id !== payload),
      };

    default:
      return state;
  }
};

export default productReducer;
