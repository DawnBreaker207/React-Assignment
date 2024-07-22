import { useRoutes } from 'react-router-dom'
import LayoutClient from '../layouts/Client'
import LayoutAdmin from '../layouts/Admin'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import List from '../pages/List'



const Router = () => {
  const router = useRoutes([
    {
      path: '/', Component: LayoutClient, children: [
        { path: '', Component: Home },
        { path: 'list', Component: List },
        { path: 'detail', Component: Detail }
      ]
    },
    { path: '/admin', Component: LayoutAdmin, children: [] },

  ])
  return (
    router
  )
}

export default Router