/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';


import productService from '../services/productService'


// Constants
const router = Router();
const { OK } = StatusCodes;


/**
 * Get all products.
 */
router.get('/', async (_: Request, res: Response) => {
    const products = await productService.getAll();
    return res.status(OK).json(products);
});

/**
 * Get one product.
 */
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    
    // Fetch data
    const product = await productService.getOne(id);
    return res.status(OK).json(product);
});



// Export default
export default router;
