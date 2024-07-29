import ProductList from "../../components/website/ProductList"
import Register from "../../components/website/Register"

const LIst = () => {
  return (
    <>
      <ProductList />
      <div className="bg-register">
        <Register />
      </div>
    </>
  )
}

export default LIst
