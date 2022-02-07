import { Router } from 'express';
import productRouter from './product';
import cartRouter from './cart';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/products', productRouter);
baseRouter.use('/carts', cartRouter);


// Export default.
export default baseRouter;
