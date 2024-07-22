import { BEST_SELL } from "../common"

const BestSell = () => {
  return (
    <section >
      <div className="best-sell w-full">

        <h3 className="pt-[48px] pb-[10px] font-bold text-3xl max-w-6xl mx-auto">
          Best Sellers
        </h3>
        <div className="bg-white ">
          <div className=" px-[130px]">
            <div className="grid grid-cols-4 gap-[20px] pt-[34px] pb-[52px] sell-card  mx-auto">
              {BEST_SELL.map((index) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default BestSell
