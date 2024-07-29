import { TAGS } from "../../common/data"
import TagItem from "./TagItem"

const Tags = () => {
  return (
    <section className="tags pt-[60px] pb-[74px]">
      <div className="container max-w-5xl mx-auto">

        <div className="grid grid-cols-4 grid-rows-2 gap-4 tag-grid">
          {TAGS.map((index) => (
            <TagItem key={index.id} {...index} />
          ))}

        </div>
      </div>

    </section>
  )
}

export default Tags