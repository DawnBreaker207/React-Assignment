import { Link } from "react-router-dom"

import { Button } from "antd"
import { Category } from "../../../common/types/category"
import { useCategory } from "../../../contexts/categoryContext"

const CategoryList = () => {
  const { state, deleteCategory } = useCategory()
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
        <tr>
          <th className="px-6 py-3">Id</th>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Description</th>
          <th className="px-6 py-3">Action</th>

        </tr>
      </thead>
      <tbody>
        {state.categories.map((index: Category) => (
          <tr key={index._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 [&>*]:text-center">
            <td className="px-6 py-4">{index._id}</td>
            <td className="px-6 py-4">{index.name}</td>
            <td className="px-6 py-4">{index.description}</td>
            <td>
              <div className="flex flex-row justify-center gap-2">

                <Link to={`/admin/categories/${index._id}`}>
                  <Button type="primary" className="bg-yellow-500">
                    Edit
                  </Button>
                </Link>
                <Button onClick={() => deleteCategory(index._id as string)} danger className="bg-red-500" type="primary" >Delete</Button>
              </div>
            </td>
          </tr>

        ))}
      </tbody>
    </table>
  )
}

export default CategoryList
