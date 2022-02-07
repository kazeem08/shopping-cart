/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import logger from 'jet-logger';


import cartService from '../services/cartService'
import { CreateCartType } from '../types/cart';


// Constants
const router = Router();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = StatusCodes;


/**
 * Get all carts.
 */
router.get('/', async (_: Request, res: Response) => {
    const carts = await cartService.getAll();
    return res.status(OK).json({
        message: 'carts fetched successfully',
        data: carts,
        error: false,
    });
});


/**
 * get one cart.
 */
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Fetch data
        const cart = await cartService.getOne(id);
        return res.status(OK).json({
            message: 'cart fetched successfully',
            data: cart,
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


/**
 * add to cart.
 */
router.post('/', async (req: Request, res: Response) => {
    const data: CreateCartType = req.body;

    // Fetch data
    try {
        const cart = await cartService.addToCart(data);
        return res.status(CREATED).json({
            message: 'product added to cart successfully',
            data: [cart],
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

router.delete('/:cartId/:productId', async (req: Request, res: Response) => {
    const { cartId, productId } = req.params;

    // Fetch data
    try {
        await cartService.removeFromCart({ cartId, productId });
        return res.status(OK).json({
            message: 'item deleted',
            error: false
        });
    } catch (e){
        logger.err(e.message)
        return res.status(BAD_REQUEST).json({
            error: true,
            message: e.message,
        });
    }
    
});



// Export default
export default router;
