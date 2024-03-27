import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface CustomerAttributes {
  id?: number;
  name?: string | null;
  phone?: number | null;
  email?: string | null;
  address?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomerInput extends Optional<CustomerAttributes, "id"> {}
export interface CustomerOutput extends Required<CustomerAttributes> {}

class Customer
  extends Model<CustomerAttributes, CustomerInput>
  implements CustomerAttributes
{
  public id!: number;
  public name!: string;
  public phone!: number;
  public email!: string;
  public address!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Customer.init(
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
    phone: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);
export default Customer;
