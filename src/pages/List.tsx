import ProductList from "../components/ProductList"
import Register from "../components/Register"

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
