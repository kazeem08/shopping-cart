/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ProductType } from '../types/product';
import { ProductModel } from '../models/product';


/**
 * Get all product.
 * 
 * @returns 
 */
async function getAll(): Promise<ProductType[]> {
    return ProductModel.find();
}


/**
 * Get one product.
 * 
 * @param _id 
 * @returns 
 */
async function getOne(_id : string): Promise<ProductType> {
    const product = await ProductModel.findOne({ _id });

    if(!product){
        throw new Error('product not found');
    }

    return product;
}

// Export default
export default {
    getAll,
    getOne,
};
