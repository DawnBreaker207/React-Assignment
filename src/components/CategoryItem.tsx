
type Props = {
  image: string,
  name: string
  stock: string
}

const CategoryItem = (props: Props) => {
  return (
    <div className="h-full w-full text-white relative ">
      <div className="overflow-hidden ">
        <img src={props.image} alt="" className="size-full object-cover hover:scale-110 duration-500" />
      </div>
      <div className="inline-flex flex-col absolute right-12 top-3 ">
        <div className="font-bold text-lg">{props.name}</div>
        <p>{props.stock}</p>
      </div>
    </div>
  )
}

export default CategoryItem