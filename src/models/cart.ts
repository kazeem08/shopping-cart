import mongoose from 'mongoose';

// declare cart schema
const cartSchema = new mongoose.Schema({
    products: {
        type: Array,
        of: {
            product: {
                type: mongoose.Types.ObjectId,
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

export const CartModel = mongoose.model('cart', cartSchema);