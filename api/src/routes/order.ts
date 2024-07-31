import { Router } from 'express';

import { OrderController } from '../controllers/product';

const orderRouter = Router();
orderRouter.get('/', OrderController.GetAllOrder);
orderRouter.post('/', OrderController.AddNewOrder);
orderRouter.get('/:id', OrderController.GetOrder);
orderRouter.delete('/:id', OrderController.RemoveOrder);

export default orderRouter;
