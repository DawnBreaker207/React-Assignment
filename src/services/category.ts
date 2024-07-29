import { Category } from '../common/types/category';
import instance from '../configs/axios';

const GetCategory = async () => {
  try {
    const { data } = await instance.get('/categories');
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

const GetOneCategory = async (id: string | undefined) => {
  try {
    const { data } = await instance.get(`/categories/${id}`);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};

const CreateCategory = async (dataInput: Category) => {
  try {
    const { data } = await instance.post('/categories', dataInput);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};
const UpdateCategory = async (id: string | undefined, dataInput: Category) => {
  try {
    const { data } = await instance.put(`/categories/update/${id}`, dataInput);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};
const DeleteCategory = async (id: string | undefined) => {
  try {
    const { data } = await instance.delete(`/categories/${id}`);
    return data.res;
  } catch (error) {
    console.log(error);
  }
};
export {
  CreateCategory,
  DeleteCategory,
  GetCategory,
  GetOneCategory,
  UpdateCategory,
};
