import { Router } from 'express';

import { checkAuth } from '../middlewares/checkAuth';
import { CartController } from '../controllers/product';

const cartRouter = Router();

cartRouter.post('/add-to-cart', CartController.addItemToCart);
cartRouter.put(
  '/update-product-quantity',
  CartController.updateProductQuantity
);
cartRouter.delete('/remove-cart', CartController.removeFromCart);
cartRouter.delete('/:id', CartController.removeCart);
cartRouter.post('/increase', CartController.increaseProductQuantity);
cartRouter.post('/decrease', CartController.decreaseProductQuantity);
cartRouter.use(checkAuth);
cartRouter.get('/:userId', CartController.getCartById);
export default cartRouter;
