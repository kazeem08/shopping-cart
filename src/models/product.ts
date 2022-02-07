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
}, {
	timestamps: true,
});

export const ProductModel = mongoose.model('product', productSchema);

