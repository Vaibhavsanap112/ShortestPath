import mongoose from "mongoose";

export const citySchema = new mongoose.Schema({
    name: String,
    connections: [{
        destiation: String,
        weight: Number
    }]
})