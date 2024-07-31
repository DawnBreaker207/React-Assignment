import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { useForm } from "react-hook-form"
import { Product } from "../../../common/types/product"
import { useCategory } from "../../../contexts/categoryContext"
import { userProduct } from "../../../contexts/productContext"
import { UploadImage } from "../../../services/upload"
import productSchema from "../../../validations/productSchema"
import { useState } from "react"

const ProductAdd = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null)
  const { addProduct } = userProduct()
  const { state } = useCategory()
  const { register, formState: { errors }, handleSubmit, setValue } = useForm<Product>({ resolver: zodResolver(productSchema) })
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      try {
        const thumbnailUrl = await UploadImage(file)
        setValue('thumbnail', thumbnailUrl)
        setThumbnailUrl(thumbnailUrl)
      }
      catch (error) {
        console.log(error);

      }
    }
  }
  const handleSubmitForm = async (res: Product) => {
    try {
      const updateProduct = { ...res }
      addProduct(updateProduct)

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
          <input type="file" placeholder="Link" onChange={handleFileChange} />
          {thumbnailUrl && (
            <img src={thumbnailUrl} alt="Product Thumbnail" style={{ maxWidth: "200px", marginTop: "10px" }} />
          )}
          <div className="font-bold text-red-600">{errors.thumbnail && <p>{errors.thumbnail?.message}</p>}</div>
        </div>
        {thumbnailUrl && <Button className="w-full" type="primary" htmlType="submit">Submit</Button>
        }
      </form>
    </section>
  )
}

export default ProductAdd
