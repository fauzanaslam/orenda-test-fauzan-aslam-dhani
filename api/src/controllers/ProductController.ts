import { Request, Response } from "express";
import Product from "../db/models/Product";

const CreateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, unit, price } = req.body;

    const product = await Product.create({
      name,
      unit,
      price,
    });

    return res.status(201).send({
      status: 201,
      message: "Product Created",
      data: product,
    });
  } catch (error: any) {
    return res.status(500).send({
      status: 500,
      message: error.message,
      error: error,
    });
  }
};

const GetAllProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const product = await Product.findAll();

    return res.status(200).send({
      status: 200,
      message: "get all product success",
      data: product,
    });
  } catch (error: any) {
    return res.status(500).send({
      status: 500,
      message: error.message,
      error: error,
    });
  }
};

const UpdateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, unit, price } = req.body;

    const product = await Product.findOne({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).send({
        status: 404,
        message: "Product not found",
      });
    }

    product.name = name;
    product.unit = unit;
    product.price = price;

    await product.save();

    return res.status(200).send({
      status: 200,
      message: "Update Product succes",
    });
  } catch (error: any) {
    return res.status(500).send({
      status: 500,
      message: error.message,
      error: error,
    });
  }
};

const DeleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).send({
        status: 404,
        message: "product not found",
      });
    }

    await product.destroy();
    return res.status(200).send({
      status: 200,
      message: "product removed",
    });
  } catch (error: any) {
    return res.status(500).send({
      status: 500,
      message: error.message,
      error: error,
    });
  }
};

export default {
  CreateProduct,
  GetAllProduct,
  UpdateProduct,
  DeleteProduct,
};
