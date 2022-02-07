import { Document } from "mongoose";
import { ProductType } from '../types/product'

export type CartItem = {
    product: ProductType & string,
    quantity: number,
}

export interface CartType extends Document {
    products: CartItem[];
    total:  number,
    discounts: number,
    subTotal: number,
    tax: number,
}

export type CreateCartType = {
    cartId: string;
    productId: string,
}