import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface ProductAttributes {
  id?: number;
  name?: string | null;
  unit?: number | null;
  price?: number | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductInput extends Optional<ProductAttributes, "id"> {}
export interface ProductOutput extends Required<ProductAttributes> {}

class Product
  extends Model<ProductAttributes, ProductInput>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public unit!: number;
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unit: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);
export default Product;
