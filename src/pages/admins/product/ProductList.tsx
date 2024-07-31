import { Button } from "antd"
import { Link } from "react-router-dom"
import { userProduct } from "../../../contexts/productContext"
import { Product } from "../../../common/types/product"
import { formatCurrency } from "../../../utils/formatCurrency"

const ProductList = () => {
  const { state, deleteProduct } = userProduct()
  return (


    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
        <tr>
          <th className="px-6 py-3">Id</th>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Price</th>
          <th className="px-6 py-3">Images</th>
          <th className="px-6 py-3">Category</th>
          <th className="px-6 py-3">Description</th>
          <th className="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {state.products.map((index: Product) => (
          <tr key={index._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 [&>*]:text-center">
            <td className="px-6 py-4">{index._id}</td>
            <td className="px-6 py-4">{index.title}</td>
            <td className="px-6 py-4">{formatCurrency(index.price)}</td>
            <td className="text-center w-[250px]">{index.thumbnail ? <img src={index.thumbnail} alt={index.description} /> : 'Updating'}</td>
            <td className="px-6 py-4">{index.category?.name}</td>
            <td className="px-6 py-4">{index.description}</td>
            <td>
              <div className="flex flex-row justify-center gap-2">
                <Link to={`/admin/products/${index._id}`}>
                  <Button type="primary" className="bg-yellow-500">
                    Edit
                  </Button>
                </Link>
                <Button onClick={() => deleteProduct(index._id as string)} danger className="bg-red-500" type="primary" >Delete</Button>
              </div>
            </td>
          </tr>

        ))}
      </tbody>
    </table>

  )
}

export default ProductList