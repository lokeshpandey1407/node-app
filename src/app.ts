import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Product from "./models/product";
import bodyParser from "body-parser";

const app = express();

const MyProducts = mongoose.model("Products");

mongoose.Promise = global.Promise;
const mongodbApi =
  "mongodb+srv://lokesh1407:lokesh1407@cluster0.hqxrl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  MyProducts.find((err, docs) => {
    if (!err) {
      console.log(docs);
      res.render("home.ejs", { products: docs });
    }
  });
});

app.get("/add-product", (req: Request, res: Response, next: NextFunction) => {
  res.render("add-product.ejs");
});

app.post("/add-product", (req, res, next) => {
  var newProduct = new Product({
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
});

app.post("/delete-product", (req, res, next) => {
  const id = req.body.prodId;
  MyProducts.findByIdAndDelete(id, (err: any, doc: any) => {
    if (!err) {
      res.redirect("/");
    } else {
      console.log("failed to delete data");
    }
  });
});

try {
  mongoose.connect(mongodbApi, (err) => {
    if (!err) console.log("connected to mongodb sucsessfully" + "👍");
    console.log(err);
  });
} catch (error) {
  console.log(error);
}

app.listen(5000, () => {
  console.log(`Server is running at 5000`);
});
