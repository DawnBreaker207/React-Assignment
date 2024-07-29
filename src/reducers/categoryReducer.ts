import {
  Category_Action_Type,
  CategoryAction,
  StateCategory,
} from '../common/types/category';

export const initialState: StateCategory = {
  categories: [],
  error: null,
};

const categoryReducer = (
  state: StateCategory,
  action: Category_Action_Type
): StateCategory => {
  const { categories } = state;
  const { payload, type } = action;

  switch (type) {
    case CategoryAction.SET_CATEGORIES:
      return { ...state, categories: payload };
    case CategoryAction.ADD_CATEGORIES:
      return { ...state, categories: [...categories, payload] };
    case CategoryAction.UPDATE_CATEGORIES:
      return {
        ...state,
        categories: categories.map((category) =>
          category._id === payload._id ? payload : category
        ),
      };
    case CategoryAction.DELETE_CATEGORIES:
      return {
        ...state,
        categories: categories.filter((category) => category._id !== payload),
      };

    default:
      return state;
  }
};

export default categoryReducer;
