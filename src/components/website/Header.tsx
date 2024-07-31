import { ShoppingCartOutlined } from '@ant-design/icons'
import { Badge } from "antd"
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from "react-router-dom"
import { HEADER_NAV } from "../../common/data"
import { Arrow_Back, Search, User } from "../../common/icons"
import { useCart } from "../../contexts/cartContext"

const Header = () => {
  const navigate = useNavigate()
  const { state } = useCart()
  const { register, handleSubmit } = useForm()

  const totalItem = state.cartItems.reduce((total, item) => total + item.quantity, 0)
  const onSubmit = (data: any) => {
    const { keywords } = data
    navigate(`/search?keyword=${keywords}`)

  }
  return (
    <header>
      <div className="container md:max-w-6xl mx-auto">
        <div className="header-tool flex justify-end" >
          <form action="" className="header-search" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Suchen Sie nach Produkten, Marken und mehr" {...register('keywords')} />
            <button type="submit" >
              <img src={Search} alt="" />
            </button>
          </form>
          <div className="header-lang">
            En <img src={Arrow_Back} alt="" />
          </div>

          <div className="flex flex-row gap-[30px]">
            <div className="header-user">
              <img src={User} alt="" />
              Account
            </div>
            {/* <div className="header-cart">
              <div className="relative">
                <span className="flex items-center justify-center size-2 text-[5px] rounded-full bg-red-500 absolute top-0 right-0">3</span>
                <img src={Cart} alt="" />
              </div>
              Cart
            </div> */}
            <NavLink to="/cart">
              <Badge count={totalItem} showZero >
                <ShoppingCartOutlined style={{ fontSize: '24px', color: 'white' }} />
              </Badge>
            </NavLink>
          </div>


        </div>
        <hr />

        <ul className="header-nav flex justify-between ">
          {HEADER_NAV.map((item) => (
            <li key={item.id}>
              <NavLink to={item.link as string} className="flex items-center">
                {item.name}
                <img src={Arrow_Back} alt="" />
              </NavLink>
            </li>

          ))}
        </ul>
      </div>
    </header>
  )
}

export default Header