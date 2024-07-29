import { createContext, useContext, useEffect, useReducer } from "react";
import { Product, ProductAction, ProductContextType, ProductProviderProps } from '../common/types/product';
import { useNavigate } from "react-router-dom";
import productReducer, { initialState } from "../reducers/productReducer";
import { CreateProduct, DeleteProduct, GetProduct, UpdateProduct } from "../services/product";
import { openNotify } from "../utils/notification";

const ProductContext = createContext<ProductContextType>({} as ProductContextType)

export const userProduct = (): ProductContextType => {
  const contextProduct = useContext(ProductContext)
  if (!ProductContext) {
    throw new Error('userProduct must be used within a ProductProvider')
  }
  return contextProduct
}

const ProductContextProvider = ({ children }: ProductProviderProps) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(productReducer, initialState)

  useEffect(() => {
    (async () => {
      try {
        const data = await GetProduct()
        dispatch({ type: ProductAction.SET_PRODUCTS, payload: data })

      } catch (error) {
        console.log(error);

      }
    })()
  }, [])

  const addProduct = async (dataInput: Product) => {
    try {
      const data = await CreateProduct(dataInput)
      openNotify('Create product success')
      dispatch({ type: ProductAction.ADD_PRODUCT, payload: data })
      if (data && confirm('Add success. go to list ?')) {
        navigate('/admin/products')
      }
    } catch (error) {
      console.log(error);
    }
  }
  const editProduct = async (_id: string, dataInput: Product) => {
    try {
      await UpdateProduct(_id, dataInput)
      openNotify('Edit product success')
      dispatch({ type: ProductAction.UPDATE_PRODUCT, payload: { ...dataInput, _id } })
      if (confirm('Edit success, go to list ?')) {
        navigate('/admin/products')
      }
    } catch (error) {
      console.log(error);
    }
  }
  const deleteProduct = async (_id: string) => {
    try {
      await DeleteProduct(_id)
      openNotify('Delete product success')
      dispatch({ type: ProductAction.DELETE_PRODUCT, payload: _id })
    } catch (error) {
      console.log(error);
    }
  }
  return <ProductContext.Provider value={{ state, dispatch, addProduct, editProduct, deleteProduct }}>
    {children}
  </ProductContext.Provider>
}

export default ProductContextProvider