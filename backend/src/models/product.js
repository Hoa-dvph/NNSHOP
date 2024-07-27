import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String,
        },
        sale: {
            type: String,
        },
        priceOld: {
            type: String,
        },
        priceNew: {
            type: String,
        },
        description: {
            type: String,
        },
        countInStock: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
