import { FOOTER_NAV, FOOTER_SOCIAL } from "../common"
import { Arrow_Top, Payment } from "../common/icons"

const Footer = () => {
  return (
    <footer>
      <div className="footer-nav ">
        <div className="container mx-auto md:max-w-6xl ">
          <ul className="grid grid-cols-5 gap-10">
            <li className="col-span-2 pt-[82px] ">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua</p>

              <ul className="footer-social">
                {FOOTER_SOCIAL.map((item) => (

                  <li key={item.id}>
                    <a href="#">
                      <img src={item.icon} alt="" />
                    </a>
                  </li>
                ))}
              </ul>

            </li>
            {FOOTER_NAV.map((item) => (
              <li key={item.id} className="flex flex-col">
                <span>{item.title}</span>
                {item.children.map((index) => (
                  <span key={index.id}>{index.name}</span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="container mx-auto md:max-w-6xl  flex justify-between items-center">

          <div>2023 hood.de , Inc.</div>
          <img src={Payment} alt="" />
          <div className="footer-scroll">Scroll to top <img src={Arrow_Top} alt="" /></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
