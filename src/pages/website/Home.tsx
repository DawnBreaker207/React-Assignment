import BestSell from "../../components/website/BestSell"
import Category from "../../components/website/Category"
import Register from "../../components/website/Register"
import Slide from "../../components/website/Slide"
import Tags from "../../components/website/Tags"

const Home = () => {
  return (
    <>
      <main >
        <Slide />
        <BestSell />
        <Tags />
        <Category />
        <Register />
      </main>
    </>
  )
}

export default Home