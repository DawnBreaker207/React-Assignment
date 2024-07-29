import mongoose from 'mongoose';
import { UserType } from '../interfaces/User';
import { CartType, ProductType } from '../interfaces/Cart';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
  },
  { timestamps: true, versionKey: false }
);
const productSchema = new mongoose.Schema<ProductType>(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    thumbnail: { type: String },
  },
  { timestamps: true, versionKey: false }
);
const userSchema = new mongoose.Schema<UserType>(
  {
    email: { type: String, unique: true, require: true },
    password: { type: String, required: true },
    roles: { type: String, default: 'member' },
  },
  { timestamps: true, versionKey: false }
);
const cartSchema = new mongoose.Schema<CartType>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        userProduct: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
export const Category = mongoose.model('Category', categorySchema);
export const Product = mongoose.model<ProductType>('Product', productSchema);
export const User = mongoose.model<UserType>('User', userSchema);
export const Cart = mongoose.model<CartType>('Cart', cartSchema);
