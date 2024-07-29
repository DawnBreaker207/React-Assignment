import Joi from 'joi';
const productSchema = Joi.object({
  title: Joi.string().required().min(3).max(255),
  price: Joi.number().required().min(0),
  description: Joi.string().min(3),
  category: Joi.string().min(3).max(255),
  thumbnail: Joi.string(),

});
export default productSchema;
