import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  postEditProduct,
  getProducts,
  postProduct,
  getEditProduct,
} from "../controllers/products";

const router = Router();

router.get("/", getProducts);
router.get("/add-product", addProduct);
router.post("/add-product", postProduct);
router.post("/delete-product", deleteProduct);
router.get("/edit-product/:id", getEditProduct);
router.post("/edit-product", postEditProduct);

export default router;
