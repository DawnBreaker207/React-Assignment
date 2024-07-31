import mongoose from 'mongoose';
import { CategoryType } from '../interfaces/Cart';

const categorySchema = new mongoose.Schema<CategoryType>(
  {
    name: { type: String },
    description: { type: String },
    thumbnail: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model<CategoryType>('Category', categorySchema);
