import {
  Cart_Action_Type,
  CartActionCase,
  CartItem,
} from '../common/types/cart';

export type CartState = {
  cartId: string;
  cartItems: CartItem[];
  subtotal: number;
  quantityTotal: number;
  shippingFee: number;
};

const cartReducer = (state: CartState, action: Cart_Action_Type): CartState => {
  switch (action.type) {
    case CartActionCase.ADD_TO_CART: {
      const existItem = state.cartItems.find(
        (index) => index.userProduct === action.payload.userProduct
      );

      if (existItem) {
        const updateItems = state.cartItems.map((index) =>
          index.userProduct === action.payload.userProduct
            ? {
                ...index,
                quantity: index.quantity + (action.payload.quantity || 1),
              }
            : index
        );
        return {
          ...state,
          cartItems: updateItems,
          subtotal: updateItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
          quantityTotal: updateItems.reduce(
            (acc, item) => acc + item.quantity,
            0
          ),
        };
      } else {
        const updateItems = [...state.cartItems, action.payload];
        return {
          ...state,
          cartItems: updateItems,
          subtotal: updateItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
          quantityTotal: updateItems.reduce(
            (acc, item) => acc + item.quantity,
            0
          ),
        };
      }
    }
    case CartActionCase.UPDATE_QUANTITY: {
      const updateItems = state.cartItems.map((item) =>
        item.userProduct === action.payload.userProduct
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        cartItems: updateItems,
        subtotal: updateItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        quantityTotal: updateItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        ),
      };
    }
    case CartActionCase.REMOVE_FROM_CART: {
      const updatedItems = state.cartItems.filter(
        (item) => item.userProduct !== action.payload.userProduct
      );
      return {
        ...state,
        cartItems: updatedItems,
        subtotal: updatedItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        quantityTotal: updatedItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        ),
      };
    }
    case CartActionCase.SET_CART: {
      const cartItems = action.payload.cartItems || [];
      return {
        ...state,
        cartId: action.payload.cartId,
        cartItems: cartItems,
        subtotal: cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        quantityTotal: cartItems.reduce((acc, item) => acc + item.quantity, 0),
      };
    }
    case CartActionCase.REMOVE_CART:
      return {
        ...state,
        cartId: '',
        cartItems: [],
        subtotal: 0,
        quantityTotal: 0,
        shippingFee: 0,
      };
    case CartActionCase.SET_SUBTOTAL:
      return { ...state, subtotal: action.payload };
    case CartActionCase.SET_QUANTITY_TOTAL:
      return { ...state, quantityTotal: action.payload };
    case CartActionCase.SET_SHIPPING_FEE:
      return { ...state, shippingFee: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
