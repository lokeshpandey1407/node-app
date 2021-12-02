"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const products_1 = __importDefault(require("./routes/products"));
const app = (0, express_1.default)();
const MyProducts = mongoose_1.default.model("Products");
app.use(express_1.default.static(path_1.default.join(__dirname)));
mongoose_1.default.Promise = global.Promise;
const mongodbApi = "mongodb+srv://lokesh1407:lokesh1407@cluster0.hqxrl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.set("view engine", "ejs");
app.set("views", "views");
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/", products_1.default);
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
