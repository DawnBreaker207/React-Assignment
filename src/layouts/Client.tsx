import { Outlet } from 'react-router-dom'
import Footer from '../components/website/Footer'
import Header from '../components/website/Header'

const LayoutClient = () => {
  return (
    <>

      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default LayoutClient