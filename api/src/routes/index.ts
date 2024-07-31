import { Router } from 'express';
import productRouter from './product';
import categoryRouter from './category';
import authRouter from './auth';
import cartRouter from './cart';
import orderRouter from './order';

const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/auth', authRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);

export default router;
