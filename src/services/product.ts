import { Product } from '../common/types/product';
import instance from '../configs/axios';

const GetProduct = async () => {
  try {
    const { data } = await instance.get('/products');
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

const GetOneProduct = async (id: string | undefined) => {
  try {
    const { data } = await instance.get(`/products/${id}`);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

const CreateProduct = async (dataInput: Product) => {
  try {
    const { data } = await instance.post('/products', dataInput);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};
const UpdateProduct = async (id: string | undefined, dataInput: Product) => {
  try {
    const { data } = await instance.put(`/products/update/${id}`, dataInput);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};
const DeleteProduct = async (id: string | undefined) => {
  try {
    const { data } = await instance.delete(`/products/${id}`);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};
export {
  GetOneProduct,
  GetProduct,
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
};
