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
const product_1 = require("../models/product");
/**
 * Get all product.
 *
 * @returns
 */
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return product_1.ProductModel.find();
    });
}
/**
 * Get one product.
 *
 * @param _id
 * @returns
 */
function getOne(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_1.ProductModel.findOne({ _id });
        if (!product) {
            throw new Error('product not found');
        }
        return product;
    });
}
// Export default
exports.default = {
    getAll,
    getOne,
};
