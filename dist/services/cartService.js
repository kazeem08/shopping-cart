"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const cart_1 = require("../models/cart");
const product_1 = require("../models/product");
const calculator_1 = require("../types/calculator");
/**
 * Get all carts.
 *
 * @returns
 */
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return cart_1.CartModel.find();
    });
}
/**
 * Remove from cart.
 *
 * @returns
 */
function addToCart({ cartId, productId }) {
    return __awaiter(this, void 0, void 0, function* () {
        // get product
        const ProductExist = yield product_1.ProductModel.findOne({ _id: productId });
        if (!ProductExist) {
            throw new Error('Product does not exist');
        }
        // get all product
        const products = yield product_1.ProductModel.find().select('price');
        const productPriceMap = products.reduce((acc, cur) => {
            acc[cur._id] = cur.price;
            return acc;
        }, {});
        let cart = yield cart_1.CartModel.findOne({ _id: cartId });
        //if cart exists, add to cart
        if (cart) {
            // check if product exist in the cart
            const isExist = cart.products.find((elem) => {
                return elem.product.toString() === productId;
            });
            if (isExist) {
                const result = cart.products.map((elem) => {
                    if (elem.product.toString() === productId) {
                        elem.quantity = +(elem.quantity) + 1;
                    }
                    return elem;
                });
                cart.products = result;
            }
            else {
                cart.products.push({
                    product: productId,
                    quantity: 1,
                });
            }
        }
        else {
            const newCartData = {
                products: [
                    {
                        product: productId,
                        quantity: 1,
                    }
                ],
            };
            cart = new cart_1.CartModel(newCartData);
        }
        // compute cart subtotal
        const subTotal = (0, calculator_1.calculate)(cart.products, productPriceMap);
        cart.total = (subTotal + cart.tax) - cart.discounts;
        cart.subTotal = subTotal;
        yield cart.save();
        return cart;
    });
}
function removeFromCart({ cartId, productId }) {
    return __awaiter(this, void 0, void 0, function* () {
        // get cart
        const products = yield product_1.ProductModel.find().select('price');
        const productPriceMap = products.reduce((acc, cur) => {
            acc[cur._id] = cur.price;
            return acc;
        }, {});
        const cart = yield cart_1.CartModel.findOne({ _id: cartId });
        //if cart exists, add to cart
        if (!cart) {
            throw new Error('Cart not found');
        }
        // check if product exist in the cart
        const isExist = cart.products.find((elem) => {
            return elem.product.toString() === productId;
        });
        if (isExist) {
            const result = cart.products.map((elem) => {
                if (+(elem.quantity) > 1) {
                    if (elem.product.toString() === productId) {
                        elem.quantity = +(elem.quantity) - 1;
                    }
                    return elem;
                }
            });
            cart.products = result.filter((elem) => elem !== undefined);
        }
        else {
            throw new Error('Product does not exist in cart');
        }
        if (!cart.products.length) {
            yield cart_1.CartModel.deleteOne({ _id: cartId });
            return cart;
        }
        // compute cart subtotal
        const subTotal = (0, calculator_1.calculate)(cart.products, productPriceMap);
        cart.total = (subTotal + cart.tax) - cart.discounts;
        cart.subTotal = subTotal;
        yield cart.save();
        return cart;
    });
}
/**
 * Get one cart.
 *
 * @param _id
 * @returns
 */
function getOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield cart_1.CartModel.findOne({ _id: id }).populate('products');
        if (!cart) {
            throw new Error('cart not found');
        }
        return cart;
    });
}
// Export default
exports.default = {
    getAll,
    getOne,
    addToCart,
    removeFromCart,
};
