import { Router } from 'express';

import CategorySchema from '../validations/category.validation';
import { CategoryController } from '../controllers/product';
import validBodyRequest from '../middlewares/validBodyRequest';
// import { checkAuth } from '../middlewares/checkAuth';
// import { checkIsAdmin } from '../middlewares/checkIsAdmin';

const categoryRouter = Router();

categoryRouter.get('/', CategoryController.Query);
categoryRouter.get('/:id', CategoryController.Get_One);
categoryRouter.get(
  '/product-by-category/:id',
  CategoryController.ProductsByCategory
);

// categoryRouter.use(checkAuth, checkIsAdmin);
categoryRouter.delete('/:id', CategoryController.Delete);

categoryRouter.use(validBodyRequest(CategorySchema)); //Middleware
categoryRouter.post('/', CategoryController.Create);
categoryRouter.put('/update/:id', CategoryController.Update);

export default categoryRouter;
