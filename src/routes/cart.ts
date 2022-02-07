/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { errors } from '../shared/constants';

import cartService from '../services/cartService'
import { CreateCartType } from '../types/cart';


// Constants
const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


/**
 * Get all carts.
 */
router.get('/', async (_: Request, res: Response) => {
    const carts = await cartService.getAll();
    return res.status(OK).json(carts);
});


/**
 * get one cart.
 */
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check param
    if (!id) {
        return res.status(BAD_REQUEST).json({
            error: errors.paramMissing,
        });
    }
    // Fetch data
    await cartService.getOne(id);
    return res.status(OK).end();
});


/**
 * add to cart.
 */
router.post('/', async (req: Request, res: Response) => {
    const data: CreateCartType = req.body;
  
    // Fetch data
    const cart = await cartService.addToCart(data);
    return res.status(CREATED).json(cart);
});

router.delete('/:cartId/:productId', async (req: Request, res: Response) => {
    const { cartId, productId } = req.params;
    
    // Fetch data
    await cartService.removeFromCart({ cartId, productId});
    return res.status(OK).end();
});



// Export default
export default router;
