import {
  Cart_Action_Type,
  CartActionCase,
  CartItem,
} from '../common/types/cart';

const cartReducer = (
  state: CartItem[],
  action: Cart_Action_Type
): CartItem[] => {
  switch (action.type) {
    case CartActionCase.ADD_TO_CART: {
      const existItem = state.find(
        (index) => index.userProduct === action.payload.userProduct
      );

      if (existItem) {
        return state.map((index) =>
          index.userProduct === action.payload.userProduct
            ? {
                ...index,
                quantity: index.quantity + (action.payload.quantity || 0),
              }
            : index
        );
      } else {
        return [...state, action.payload];
      }
    }
    case CartActionCase.UPDATE_QUANTITY:
      return state.map((item: CartItem) =>
        item.userProduct === action.payload.userProduct
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case CartActionCase.REMOVE_FROM_CART:
      return state.filter(
        (item) => item.userProduct !== action.payload.userProduct
      );

    case CartActionCase.SET_CART: {
      if (Array.isArray(action.payload)) return action.payload;
      else {
        console.error('Invalid payload structure for SET_CART');
        return state;
      }
    }
    default:
      return state;
  }
};

export default cartReducer;
