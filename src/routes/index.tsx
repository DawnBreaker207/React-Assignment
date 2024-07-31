import { useRoutes } from 'react-router-dom'
import LayoutAdmin from '../layouts/Admin'
import LayoutClient from '../layouts/Client'

import Dashboard from '../pages/admins/Dashboard'
import CategoryAdd from '../pages/admins/category/CategoryAdd'
import CategoryEdit from '../pages/admins/category/CategoryEdit'
import ProductAdd from '../pages/admins/product/ProductAdd'
import ProductEdit from '../pages/admins/product/ProductEdit'
import Detail from '../pages/website/Detail'
import Home from '../pages/website/Home'
import List from '../pages/website/List'
import CategoryList from '../pages/admins/category/CategoryList'
import ProductList from '../pages/admins/product/ProductList'
import Register from '../pages/website/Register'
import Login from '../pages/website/Login'
import Cart from '../components/cart/Cart'
import Search from '../components/website/Search'
import Checkout from '../components/checkout/Checkout'
import ListByCategory from '../components/website/ListByCategory'
import OrderList from '../pages/admins/order/OrderList'



const Router = () => {
  const router = useRoutes([
    {
      path: '/', Component: LayoutClient, children: [
        { path: '', Component: Home },
        { path: 'list', Component: List },
        { path: 'detail/:id', Component: Detail },
        { path: 'category-list-product/:id', Component: ListByCategory },
        { path: 'register', Component: Register },
        { path: 'login', Component: Login },
        { path: 'search', Component: Search },
        { path: 'cart', Component: Cart },
        { path: 'checkout', Component: Checkout }
      ]
    },
    {
      path: '/admin', Component: LayoutAdmin, children: [
        { path: '', Component: Dashboard },
        { path: 'products', Component: ProductList },
        { path: 'products/add', Component: ProductAdd },
        { path: 'products/:id', Component: ProductEdit },
        { path: 'categories', Component: CategoryList },
        { path: 'categories/add', Component: CategoryAdd },
        { path: 'categories/:id', Component: CategoryEdit },
        { path: 'orders', Component: OrderList }
      ]
    },

  ])
  return (
    router
  )
}

export default Router