/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CartModel } from '../models/cart';
import { ProductModel } from '../models/product';
import { calculate } from '../types/calculator';
import { CartItem, CartType, CreateCartType } from '../types/cart';


/**
 * Get all carts.
 * 
 * @returns 
 */
async function getAll(): Promise<CartType[]> {
    return CartModel.find();
}

/**
 * Remove from cart.
 * 
 * @returns 
 */
async function addToCart({ cartId, productId }: CreateCartType): Promise<CartType> {

    // get product
    const ProductExist = await ProductModel.findOne({_id: productId});

    if(!ProductExist){
        throw new Error('Product does not exist');
    }

    // get all product
    const products = await ProductModel.find().select('price');

    const productPriceMap = products.reduce((acc: { [ key: string ]: number }, cur) => {
        acc[cur._id] = cur.price;

        return acc;
    }, {})

    let cart = await CartModel.findOne({ _id: cartId});
    //if cart exists, add to cart

    if(cart){

        // check if product exist in the cart
        const isExist = cart.products.find((elem: CartItem) => {
            return elem.product.toString() === productId;
        });

        if(isExist){
           const result = cart.products.map((elem: CartItem) => {
               if(elem.product.toString() === productId){
                   elem.quantity = +(elem.quantity) + 1;
               }
               return elem;
           });
           
           cart.products = result;
        } else{
            cart.products.push({
                    product: productId,
                    quantity: 1,
            })
        }
    }else {
        const newCartData = {
            products: [
                {
                    product: productId,
                    quantity: 1,
                }
            ],
        }

        cart = new CartModel(newCartData);

    }

    // compute cart subtotal
    const subTotal = calculate(cart.products, productPriceMap)
    
    cart.total = (subTotal + cart.tax) - cart.discounts;
    cart.subTotal = subTotal;

    await cart.save()
    return cart as CartType;

}

async function removeFromCart({ cartId, productId }: CreateCartType): Promise<CartType> {

    // get cart
    const products = await ProductModel.find().select('price');

    const productPriceMap = products.reduce((acc: { [key: string]: number }, cur) => {
        acc[cur._id] = cur.price;

        return acc;
    }, {})

    const cart = await CartModel.findOne({ _id: cartId });
    //if cart exists, add to cart

    if (!cart) {
        throw new Error('Cart not found');
    }

    // check if product exist in the cart
    const isExist = cart.products.find((elem: CartItem) => {
        return elem.product.toString() === productId;
    });

    if (isExist) {
        const result = cart.products.map((elem: CartItem) => {

            if(+(elem.quantity) > 1){
                if (elem.product.toString() === productId) {
                    elem.quantity = +(elem.quantity) - 1;
                }  
                return elem;
            }
        });

        cart.products = result.filter((elem: CartItem) => elem !== undefined);
    } else {
       throw new Error('Product does not exist in cart')
    }

    if(!cart.products.length){
        await CartModel.deleteOne({_id: cartId});
        return cart as CartType;
    }


    // compute cart subtotal
    const subTotal = calculate(cart.products, productPriceMap)

    cart.total = (subTotal + cart.tax) - cart.discounts;
    cart.subTotal = subTotal;

    await cart.save()
    return cart as CartType;

}

/**
 * Get one cart.
 * 
 * @param _id 
 * @returns 
 */
async function getOne( id : string): Promise<CartType> {
    const cart = await CartModel.findOne({ _id: id }).populate('products');

    if(!cart){
        throw new Error('cart not found');
    }

    return cart as CartType;
}

// Export default
export default {
    getAll,
    getOne,
    addToCart,
    removeFromCart,
};
