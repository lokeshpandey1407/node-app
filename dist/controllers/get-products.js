"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.postProduct = exports.addProduct = exports.getProducts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = __importDefault(require("../models/product"));
const MyProducts = mongoose_1.default.model("Products");
const getProducts = (req, res, next) => {
    MyProducts.find((err, docs) => {
        if (!err) {
            console.log(docs);
            res.render("home", { products: docs });
        }
    });
};
exports.getProducts = getProducts;
const addProduct = (req, res, next) => {
    res.render("add-product");
};
exports.addProduct = addProduct;
const postProduct = (req, res, next) => {
    var newProduct = new product_1.default({
        name: req.body.pName,
        category: req.body.pCategory,
    });
    newProduct
        .save()
        .then((doc) => {
        console.log(doc);
    })
        .catch((err) => {
        console.log(err);
    });
    res.redirect("/");
};
exports.postProduct = postProduct;
const deleteProduct = (req, res, next) => {
    const id = req.body.prodId;
    MyProducts.findByIdAndDelete(id, (err, doc) => {
        if (!err) {
            res.redirect("/");
        }
        else {
            console.log("failed to delete data");
        }
    });
};
exports.deleteProduct = deleteProduct;
