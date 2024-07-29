import { List } from "antd"
import { useCart } from "../../contexts/cartContext"
import CartLineItem from "./CartLineItem"

const Cart = () => {
  const { state } = useCart()
  const totalItem = state.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = state.reduce((total, item) => total + item.price * item.quantity, 0)
  return (
    <>
      <List dataSource={state} renderItem={item => <CartLineItem key={item.userProduct} item={item} />}></List>
      <div>
        <p>Total: {totalItem}</p>
        <p>Total price: {totalPrice}</p>
      </div>
    </>
  )
}

export default Cart
