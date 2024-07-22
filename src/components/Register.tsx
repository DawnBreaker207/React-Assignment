import { Mail } from "../common/icons"

const Register = () => {
  return (
    <section className="container max-w-3xl mx-auto">
      <div className="flex flex-col pt-[100px] pb-[70px]">
        <div >
          <h1 className="font-bold text-3xl pb-[54px] text-[#505F4E]">Etwas abonnieren * <br />
            _ Unser Newsletter</h1>
        </div>
        <div className="flex flex-row justify-between">
          <p className="w-[250px] ml-[30px]">Get weekly update about our product on your email, no spam guaranteed we promise ✌️</p>
          <div className="flex flex-row justify-between flex-grow-[0.90] relative bg-white">
            <div className="flex flex-row items-center ">
              <img src={Mail} alt="" className="ml-[10px] mr-[20px] " />
              <input type="text" placeholder="youremail123@gmail.com" className="flex-grow focus:outline-none focus:ring-0" />
            </div>
            <button className="py-[18px] pl-[38px] pr-[26px] mt-9 bg-[#656C66] absolute right-0 text-white font-bold">ABONNIEREN</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
