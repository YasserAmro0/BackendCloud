import { DataTypes } from 'sequelize';
import { AdminAttributes } from '../types';
import sequelize from '../db/connection';

const Admin = sequelize.define<AdminAttributes>('admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default Admin;