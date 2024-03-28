import express, { Request, Response } from "express";
import Order from "../db/models/Order";
import OrderProduct from "../db/models/OrderProduct";
import Product from "../db/models/Product";
import Customer from "../db/models/Customer";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerId, products, discount } = req.body;

    if (
      !customerId ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    let totalPrice = 0;
    for (const { productId, quantity } of products) {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res
          .status(400)
          .json({ error: `Product with ID ${productId} not found` });
      }
      totalPrice += product.price * quantity;
    }

    if (discount) {
      totalPrice -= discount;
    }

    const order = await Order.create({ customerId, totalPrice, discount });

    for (const { productId, quantity } of products) {
      await OrderProduct.create({ orderId: order.id, productId, quantity });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const getDetailOrder = async (req: Request, res: Response) => {};

export default { createOrder, getDetailOrder };
