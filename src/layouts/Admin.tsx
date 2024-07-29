import { Button } from "antd"
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import AccessDenied from "../pages/website/AccessDenied"

const LayoutAdmin = () => {
  const { Logout, user } = useAuth()
  if (user?.roles !== "admin") {
    return <AccessDenied />
  }
  return (
    <>
      <section className='flex flex-row gap-10'>
        <div className="flex flex-col justify-start gap-2 items-center mx-3 w-64  [&>*]:w-full [&>*]:text-center [&>*]:py-3  [&>*]:px-5 ">
          <NavLink to={"/"} className=" bg-blue-600 rounded-lg inline-block text-white font-bold">Home</NavLink>
          <NavLink to={"/admin/products"} className=" bg-blue-600 rounded-lg inline-block text-white font-bold">Product</NavLink>
          <NavLink to={"/admin/products/add"} className=" bg-blue-600 rounded-lg inline-block text-white font-bold">Add Product</NavLink>
          <NavLink to={"/admin/categories"} className=" bg-blue-600 rounded-lg inline-block text-white font-bold">Categories</NavLink>
          <NavLink to={"/admin/categories/add"} className=" bg-blue-600 rounded-lg inline-block text-white font-bold">Add Category</NavLink>
          <Button onClick={Logout} danger type="primary">Log Out</Button>
        </div>
        <Outlet />
      </section>
    </>
  )
}

export default LayoutAdmin
