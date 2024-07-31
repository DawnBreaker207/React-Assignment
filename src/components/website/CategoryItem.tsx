
// type Props = {
//   image: string,
//   name: string
//   stock: string

import { Link } from "react-router-dom"
import { Product } from "../../common/types/product"

// }
type Props = {
  _id: string
  thumbnail: string,
  name: string,
  products: Product[]
}

const CategoryItem = (props: Props) => {
  const length = props.products.length
  return (
    <div className="h-full w-full text-white relative overflow-hidden">
      <div className=" relative min-h-full  hover:scale-110 duration-500 ">
        <Link to={`category-list-product/${props._id}`}>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <img src={props.thumbnail} alt="" className="min-h-full object-cover" />
        </Link>
      </div>
      <div className="inline-flex flex-col absolute right-12 top-3 ">
        <div className="font-bold text-lg">{props.name}</div>
        <p>Total {length}</p>
      </div>
    </div>
    // <div className="h-full w-full text-white relative ">
    //   <div className="overflow-hidden ">
    //     <img src={props.image} alt="" className="size-full object-cover hover:scale-110 duration-500" />
    //   </div>
    //   <div className="inline-flex flex-col absolute right-12 top-3 ">
    //     <div className="font-bold text-lg">{props.name}</div>
    //     <p>{props.stock}</p>
    //   </div>
    // </div>
  )
}

export default CategoryItem