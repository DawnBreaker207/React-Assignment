
type Props = {
  images: string,
  name: string
}

const TagItem = (props: Props) => {
  return (
    <div className='tag-item relative product-item flex flex-col border border-solid border-[#eee]'>
      <div className='h-[350px] overflow-hidden'>
        <img src={props.images} alt="" className='h-full mx-auto object-cover hover:scale-110 duration-500' />
      </div>
      <h3 className='absolute top-[20px] left-0 w-full py-2 bg-gradient-to-r from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.1)] text-[#665345] font-bold text-[25px] px-4 my-4'>{props.name}</h3>
    </div>
  )
}

export default TagItem