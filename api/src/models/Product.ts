import mongoose from 'mongoose';
import { UserType } from '../interfaces/User';
import { CartType, ProductType } from '../interfaces/Cart';

const productSchema = new mongoose.Schema<ProductType>(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
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
const orderSchema = new mongoose.Schema({
  useId: { type: String },
  nameCustomer: String,
  nameShipping: String,
  addressShipping: String,
  phoneShipping: String,
  subtotal: Number,
  shippingFee: Number,
  total: Number,
  products: [
    {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  status: { type: String, enum: ['Pending'] },
});

export const Product = mongoose.model<ProductType>('Product', productSchema);
export const User = mongoose.model<UserType>('User', userSchema);
export const Cart = mongoose.model<CartType>('Cart', cartSchema);
export const Order = mongoose.model('Order', orderSchema);
