import express from "express";

import UserController from "../controllers/UserController";
import CustomerController from "../controllers/CustomerController";
import ProductController from "../controllers/ProductController";
import OrderController from "../controllers/OrderController";

const router = express.Router();

// user routing
router.post("/user/signup", UserController.Register);
router.post("/user/login", UserController.UserLogin);
router.post("/user/logout", UserController.userLogout);

// costumer routing
router.post("/customer", CustomerController.CreateCustomer);
router.get("/customer", CustomerController.GetAllCustomer);
router.patch("/customer/:id", CustomerController.UpdateCustomer);
router.delete("/customer/:id", CustomerController.DeleteCustomer);

// product routing
router.post("/product", ProductController.CreateProduct);
router.get("/product", ProductController.GetAllProduct);
router.patch("/product/:id", ProductController.UpdateProduct);
router.delete("/product/:id", ProductController.DeleteProduct);

// create order with multipe product routing
router.post("/orders", OrderController.createOrder);

// detail order based on orderId routing
router.get("/orders/:orderId", OrderController.getDetailOrder);

export default router;
