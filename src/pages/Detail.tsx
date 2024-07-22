import DetailProduct from "../components/DetailProduct"
import Register from "../components/Register"

const Detail = () => {
  return (
    <>
      <DetailProduct />
      <div className="bg-register">
        <Register />
      </div>
    </>
  )
}

export default Detail