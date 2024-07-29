import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { Product } from "../../../common/types/product"
import { useCategory } from "../../../contexts/categoryContext"
import { userProduct } from "../../../contexts/productContext"
import { GetOneProduct } from "../../../services/product"
import productSchema from "../../../validations/productSchema"
import { Button } from "antd"

const ProductEdit = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null)
  const { editProduct } = userProduct()
  const { state } = useCategory()
  const { register, formState: { errors }, handleSubmit, reset } = useForm<Product>({ resolver: zodResolver(productSchema) })
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      (async () => {
        const data = await GetOneProduct(id)
        reset({ ...data, category: data.category._id })
        setThumbnailUrl(data?.thumbnail)
      })()
    }
  }, [id, reset])
  const handleSubmitForm = async (res: Product) => {
    try {
      const _id = id
      if (_id) {
        editProduct(_id, res)
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
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Title">Title</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " type="text" placeholder="Title" {...register("title", { required: true, minLength: 5 })} />
          <div className="font-bold text-red-600">{errors.title && <p>{errors.title?.message}</p>}</div>
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Price">Price</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Price" {...register("price", { required: true, min: 5, valueAsNumber: true })} />
          <div className="font-bold text-red-600">{errors.price && <p>{errors.price?.message}</p>}</div>
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Description">Description</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Description" {...register("description", { required: true, minLength: 5 })} />
          <div className="font-bold text-red-600">{errors.description && <p>{errors.description?.message}</p>}</div>
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Category">Category</label>
          <select {...register("category")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
            <option value="Default">Default</option>
            {state.categories.map((index) => (
              <option key={index._id} value={index._id}>{index.name}</option>
            ))}
          </select>
          <div className="font-bold text-red-600">{errors.category && <p>{errors.category?.message}</p>}</div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="thumbnail">Thumbnail</label>
          <input type="file" placeholder="Link" {...register("thumbnail")} />
          {thumbnailUrl && (
            <img src={thumbnailUrl} alt="Product Thumbnail" style={{ maxWidth: "200px", marginTop: "10px" }} />
          )}
          <div className="font-bold text-red-600">{errors.thumbnail && <p>{errors.thumbnail?.message}</p>}</div>
        </div>
        <Button className="w-full" type="primary" htmlType="submit">Submit</Button>
      </form>
    </section>
  )
}

export default ProductEdit
