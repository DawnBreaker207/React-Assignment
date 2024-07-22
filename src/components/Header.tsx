import { HEADER_NAV } from "../common"
import { Cart, Arrow_Back, Search, User } from "../common/icons"


const Header = () => {
  return (
    <header>
      <div className="container md:max-w-6xl mx-auto">
        <div className="header-tool flex justify-end">
          <form action="" className="header-search ">
            <input type="text" placeholder="Suchen Sie nach Produkten, Marken und mehr" />
            <img src={Search} alt="" />
          </form>
          <div className="header-lang">
            En <img src={Arrow_Back} alt="" />
          </div>

          <div className="flex flex-row gap-[30px]">
            <div className="header-user">
              <img src={User} alt="" />
              Account
            </div>
            <div className="header-cart">
              <div className="relative">
                <span className="flex items-center justify-center size-2 text-[5px] rounded-full bg-red-500 absolute top-0 right-0">3</span>
                <img src={Cart} alt="" />
              </div>
              Cart
            </div>
          </div>


        </div>
        <hr />

        <ul className="header-nav flex justify-between ">
          {HEADER_NAV.map((item) => (
            <li key={item.id}>
              <a href="#" className="flex items-center">
                {item.name}
                <img src={Arrow_Back} alt="" />
              </a>
            </li>

          ))}
        </ul>
      </div>
    </header>
  )
}

export default Header