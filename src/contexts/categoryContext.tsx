import { useNavigate } from "react-router-dom"
import { Category, CategoryAction, CategoryContextType, CategoryProviderProps } from "../common/types/category"
import { createContext, useContext, useEffect, useReducer } from "react"
import { CreateCategory, DeleteCategory, GetCategory, UpdateCategory } from "../services/category"
import categoryReducer, { initialState } from "../reducers/categoryReducer"
import { openNotify } from "../utils/notification"




const CategoryContext = createContext<CategoryContextType>({} as CategoryContextType)

export const useCategory = (): CategoryContextType => {
  const contextCategory = useContext(CategoryContext)
  if (!CategoryContext) {
    throw new Error('userProduct must be used within a ProductProvider')
  }
  return contextCategory
}

const CategoryContextProvider = ({ children }: CategoryProviderProps) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(categoryReducer, initialState)

  useEffect(() => {
    (async () => {
      try {
        const data = await GetCategory()
        dispatch({ type: CategoryAction.SET_CATEGORIES, payload: data })

      } catch (error) {
        console.log(error);

      }
    })()
  }, [])

  const addCategory = async (dataInput: Category) => {
    try {
      const data = await CreateCategory(dataInput)
      openNotify('Create category success')
      dispatch({ type: CategoryAction.ADD_CATEGORIES, payload: data })
      if (data && confirm('Add success. go to list ?')) {
        navigate('/admin/categories')
      }
    } catch (error) {
      console.log(error);
    }
  }
  const editCategory = async (_id: string, dataInput: Category) => {
    try {
      await UpdateCategory(_id, dataInput)
      dispatch({ type: CategoryAction.UPDATE_CATEGORIES, payload: { ...dataInput, _id } })
      openNotify('Edit category success')
      if (confirm('Edit success, go to list ?')) {
        navigate('/admin/categories')
      }
    } catch (error) {
      console.log(error);
    }
  }
  const deleteCategory = async (_id: string) => {
    try {
      await DeleteCategory(_id)
      openNotify('Delete category success')
      dispatch({ type: CategoryAction.DELETE_CATEGORIES, payload: _id })
    } catch (error) {
      console.log(error);
    }
  }
  return <CategoryContext.Provider value={{ state, dispatch, addCategory, editCategory, deleteCategory }}>
    {children}
  </CategoryContext.Provider>
}

export default CategoryContextProvider