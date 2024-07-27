import { Router } from "express";
import {
    create,
    deleteProductById,
    getProductById,
    updateProductById,
    getAll,
} from "../controllers/product";

const router = Router();

router.get("/products", getAll);
router.post("/products", create);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProductById);
router.delete("/products/:id", deleteProductById);

export default router;
