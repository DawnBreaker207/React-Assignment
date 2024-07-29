import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps, AuthType } from '../common/types/auth';
import { useNavigate } from "react-router-dom";
import { Check_Authorization, Sign_In, Sign_Up } from "../services/authen";


const AuthContext = createContext<AuthContextType>({} as AuthContextType)
export const useAuth = (): AuthContextType => {

  const contextAuth = useContext(AuthContext)
  if (!contextAuth) {
    throw new Error('userProduct must be used within a ProductProvider')
  }
  return contextAuth
}

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<AuthType | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {

          const data = await Check_Authorization(token)
          setUser(data.user)
          setIsAuthenticated(true)
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false)
          setUser(null)
        }
      }
    })()
  }, [])
  const Login = async (user: AuthType) => {
    try {
      const data = await Sign_In(user)
      localStorage.setItem("token", data.accessToken)
      setUser(data?.user);
      setIsAuthenticated(true)
      navigate("/admin")
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false)
      setUser(null)

    }
  }
  const Register = async (user: AuthType) => {
    try {
      const data = await Sign_Up(user)
      localStorage.setItem("token", data.accessToken)
      setIsAuthenticated(true)
      navigate("/login")
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false)
      setUser(null)

    }
  }
  const Logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsAuthenticated(false)
    navigate("/")
  }
  return <AuthContext.Provider value={{ isAuthenticated, user, Login, Logout, Register }}>
    {children}
  </AuthContext.Provider>
}

export default AuthContextProvider