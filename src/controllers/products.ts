import { RequestHandler } from "express";
import mongoose from "mongoose";
import Product from "../models/product";

const MyProducts = mongoose.model("Products");

export const getProducts: RequestHandler = (req, res, next) => {
  MyProducts.find((err, docs) => {
    if (!err) {
      console.log(docs);
      res.render("home", { products: docs });
    }
  });
};

export const addProduct: RequestHandler = (req, res, next) => {
  res.render("add-product");
};

export const postProduct: RequestHandler = (req, res, next) => {
  var newProduct = new Product({
    id: Math.random().toString(),
    name: req.body.pName,
    category: req.body.pCategory,
  });
  newProduct
    .save()
    .then((doc: any) => {
      console.log(doc);
    })
    .catch((err: any) => {
      console.log(err);
    });
  res.redirect("/");
};

export const deleteProduct: RequestHandler = (req, res, next) => {
  const id = req.body.prodId;
  MyProducts.findByIdAndDelete(id, (err: any, doc: any) => {
    if (!err) {
      res.redirect("/");
    } else {
      console.log("failed to delete data");
    }
  });
};

let editId: string;
export const getEditProduct: RequestHandler = (req, res, next) => {
  editId = req.params._id;
  res.render("edit-product", {
    name: req.params.name,
    category: req.params.category,
  });
};

export const postEditProduct: RequestHandler = (req, res, next) => {
  const name = req.body.pName;
  const category = req.body.pCategory;
  MyProducts.findByIdAndUpdate(
    editId,
    {
      name: name,
      category: category,
    },
    function (err: any, docs: any) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
        res.redirect("/");
      }
    }
  );
};
