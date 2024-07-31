import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Category } from "../../../common/types/category"
import { useCategory } from "../../../contexts/categoryContext"
import categorySchema from "../../../validations/categorySchema"
import { Button } from "antd"
import { UploadImage } from "../../../services/upload"
import { useState } from "react"

const CategoryAdd = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null)
  const { addCategory } = useCategory()
  const { register, formState: { errors }, handleSubmit, setValue } = useForm<Category>({ resolver: zodResolver(categorySchema) })
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
  const handleSubmitForm = async (res: Category) => {
    try {
      const updateProduct = { ...res }
      addCategory(updateProduct)

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="md:max-w-6xl mx-auto flex-1">

      <h1 className="my-5 text-3xl font-bold text-center">Category Add</h1>
      <form action="" onSubmit={handleSubmit(handleSubmitForm)} className="md:max-w-full md:mx-auto">
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Name">Name</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " type="text" placeholder="Title" {...register("name", { required: true, minLength: 5 })} />
          <div className="font-bold text-red-600">{errors.name && <p>{errors.name?.message}</p>}</div>
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Description">Description</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Price" {...register("description", { required: true, min: 5 })} />
          <div className="font-bold text-red-600">{errors.description && <p>{errors.description?.message}</p>}</div>
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

export default CategoryAdd