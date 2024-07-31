import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { PRODUCT_TAG } from "../../common/data"
import { Arrow_Circle, Price_Renge, Thumb_Product } from "../../common/icons"
import { Product } from "../../common/types/product"
import instance from "../../configs/axios"
import { useCategory } from "../../contexts/categoryContext"

const Search = () => {
  const [search] = useSearchParams()
  const [product, setProduct] = useState<Product[]>([])
  const [keywords, setKeywords] = useState<string>('')
  const { state } = useCategory()
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`products?search=${search.get('keyword')}`)
      if (data.res) {
        setProduct(data.res)
        setKeywords(search.get('keyword') as string)
      }
    })()
  }, [])




  return (
    <section className="bg-list">
      <div className="list-color-product">
        <div className="max-w-6xl mx-auto">
          <h3 className="pt-[76px] pb-[68px] font-bold text-[30px] text-[#505F4E]">Result on search keyword: "{keywords}"</h3>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row justify-between mt-[30px] mb-[130px]">
          {PRODUCT_TAG.map((index) => (
            <div key={index.id} className="flex flex-row items-center gap-2 bg-[#D2E8CD] py-[8px] pl-[6px] pr-[16px] rounded-md">
              <img src={index.image} alt="" />
              <span>{index.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="product-list">
        <div className="max-w-7xl mx-auto flex flex-row justify-between gap-20">
          <div className="">
            <div className="flex flex-row mb-[44px] gap-8">
              <div className="text-[18px]">Sort By:
                <select name="" id="" className="ml-[14px] w-[200px] text-[#BDBDBD] border-2 px-[16px] py-[9px] rounded-lg">
                  <option value="">
                    Newest
                  </option>
                  <option value="price:asc">
                    Price: Low to high
                  </option>
                  <option value="price:desc">
                    Price: High to low
                  </option>
                </select>
              </div>
              <div className="text-[18px]">Show :
                <select name="" id="" className="ml-[14px] w-[200px] text-[#BDBDBD] border-2 px-[16px] py-[9px] rounded-lg">
                  <option value="">
                    Default
                  </option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-y-[60px] gap-x-[20px]">
              {/* {PRODUCT_LIST.map((index) => (
                <div key={index.id} className="relative">
                  <span className="absolute bg-[#505F4E] text-white px-[13px] -top-6 left-4 rounded-lg">{index.sell}</span>
                  <div>
                    <img src={index.image} alt="" />
                  </div>
                  <div>
                    <h6 className="font-bold text-[17px]">{index.name}</h6>
                    <div className="flex flex-row gap-[8px] text-[15px]">
                      <p>{index.price}</p>
                      <p className="text-[#828282] line-through">{index.price_sale}</p>
                    </div>
                  </div>
                </div>
              ))} */}
              {product.map((index) => (
                <div key={index._id} className="relative">
                  <span className="absolute bg-[#505F4E] text-white px-[13px] -top-6 left-4 rounded-lg">Sell</span>
                  <div>
                    <Link to={`/detail/${index._id}`}>
                      <img src={index.thumbnail} alt="" />
                    </Link>
                  </div>
                  <div>
                    <h6 className="font-bold text-[17px]">{index.title}</h6>
                    <div className="flex flex-row gap-[8px] text-[15px]">
                      <p>{index.price}</p>
                      <p className="text-[#828282] line-through">1000 $</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[300px]">
            <h4 className="font-bold text-2xl">Kategorien</h4>
            <div className="mt-[28px] mb-[35px] flex flex-col gap-[15px]">
              {/* {CATEGORY_TAG.map((index) => (
                <div key={index.id} className="flex flex-row gap-[7px] ">
                  <input type="checkbox" name="" id="" />
                  <span>{index.name}</span>
                </div>
              ))} */}
              {state.categories.slice(0, 10).map((index) => (
                <div key={index._id} className="flex flex-row gap-[7px] ">
                  <input type="checkbox" name="" />
                  <span>{index.name}</span>
                </div>
              ))}
            </div>


            <div style={{ backgroundImage: `url(${Thumb_Product})` }} className="h-[260px] bg-no-repeat">

              <div className="pt-[30px] pl-[21px] pb-[18px]  flex flex-col h-full justify-between">
                <h1 className="font-bold text-white">Grow your own <br />
                  favourite plant</h1>
                <button className="flex flex-row items-center gap-[7px] text-white">
                  Shop Now
                  <img src={Arrow_Circle} alt="" />
                </button>
              </div>
            </div>


            <div className="flex flex-col gap-[40px] mt-[22px]">
              <div>
                <h4 className="font-bold text-lg">Filter By Price</h4>
                <img src={Price_Renge} alt="" />
                <div className="flex flex-row justify-between">
                  <p>From $0 to $8000</p>
                  <p>Filter</p>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg">Filter By Size</h4>
                <img src={Price_Renge} alt="" />
                <div className="flex flex-row justify-between">
                  <p>2 mm by 50</p>
                  <p>Filter</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Search
