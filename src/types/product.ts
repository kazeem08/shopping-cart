import { Document } from "mongoose";

export interface ProductType extends Document {
    name: string;
    quantity: number;
    price: number;
}

export type CreateProductType = {
    name: string;
    price: number,
    quantity: number,
}