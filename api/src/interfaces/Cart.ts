import { Types } from 'mongoose';

export interface ProductType {
  _id?: Types.ObjectId | string | number;
  title: string;
  category: Types.ObjectId;
  thumbnail: string;
  description: string;
  price: number;
}
export interface ProductCart {
  userProduct: ProductType;
  quantity: number;
  price: number;
}

export interface CartType extends Document {
  userId: Types.ObjectId;
  products: Types.DocumentArray<ProductCart>;
}
