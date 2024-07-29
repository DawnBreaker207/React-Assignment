import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { Category } from "../../../common/types/category"
import { useCategory } from "../../../contexts/categoryContext"
import { GetOneCategory } from "../../../services/category"
import categorySchema from "../../../validations/categorySchema"
import { Button } from "antd"

const CategoryEdit = () => {
  const { editCategory } = useCategory()
  const { register, formState: { errors }, handleSubmit, reset } = useForm<Category>({ resolver: zodResolver(categorySchema) })
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      (async () => {
        const data = await GetOneCategory(id)

        reset(data)
      })()
    }
  }, [id, reset])

  const handleSubmitForm = async (res: Category) => {
    try {
      const _id = id
      if (_id) {
        editCategory(_id, res)
      }
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <section className="md:max-w-6xl mx-auto flex-1">
      <h1 className="my-5 text-3xl font-bold text-center">Product Add</h1>
      <form action="" onSubmit={handleSubmit(handleSubmitForm)} className="md:max-w-full md:mx-auto">
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Name">Name</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " type="text" placeholder="Title" {...register("name", { required: true, minLength: 5 })} />
          <div className="font-bold text-red-600">{errors.name && <p>{errors.name?.message}</p>}</div>
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Description">Description</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Price" {...register("description", { required: true, min: 5, valueAsNumber: true })} />
          <div className="font-bold text-red-600">{errors.description && <p>{errors.description?.message}</p>}</div>
        </div>

        <Button className="w-full" type="primary" htmlType="submit">Submit</Button>
      </form>
    </section>
  )
}

export default CategoryEdit
