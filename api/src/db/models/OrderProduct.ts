// models/OrderProduct.ts
import { DataTypes, Model } from "sequelize";
import connection from "../../config/dbConnect";
import Product from "./Product";

interface OrderProductAttributes {
  orderId: number;
  productId: number;
  quantity: number; // Definisi properti quantity
}

class OrderProduct
  extends Model<OrderProductAttributes>
  implements OrderProductAttributes
{
  public orderId!: number;
  public productId!: number;
  public quantity!: number; // Definisi properti quantity

  public static associate(models: any) {
    OrderProduct.belongsTo(models.Order, { foreignKey: "orderId" });
    OrderProduct.belongsTo(models.Product, { foreignKey: "productId" });
  }
}

OrderProduct.init(
  {
    orderId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "OrderProduct",
    timestamps: false,
    underscored: false,
  }
);

export default OrderProduct;
