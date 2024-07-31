import { Button, List, Popconfirm } from "antd"
import { useAuth } from "../../contexts/authContext"
import { useCart } from "../../contexts/cartContext"
import { formatCurrency } from "../../utils/formatCurrency"
type Props = {
  item: {
    userProduct: string
    quantity: number
    price: number
  }
}
const CartLineItem = ({ item }: Props) => {
  const { user } = useAuth()
  const { removeFromCart, decreaseQuantity, increaseQuantity } = useCart()
  const userId = user?._id
  const data = { ...item, userId }
  return (
    <List.Item className="w-full">
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
          <div className="flex items-center justify-between md:order-3 md:justify-end">
            <div className="flex items-center">
              {item.quantity === 1 ? (<Popconfirm title="Delete item ?" description="Are you sure to delete this item" onConfirm={() => removeFromCart(data)}>
                <Button type="primary" className="bg-green-600">-</Button>
              </Popconfirm>) : (<Button type="primary" className="bg-green-600" onClick={() => decreaseQuantity(data)}> -</Button>)}

              <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" value={item.quantity} />
              <Button type="primary" className="bg-green-600" onClick={() => increaseQuantity(data)}>+</Button>
            </div>
            <div className="text-end md:order-4 md:w-32">
              <p className="text-base font-bold text-gray-900 dark:text-white">{formatCurrency(item.price! * item.quantity)}</p>
            </div>
          </div>
          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.userProduct}</a>
          </div>
          <div className="flex items-center gap-4">
            <Popconfirm title="Delete item ?" description="Are you sure to delete this item" onConfirm={() => removeFromCart(data)}>
              <Button type="text" danger className="font-bold" >
                <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>Remove</Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </List.Item >

  )
}

export default CartLineItem