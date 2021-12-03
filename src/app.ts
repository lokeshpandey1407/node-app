import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import router from "./routes/products";

const app = express();

const MyProducts = mongoose.model("Products");
app.use(express.static(path.join(__dirname, "public")));

mongoose.Promise = global.Promise;
const mongodbApi =
  "mongodb+srv://lokesh1407:lokesh1407@cluster0.hqxrl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", router);

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
