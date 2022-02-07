"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculate = void 0;
// calculates subtotal
function calculate(products, productPriceMap) {
    const subTotal = products.reduce((acc, cur) => {
        const productPrice = productPriceMap[cur.product];
        const totalProductPrice = productPrice * +(cur.quantity);
        return acc += totalProductPrice;
    }, 0);
    return subTotal;
}
exports.calculate = calculate;
