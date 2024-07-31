import { List } from "antd"
type Props = {
  item: {
    userProduct: string
  }
}
const CheckoutItem = ({ item }: Props) => {
  return (
    <List.Item>
      <List.Item.Meta title={<p>{item.userProduct}</p>} />
    </List.Item >

  )
}

export default CheckoutItem