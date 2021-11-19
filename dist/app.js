"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = __importDefault(require("./models/product"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const MyProducts = mongoose_1.default.model("Products");
mongoose_1.default.Promise = global.Promise;
const mongodbApi = "mongodb+srv://lokesh1407:lokesh1407@cluster0.hqxrl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get("/", (req, res, next) => {
    MyProducts.find((err, docs) => {
        if (!err) {
            console.log(docs);
            res.render("home.ejs", { products: docs });
        }
    });
});
app.get("/add-product", (req, res, next) => {
    res.render("add-product.ejs");
});
app.post("/add-product", (req, res, next) => {
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
});
try {
    mongoose_1.default.connect(mongodbApi, (err) => {
        if (!err)
            console.log("connected to mongodb sucsessfully" + "👍");
        console.log(err);
    });
}
catch (error) {
    console.log(error);
}
app.listen(5000, () => {
    console.log(`Server is running at 5000`);
});
