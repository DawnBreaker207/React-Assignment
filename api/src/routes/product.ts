import { Router } from 'express';

import productSchema from '../validations/product.validation';
import { ProductController } from '../controllers/product';
import validBodyRequest from '../middlewares/validBodyRequest';

const productRouter = Router();

productRouter.get('/', ProductController.Query);
productRouter.get('/:id', ProductController.Get_One);

// productRouter.use(checkAuth, checkIsAdmin);
productRouter.delete('/:id', ProductController.Delete);

productRouter.use(validBodyRequest(productSchema)); //Middleware
productRouter.post('/', ProductController.Create);
productRouter.put('/update/:id', ProductController.Update);

export default productRouter;
