import mongoose from 'mongoose';


// declare cart schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    }
});

export const ProductModel = mongoose.model('product', productSchema);

