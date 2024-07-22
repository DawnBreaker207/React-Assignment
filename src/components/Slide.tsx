import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from "swiper/react"

import '../index.scss'
import { Navigation, Pagination } from 'swiper/modules'
import Thumbnail from './Thumbnail'

const Slide = () => {
  return (
    <section className='slide '>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide ><Thumbnail /></SwiperSlide>
        <SwiperSlide ><Thumbnail /></SwiperSlide>
        <SwiperSlide ><Thumbnail /></SwiperSlide>
        <SwiperSlide ><Thumbnail /></SwiperSlide>

      </Swiper >
    </section>
  )
}

export default Slide