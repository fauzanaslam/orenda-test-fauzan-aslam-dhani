// models/Order.js
import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import Customer from "./Customer";
import Product from "./Product";

interface OrderAttributes {
  id?: number;
  customerId?: number;
  totalPrice?: number;
  discount?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderInput extends Optional<OrderAttributes, "id"> {}
export interface OrderOutput extends Required<OrderAttributes> {}

class Order
  extends Model<OrderAttributes, OrderInput>
  implements OrderAttributes
{
  public id!: number;
  public customerId!: number;
  public totalPrice!: number;
  public discount!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
    modelName: "Order",
  }
);

Order.belongsTo(Customer, { foreignKey: "customerId" });
Order.belongsToMany(Product, {
  through: "OrderProduct",
  foreignKey: "orderId",
});

export default Order;
