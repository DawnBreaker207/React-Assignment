import { Button, List } from "antd"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import instance from "../../configs/axios"
import { useAuth } from "../../contexts/authContext"
import { useCart } from "../../contexts/cartContext"
import { openNotify } from "../../utils/notification"
import CheckoutItem from "./CheckoutItem"
import { CartItem } from "../../common/types/cart"
import { formatCurrency } from "../../utils/formatCurrency"


interface FormCheckOut {
  fullName: string,
  phoneShipping: string,
  addressShipping: string,
  paymentMethod: string | number
  shippingMethod: string | number
}
const Checkout = () => {
  const { state, setShippingFee, removeCart } = useCart()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormCheckOut>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const onSubmit = async (data: FormCheckOut) => {

    const products = state.cartItems.map((item: CartItem) => ({
      id: item.userProduct,
      price: item.price,
      quantity: item.quantity
    }))
    const order = {
      userId: user?._id,
      nameCustomer: data.fullName,
      nameShipping: data.shippingMethod,
      addressShipping: data.addressShipping,
      phoneShipping: data.phoneShipping,
      subtotal: state.subtotal,
      shippingFee: state.shippingFee,
      total: state.subtotal + state.shippingFee,
      products,
      status: 'Pending'
    }
    try {
      const { data } = await instance.post("/order", order)
      if (data) {
        openNotify('Order success')
        removeCart(state.cartId)
        navigate('/')
      }



    } catch (error) {
      console.log(error);
      openNotify('Order failed', 'There was an error placing your order.');
    }
  }
  useEffect(() => {
    const changeShippingMethod = watch((data) => {
      if (data.shippingMethod == 2) {
        setShippingFee(20000)
      } else {
        setShippingFee(0)
      }
    }
    )
    return () => changeShippingMethod.unsubscribe()
  }, [watch])


  return (
    <>
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center my-10">Delivery Details</h2>
        <div className="flex flex-col-reverse justify-around gap-5">
          <div className="flex flex-col w-full">
            <div className="">
              <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 ">
                <div className="flow-root">
                  <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Sản phẩm:</dt>
                      <dd>
                        <List dataSource={state.cartItems} renderItem={item => <CheckoutItem key={item.userProduct} item={item} />} />
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Số lượng:</dt>
                      <dd className="text-base font-medium text-green-500">{state.quantityTotal}</dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tổng cộng:</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">{formatCurrency(state.subtotal)}</dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Phí vận chuyển:</dt>
                      <dd className="text-base font-medium text-green-500">{formatCurrency(state.shippingFee)}</dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tổng tiền:</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">{formatCurrency(state.subtotal + state.shippingFee)}</dd>
                    </dl>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link to={'/cart'}>
                    <Button type="primary" >
                      Xem giỏ hàng
                    </Button>
                  </Link>
                  <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Payment</button>

                </div>
              </div>
            </div>
          </div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your name </label>
                  <input type="text" {...register('fullName', { required: true, minLength: 3 })} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Name" />
                  <div className="font-bold text-red-600">{errors.fullName && <p>{errors.fullName?.message}</p>}</div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Phone </label>
                  <input type="text" {...register('phoneShipping', { required: true, minLength: 3 })} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Phone" />
                  <div className="font-bold text-red-600">{errors.phoneShipping && <p>{errors.phoneShipping?.message}</p>}</div>

                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Address </label>
                  <input type="text"  {...register('addressShipping', { required: true, minLength: 3 })} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Address" />
                  <div className="font-bold text-red-600">{errors.addressShipping && <p>{errors.addressShipping?.message}</p>}</div>

                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white"> Payment </label>
                  </div>
                  <select {...register('paymentMethod', { required: true })} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                    <option value={1}>Chuyển khoản ngân hàng</option>
                    <option value={2}>COD - Trả tiền khi nhận hàng</option>
                  </select>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Delivery </label>
                  </div>
                  <select  {...register('shippingMethod', { required: true })} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                    <option value={1}>Tiêu chuẩn </option>
                    <option value={2}>Vận chuyển nhanh</option>
                  </select>
                </div>
              </div>
              <Button type="primary" htmlType="submit" className="w-full">Hoàn tất đơn hàng</Button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Checkout