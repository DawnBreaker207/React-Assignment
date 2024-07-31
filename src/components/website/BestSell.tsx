import { useEffect, useState } from "react"
import { Product } from "../../common/types/product"
import instance from "../../configs/axios"
import { Link } from "react-router-dom"
import { formatCurrency } from "../../utils/formatCurrency"

const BestSell = () => {
  const [product, setProduct] = useState<Product[]>([])
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products/?limit=4")
      setProduct(data.res)
    })()
  }, [])
  return (
    <section >
      <div className="best-sell w-full">

        <h3 className="pt-[48px] pb-[10px] font-bold text-3xl max-w-6xl mx-auto">
          Best Sellers
        </h3>
        <div className="bg-white ">
          <div className=" px-[130px]">
            <div className="grid grid-cols-4 gap-[20px] pt-[34px] pb-[52px] sell-card  mx-auto">
              {/* {BEST_SELL.map((index) => (
                <div key={index.id} className=" last-of-type:first-line:bg-black  ">
                  <span className="uppercase text-white  -top-3 px-[10px] py-1">{index.sale}</span>
                  <div className="overflow-hidden h-[266px]">
                    <img src={index.image} alt="" className="h-full mx-auto object-cover hover:scale-110 duration-500" />
                  </div>
                  <div className="flex flex-col justify-between pt-[30px] sell-info ">
                    <h4 className="font-bold">{index.name}</h4>
                    <span className="flex flex-row justify-between pt-[14px]">
                      <p className="text-[#777777]">{index.description}</p>
                      <div className="flex flex-row gap-[10px] sell-price">
                        <p className="line-through" >{index.sale_price}</p>
                        <p className="sale-price">{index.price}</p>
                      </div>
                    </span>
                  </div>
                </div>
              ))} */}
              {product.map((index) => (
                <div key={index._id} className=" last-of-type:first-line:bg-black  ">
                  <span className="uppercase text-white  -top-3 px-[10px] py-1">SALE</span>
                  <div className="overflow-hidden h-[266px]">
                    <Link to={`/detail/${index._id}`}>
                      <img src={index.thumbnail} alt="" className="h-full mx-auto object-cover hover:scale-110 duration-500" />
                    </Link>
                  </div>
                  <div className="flex flex-col justify-between pt-[30px] sell-info ">
                    <h4 className="font-bold">{index.title}</h4>
                    <span className="flex flex-row justify-between pt-[14px]">
                      <p className="text-[#777777]">{index.description}</p>
                      <div className="flex flex-row gap-[10px] sell-price">
                        <p className="line-through" >110000$</p>
                        <p className="sale-price">{formatCurrency(index.price)}</p>
                      </div>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default BestSell
