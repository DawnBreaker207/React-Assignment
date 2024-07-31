import { createContext, useContext, useEffect, useReducer } from "react";


import cartReducer, { CartState } from "../reducers/cartReducer";

import { openNotify } from "../utils/notification";
import { useAuth } from "./authContext";
import { CartActionCase, cartContextType, CartItem, CartTypeInput, useCartProviderProps } from "../common/types/cart";
import { Add_To_Cart, Decrease_Quantity, Get_Cart, Increase_Quantity, Remove_Cart, Remove_From_Cart, Update_Cart } from "../services/cart";



const CartContext = createContext({} as cartContextType)

export const useCart = (): cartContextType => {
  const cartContext = useContext(CartContext)
  if (!cartContext) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return cartContext
}

const initialState: CartState = {
  cartId: '',
  cartItems: [] as CartItem[],
  subtotal: 0,
  quantityTotal: 0,
  shippingFee: 0
}


const CartProvider = ({ children }: useCartProviderProps) => {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(cartReducer, initialState)
  useEffect(() => {
    (async () => {
      const id = user?._id
      if (id) {
        const data = await Get_Cart(id)
        dispatch({ type: CartActionCase.SET_CART, payload: data})
      }
    })()
  }, [user?._id])
  const addToCart = async (dataInput: CartTypeInput) => {
    // Check valid product ID exist in data input
    if (!dataInput.userProduct) {
      return
    }
    // Find existing item in cart
    const existingItem = state.cartItems.find((cartItem) => cartItem.userProduct === dataInput.userProduct)


    // If existing item in cart , update quantity
    if (existingItem) {
      const updateItem = { ...existingItem, quantity: (existingItem.quantity || 0) + (dataInput.quantity || 1) }

      const newItem = { ...updateItem, userId: dataInput.userId, price: dataInput.price }
      await Update_Cart(newItem)
      openNotify('Update product quantity success', 'You update quantity success')
      dispatch({ type: CartActionCase.UPDATE_QUANTITY, payload: updateItem })
      // Else, create new and add to cart
    } else {
      await Add_To_Cart(dataInput)
      openNotify('Add product success', 'You add product to cart success')
      dispatch({ type: CartActionCase.ADD_TO_CART, payload: { ...dataInput } })
    }
  }
  const removeFromCart = async (data: CartTypeInput) => {
    // Check if data in param valid
    if (data.userProduct) {
      await Remove_From_Cart(data)
      openNotify('Delete Success', 'You delete product from cart success')
      dispatch({
        type: CartActionCase.REMOVE_FROM_CART, payload: { userProduct: data.userProduct }
      })
    }
  }
  const removeCart = async (id: string) => {
    console.log(id);

    await Remove_Cart(id)
    dispatch({ type: CartActionCase.REMOVE_CART })
  }
  const increaseQuantity = async (data: CartTypeInput) => {
    // Check product Id valid
    if (data.userProduct) {
      const item = state.cartItems.find((item: CartItem) => item.userProduct === data.userProduct)
      // Find that item existing in cart
      if (item) {
        await Increase_Quantity(data)
        dispatch({
          type: CartActionCase.UPDATE_QUANTITY, payload: { userProduct: data.userProduct, quantity: item.quantity + 1 }
        })
      }
    }

  }
  const decreaseQuantity = async (data: CartTypeInput) => {
    // Check product Id valid
    if (data.userProduct) {
      const item = state.cartItems.find((item: CartItem) => item.userProduct === data.userProduct)
      // If item > 1, decrease quantity 
      if (item && item.quantity > 1) {
        await Decrease_Quantity(data)
        dispatch({
          type: CartActionCase.UPDATE_QUANTITY, payload: { userProduct: data.userProduct, quantity: item.quantity! - 1 }
        })
      }
      // If item < 1, delete from cart
      else {
        await Remove_From_Cart(data)
        dispatch({
          type: CartActionCase.REMOVE_FROM_CART, payload: { userProduct: data.userProduct }
        })
      }
    }
  }
  const setShippingFee = (fee: number) => {
    dispatch({ type: CartActionCase.SET_SHIPPING_FEE, payload: fee })
  }
  return (
    <CartContext.Provider value={{
      state: {
        cartId: state.cartId,
        cartItems: state.cartItems,
        subtotal: state.subtotal,
        quantityTotal: state.quantityTotal,
        shippingFee: state.shippingFee
      },
      dispatch,
      addToCart,
      removeCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      setShippingFee
    }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;

