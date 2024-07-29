import Joi from 'joi';
const CategorySchema = Joi.object({
  name: Joi.string().required().min(3).max(255),
  description: Joi.string().min(3),
  products: Joi.array().optional(),
});
export default CategorySchema;
