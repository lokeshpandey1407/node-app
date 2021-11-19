"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var productSchema = new Schema({
    name: {
        type: String,
    },
    category: {
        type: String,
    },
});
const Product = mongoose_1.default.model("Products", productSchema);
exports.default = Product;
