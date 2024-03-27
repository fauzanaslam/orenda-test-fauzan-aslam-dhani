import { Request, Response } from "express";
import Customer from "../db/models/Customer";

const CreateCustomer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, phone, email, address } = req.body;

    const customer = await Customer.create({
      name,
      phone,
      email,
      address,
    });

    return res.status(201).send({
      status: 201,
      message: "Customer Created",
      data: customer,
    });
  } catch (error: any) {
    return res.status(500).send({
      status: 500,
      message: error.message,
      error: error,
    });
  }
};

const GetAllCustomer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const customer = await Customer.findAll();

    return res.status(200).send({
      status: 200,
      message: "get all customer success",
      data: customer,
    });
  } catch (error: any) {
    return res.status(500).send({
      status: 500,
      message: error.message,
      error: error,
    });
  }
};

const UpdateCustomer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, phone, email, address } = req.body;

    const customer = await Customer.findOne({
      where: {
        id: id,
      },
    });

    if (!customer) {
      return res.status(404).send({
        status: 404,
        message: "Customer not found",
      });
    }

    customer.name = name;
    customer.phone = phone;
    customer.email = email;
    customer.address = address;

    await customer.save();

    return res.status(200).send({
      status: 200,
      message: "Update Customer succes",
    });
  } catch (error: any) {
    return res.status(500).send({
      status: 500,
      message: error.message,
      error: error,
    });
  }
};

const DeleteCustomer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const customer = await Customer.findOne({
      where: {
        id: id,
      },
    });

    if (!customer) {
      return res.status(404).send({
        status: 404,
        message: "customer not found",
      });
    }

    await customer.destroy();
    return res.status(200).send({
      status: 200,
      message: "customer removed",
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
  CreateCustomer,
  GetAllCustomer,
  UpdateCustomer,
  DeleteCustomer,
};
