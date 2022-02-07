"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// declare cart schema
const cartSchema = new mongoose_1.default.Schema({
    products: {
        type: Array,
        of: {
            product: {
                type: mongoose_1.default.Types.ObjectId,
                ref: 'product'
            },
            quantity: {
                type: Number,
            },
        }
    },
    total: {
        type: Number,
        default: 0
    },
    discounts: {
        type: Number,
        default: 20
    },
    subTotal: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 200
    },
});
exports.CartModel = mongoose_1.default.model('cart', cartSchema);
