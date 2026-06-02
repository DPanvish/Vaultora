import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["EXPENSE", "INCOME"],
        required: true,
    }
}, { timestamps: true });

export const Category = mongoose.model("Category", categorySchema);