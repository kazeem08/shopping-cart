/* eslint-disable @typescript-eslint/no-unsafe-return */
import { CartItem } from "./cart";

// calculates subtotal
export function calculate(products: any[], productPriceMap: { [x: string]: number; }){
    const subTotal = products.reduce((acc: number, cur: CartItem) => {
        const productPrice: number = productPriceMap[cur.product as unknown as string];

        const totalProductPrice: number = productPrice * +(cur.quantity);

        return acc += totalProductPrice;
    }, 0);

    return subTotal;
}