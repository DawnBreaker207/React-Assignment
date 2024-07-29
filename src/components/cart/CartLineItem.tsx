import { Button, List, Popconfirm } from "antd"
import { useAuth } from "../../contexts/authContext"
import { useCart } from "../../contexts/cartContext"
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
    <List.Item actions={[

      item.quantity === 1 ?

        (<Popconfirm title="Delete item ?" description="Are you sure to delete this item" onConfirm={() => removeFromCart(data)}>
          <Button type="primary" className="bg-green-600">-</Button>
        </Popconfirm>)
        :

        (<Button type="primary" className="bg-green-600" onClick={() => decreaseQuantity(data)}> -</Button>),

      <Button type="primary" className="bg-green-600" onClick={() => increaseQuantity(data)}>+</Button>,
      <Popconfirm title="Delete item ?" description="Are you sure to delete this item" onConfirm={() => removeFromCart(data)}>
        <Button type="primary" danger>Remove</Button>
      </Popconfirm>
    ]}>
      <List.Item.Meta title={<p>{item.userProduct}</p>}
        description={`Quantity: ${item.quantity}`} />
      <div>Total: ${item.price! * item.quantity}</div>
    </List.Item >

  )
}

export default CartLineItem