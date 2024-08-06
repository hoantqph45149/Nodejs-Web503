import express from "express";
import cors from "cors";
import { default as mongoose } from "mongoose";
import {
  getAllProducts,
  getOne,
  createProduct,
  updateProduct,
  removeProduct,
} from "./controllers/product.js";
import bodyParser from "body-parser";
import { SingIn, SingUp } from "./controllers/user.js";

// Khai báo sử dụng express
const app = new express();
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
//khai báo cổng sẽ chạy server
const port = 3000;
mongoose.connect("mongodb://localhost:27017/xuong_nodejs").then(() => {
  console.log("Connected to MongoDB");
});
app.use(express.json());
// Khai báo sử dụng ejs
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/product", getAllProducts);
app.get("/product/:id", getOne);
app.post("/product", createProduct);
app.patch("/product/:id", updateProduct);
app.delete("/product/:id", removeProduct);
app.post("/login", SingIn);
app.post("/register", SingUp);
app.listen(port, () => {
  console.log(`Server đang chạy ở port http://localhost:3000/list`);
});
