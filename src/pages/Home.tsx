import BestSell from "../components/BestSell"
import Category from "../components/Category"
import Register from "../components/Register"
import Slide from "../components/Slide"
import Tags from "../components/Tags"

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