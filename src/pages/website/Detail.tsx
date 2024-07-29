import { useParams } from "react-router-dom"
import DetailProduct from "../../components/website/DetailProduct"
import Register from "../../components/website/Register"
import { useEffect, useState } from "react"
import { GetOneProduct } from "../../services/product"
import { Product } from "../../common/types/product"

const Detail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  useEffect(() => {
    (async () => {
      const data = await GetOneProduct(id)
      setProduct(data)
    })()
  }, [])
  return (
    <>
      <DetailProduct {...product} />
      <div className="bg-register">
        <Register />
      </div>
    </>
  )
}

export default Detail