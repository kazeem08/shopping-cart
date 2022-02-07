/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import logger from 'jet-logger';


import productService from '../services/productService'


// Constants
const router = Router();
const { OK, NOT_FOUND, BAD_REQUEST } = StatusCodes;


/**
 * Get all products.
 */
router.get('/', async (_: Request, res: Response) => {
    try {
        const products = await productService.getAll();
        return res.status(OK).json({
            message: 'products fetched successfully',
            data: products,
            error: false,
        });
    } catch (e) {
        logger.err(e.message)
        return res.status(BAD_REQUEST).json({
            error: true,
            message: e.message,
        });
    }

});

/**
 * Get one product.
 */
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Fetch data
        const product = await productService.getOne(id);
        return res.status(OK).json({
            message: 'product fetched successfully',
            data: product,
            error: false,
        });
    } catch (e) {
        logger.err(e.message)
        return res.status(NOT_FOUND).json({
            error: true,
            message: e.message,
        });
    }
});



// Export default
export default router;
