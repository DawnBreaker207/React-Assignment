import { z } from 'zod';

const productSchema = z.object({
  title: z.string().min(1, { message: 'Required title' }),
  price: z.number().min(1, { message: 'Required price' }),
  category: z.string().min(1, { message: 'Required category' }),
  description: z.string().min(5).max(500).optional(),
  thumbnail: z.any().optional(),
});

export default productSchema;
