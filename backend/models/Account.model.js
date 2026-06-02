import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
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
        enum: ["BANK", "CASH"],
        required: true,
    },
    currentBalance: {
        type: Number,
        required: true,
        default: 0,
    }
}, { timestamps: true });

export const Account = mongoose.model("Account", accountSchema);