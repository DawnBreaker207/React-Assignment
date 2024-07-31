import { Button, List } from "antd"
import { Link } from "react-router-dom"
import { useCart } from "../../contexts/cartContext"
import CartLineItem from "./CartLineItem"
import { formatCurrency } from "../../utils/formatCurrency"

const Cart = () => {
  const { state } = useCart()
  const totalItem = state.cartItems.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  return (
    <>
      <div className="mx-auto max-w-6xl flex flex-col">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center my-10">Cart Details</h2>
        <List className="max-w-full" dataSource={state.cartItems} renderItem={item => <CartLineItem key={item.userProduct} item={item} />}></List>
        <div className="inline-flex flex-col items-end my-10">
          <p className="font-bold text-2xl">Total: {totalItem}</p>
          <p className="font-semibold text-xl">Total price:  {formatCurrency(totalPrice)}</p>
          <Link to={'/checkout'}>
            <Button type="primary" className="my-5">
              Process to checkout
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Cart
