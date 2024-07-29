import { CATEGORY } from "../../common/data"
import CategoryItem from "./CategoryItem"

const Category = () => {
  return (
    <section className="container max-w-6xl mx-auto">
      <div className="font-bold text-[30px] pb-[30px]">Kategorien</div>

      <div className="grid grid-cols-3 gap-y-3 gap-x-6">
        {CATEGORY.map((index) => (
          <CategoryItem key={index.id} {...index} />
        ))}
      </div>
    </section>
  )
}

export default Category
