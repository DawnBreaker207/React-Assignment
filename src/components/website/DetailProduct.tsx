import { Button } from "antd"
import { Cart_Add, Star } from "../../common/icons"
import { Product } from "../../common/types/product"
import { useAuth } from "../../contexts/authContext"
import { useCart } from "../../contexts/cartContext"
import { formatCurrency } from "../../utils/formatCurrency"


const DetailProduct = ({ ...props }: Product) => {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const handleAddToCart = async () => {
    if (user?._id) {
      await addToCart({ userId: user._id, userProduct: props._id as string, quantity: 1, price: props.price })
    }
  }
  return (
    <section>
      <div className="container mx-auto max-w-6xl">

        <div className="detail-product flex flex-row justify-between mt-[105px]">
          <div className="flex flex-col detail-img flex-grow">
            <div className="flex-grow ">
              <img src={props.thumbnail} alt="" className="size-[355px]" />
            </div>
            <div className="flex flex-row mt-[63px] gap-[35px] [&>*]:size-[106px] hover:[&>*]:border [&>*]:border-black [&>*]:p-3 [&>*]:rounded-xl">
              <img src={props.thumbnail} alt="" />
              <img src={props.thumbnail} alt="" />
              <img src={props.thumbnail} alt="" />
            </div>
          </div>
          <div className="detail-info ">
            <span className="detail-tag">{props.category?.name}</span>
            {/* <h5 className="detail-name">Square cultivation pots
              0.27 to 2 litres</h5> */}
            <h5 className="detail-name">{props.title}</h5>
            {/* <p className="detail-desc w-[500px]">Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the</p> */}
            <p className="detail-desc w-[500px]">{props.description}</p>
            <div className="detail-price">
              <div className="detail-sale-price">$125.00 <span>50%</span></div>
              <div className="detail-origin-price">$ {formatCurrency(props.price)}</div>
            </div>
            <div className="detail-action">
              <div className="detail-quantity">
                <button>-</button>
                <input type="number" placeholder="3" min="0" />
                <button>+</button>
              </div>
              {/* <button className="bg-[#4E7C32] font-bold text-xl text-white flex flex-row gap-[16px] px-[77px] py-[14px] items-center rounded-2xl"><img src={Cart_Add} alt="" />Add to cart</button> */}
              <Button type="primary" onClick={handleAddToCart} className="bg-[#4E7C32] font-bold text-xl text-white flex flex-row gap-[16px] px-[77px] py-[14px] items-center rounded-2xl"><img src={Cart_Add} alt="" />Add to cart</Button>
            </div>
          </div>
        </div>

        <div className="detail-about flex flex-col">
          <div>
            <h5 className="text-[30px] text-[#4E7C32] mt-[131px]">Discription</h5>
            <p className="text-[20px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
              type and scrambled i</p>
          </div>
          <div className="mt-[30px] mb-[57px]">
            <h5 className="text-[30px] text-[#4E7C32]">About</h5>
            <p className="text-[20px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
              type and scrambled i</p>
          </div>
          <div className="review mt-[57px]">
            <div className="review-star flex flex-col ">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-row items-center flex-grow-[0.25]">
                  <img src={props.thumbnail} alt="" />
                  <div className="flex flex-col items-center flex-grow">
                    <span className="flex flex-row flex-grow size-8 justify-center">
                      <img src={Star} alt="" />
                      <img src={Star} alt="" />
                      <img src={Star} alt="" />
                      <img src={Star} alt="" />
                      <img src={Star} alt="" />
                    </span>
                    <div className=""><span className="text-[#4E7C32] text-3xl">5.0</span>(388)</div>
                  </div>
                </div>
                <button className="bg-[#4E7C32] text-white px-[16px] py-[6px] rounded-xl mt-[36px]">Write reviews</button>
              </div>
              <div>
                <div className="flex flex-row items-center gap-1 mt-[42px]">
                  <h5>1</h5>
                  <img src={Star} alt="" className="size-3" />
                  <div className="bg-[#A2A0A0] flex-grow-[0.35] h-4 rounded-md"></div>
                  <span>(388)</span>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <h5>2</h5>
                  <img src={Star} alt="" className="size-3" />
                  <div className="bg-[#D9D9D9] flex-grow-[0.1] h-4 rounded-md"></div>

                </div>
                <div className="flex flex-row items-center gap-1">
                  <h5>3</h5>
                  <img src={Star} alt="" className="size-3" />
                  <div className="bg-[#D9D9D9] flex-grow-[0.1] h-4 rounded-md"></div>

                </div>
                <div className="flex flex-row items-center gap-1">
                  <h5>4</h5>
                  <img src={Star} alt="" className="size-3" />
                  <div className="bg-[#D9D9D9] flex-grow-[0.1] h-4 rounded-md"></div>

                </div>
                <div className="flex flex-row items-center gap-1">
                  <h5>5</h5>
                  <img src={Star} alt="" className="size-3" />
                  <div className="bg-[#D9D9D9] flex-grow-[0.1] h-4 rounded-md"></div>

                </div>
              </div>
            </div>
            <div className="review-comment grid grid-cols-2 gap-y-6 gap-x-[100px] mt-[50px]">
              <div className="comment-user">
              </div>
              <div className="comment-user">
                <div className="user-name flex items-center gap-6">
                  <h5 className="text-lg">Aman gupta</h5>
                  <span className="flex flex-row size-4">
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                  </span>
                </div>
                <div className="comment-description">
                  I've been using this cleanser for about five or six months now and my acne
                  is almost completely gone. I really struggled for years with my skin and tried
                  everything possible but this is the only thing that managed to clear up my
                  skin. 100% recommend and will continue to use is for sure.
                </div>
              </div>
              <div className="comment-user">
                <div className="user-name flex items-center gap-6">
                  <h5 className="text-lg">Aman gupta</h5>
                  <span className="flex flex-row size-4">
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                  </span>
                </div>
                <div className="comment-description">
                  I've been using this cleanser for about five or six months now and my acne
                  is almost completely gone. I really struggled for years with my skin and tried
                  everything possible but this is the only thing that managed to clear up my
                  skin. 100% recommend and will continue to use is for sure.
                </div>
              </div>
              <div className="comment-user">
                <div className="user-name flex items-center gap-6">
                  <h5 className="text-lg">Aman gupta</h5>
                  <span className="flex flex-row size-4">
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                  </span>
                </div>
                <div className="comment-description">
                  I've been using this cleanser for about five or six months now and my acne
                  is almost completely gone. I really struggled for years with my skin and tried
                  everything possible but this is the only thing that managed to clear up my
                  skin. 100% recommend and will continue to use is for sure.
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-[36px] mb-[96px]">
            <button className="px-[11px] py-[2px] bg-[#4E7C32] text-white rounded-lg">See all</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailProduct