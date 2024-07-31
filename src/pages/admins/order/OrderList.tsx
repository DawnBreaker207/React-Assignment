import { useEffect, useState } from "react";
import instance from "../../../configs/axios";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { formatCurrency } from "../../../utils/formatCurrency";
type OrderType = {
  _id: string,
  nameCustomer: string,
  nameShipping: string,
  addressShipping: string,
  phoneShipping: string,
  subtotal: number,
  shippingFee: number,
  total: number,
  status: string
}

const OrderList = () => {
  const [orders, setOrders] = useState<OrderType[]>([])

  useEffect(() => {
    (async () => {
      const { data } = await instance.get('/order')
      setOrders(data.res)
    })()
  }, [])
  const handleDelete = (id: string) => {
    (async () => {
      await instance.delete(`order/${id}`)
      setOrders(orders.filter((order) => order._id !== id))
    })()
  }
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
        <tr>
          <th className="px-6 py-3">Id</th>
          <th className="px-6 py-3">Customer</th>
          <th className="px-6 py-3">Address</th>
          <th className="px-6 py-3">Shipping</th>
          <th className="px-6 py-3">Phone</th>
          <th className="px-6 py-3">Shipping Fee</th>
          <th className="px-6 py-3">Subtotal</th>
          <th className="px-6 py-3">Total</th>
          <th className="px-6 py-3">Status</th>
          <th className="px-6 py-3">Action</th>

        </tr>
      </thead>
      <tbody>
        {orders.map((index: OrderType) => (
          <tr key={index._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 [&>*]:text-center">
            <td className="px-6 py-4">{index._id}</td>
            <td className="px-6 py-4">{index.nameCustomer}</td>
            <td className="px-6 py-4">{index.addressShipping}</td>
            <td className="px-6 py-4">{index.nameShipping}</td>
            <td className="px-6 py-4">{index.phoneShipping}</td>
            <td className="px-6 py-4">{formatCurrency(index.shippingFee)}</td>
            <td className="px-6 py-4">{formatCurrency(index.subtotal)}</td>
            <td className="px-6 py-4">{formatCurrency(index.total)}</td>
            <td className="px-6 py-4">{index.status}</td>
            <td>
              <div className="flex flex-row justify-center gap-2">

                <Link to={`/admin/categories/${index._id}`}>
                  <Button type="primary" className="bg-yellow-500">
                    Edit
                  </Button>
                </Link>
                <Button danger className="bg-red-500" type="primary" onClick={() => handleDelete(index._id)} >Delete</Button>
              </div>
            </td>
          </tr>

        ))}
      </tbody>
    </table>
  )
}

export default OrderList