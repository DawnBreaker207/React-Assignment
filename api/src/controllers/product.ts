import { NextFunction, Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { ProductCart } from '../interfaces/Cart';
import { UserType } from '../interfaces/User';
import Category from '../models/Category';
import { Cart, Order, Product, User } from '../models/Product';
import { comparePassword, hashPassword } from '../utils/hashPassword';
import { createToken } from '../utils/jwt';
type QueryParam = {
  search?: string;
  filter?: string;
  sort?: string;
  category?: string;
  page?: number;
  limit?: number;
};
const ProductController = {
  Query: async (req: Request, res: Response) => {
    try {
      const {
        search,
        filter,
        sort,
        category,
        page = 1,
        limit = 10,
      } = req.query as QueryParam;
      const query: any = {};
      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }
      if (filter) {
        query.price = { $lte: Number(filter) };
      }
      if (category && mongoose.Types.ObjectId.isValid(category)) {
        query.category = new mongoose.Types.ObjectId(category);
      }
      let sortOptions: any = {};
      if (sort) {
        const [key, order] = (sort as string).split(':');
        sortOptions[key] = order === 'desc' ? -1 : 1;
      } else {
        sortOptions = { createdAt: -1 };
      }
      const products = await Product.find(query)
        .sort(sortOptions)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .populate('category');
      const total = await Product.countDocuments(query);

      res.json({
        totalPages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
        res: products,
      });
    } catch (error) {
      console.log(error);
    }
  },
  Get_One: async (req: Request, res: Response) => {
    try {
      const data = await Product.findById(req.params.id).populate('category');
      res.status(200).json({
        res: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  Create: async (req: Request, res: Response) => {
    try {
      const data = await Product.create(req.body);
      await Category.findByIdAndUpdate(
        data.category,
        {
          $push: { products: data._id },
        },
        { new: true }
      );
      res.status(200).json({
        res: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  Update: async (req: Request, res: Response) => {
    try {
      const data = await Product.findByIdAndUpdate(req.params.id, req.body);
      await Category.findByIdAndUpdate(
        data?.category,
        {
          $push: { products: data?.id },
        },
        { new: true }
      );
      res.status(200).json({
        res: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  Delete: async (req: Request, res: Response) => {
    try {
      const data = await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({
        res: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
const CategoryController = {
  Query: async (req: Request, res: Response) => {
    try {
      const data = await Category.find().populate({
        path: 'products',
        select: '_id',
      });
      res.status(200).json({
        res: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  Get_One: async (req: Request, res: Response) => {
    try {
      const data = await Category.findById(req.params.id).populate('products');
      res.status(200).json({
        res: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  Create: async (req: Request, res: Response) => {
    try {
      const data = await Category.create(req.body);
      res.status(200).json({
        res: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  Update: async (req: Request, res: Response) => {
    try {
      const data = await Category.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({
        res: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  Delete: async (req: Request, res: Response) => {
    try {
      const data = await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({
        res: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  ProductsByCategory: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoryId = req.params.id;

      const category = await Category.findById(categoryId).populate('products');

      const productId = category?.products;
      const products = await Product.find({ _id: { $in: productId } });

      res.json({ res: products });
    } catch (error) {
      next(error);
    }
  },
};
const UserController = {
  Sign_Up: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const checkEmail = await User.findOne({ email });
      if (checkEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      const hashPass = await hashPassword(password);
      const role = (await User.countDocuments({})) === 0 ? 'admin' : 'user';
      const user = await User.create({ ...req.body, password: hashPass, role });
      user.password = '';
      return res.status(201).json({
        message: 'Register successfully!',
        res: user,
      });
    } catch (error) {
      next(error);
    }
  },
  Sign_In: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const userExist = await User.findOne({ email });
      if (!userExist) {
        return res.status(400).json({ message: 'Email not found' });
      }
      //* Step 3: Check password exist
      if (!(await comparePassword(password, userExist.password as string))) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      //* Step 4: Create token => JWT
      userExist.password = '';
      const token = createToken({ _id: userExist._id }, '10d');
      //* Step 5: Return token for client
      return res.status(201).json({
        message: 'Login successfully!',
        res: {
          user: userExist,
          accessToken: token,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  Check_Authorize: async (req: Request, res: Response, next: NextFunction) => {
    const { email, roles, _id } = req.user as UserType;
    try {
      res.status(200).json({
        message: 'Valid',
        res: { user: { email, roles, _id } },
      });
    } catch (error) {
      next(error);
    }
  },
};
const CartController = {
  getCartById: async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
      const cart = await Cart.findOne({ userId }).populate(
        'products.userProduct'
      );

      const cartData = {
        cartId: cart?.id,
        products: cart?.products.map((item) => ({
          userProduct: item.userProduct._id,
          quantity: item.quantity,
          price: item.userProduct.price,
        })),
      };
      return res.status(200).json({ res: cartData });
    } catch (error) {
      next(error);
    }
  },
  addItemToCart: async (req: Request, res: Response, next: NextFunction) => {
    const { userId, userProduct, quantity } = req.body;

    try {
      //? Check if cart exist by UserId ?
      let cart = await Cart.findOne({ userId });
      //? If not exist create new
      if (!cart) {
        cart = new Cart({ userId, products: [] });
      }

      const productPrice = await Product.findById(userProduct);
      if (!productPrice) {
        return res.status(404).json({
          message: 'Not Found',
        });
      }
      const existProductIndex = cart.products.findIndex(
        (item) => item.userProduct.toString() === userProduct
      );

      //? Check product exist in cart
      if (existProductIndex !== -1) {
        //? If product exist update quantity
        cart.products[existProductIndex].quantity += quantity;
      } else {
        //? If product not exist create new
        cart.products.push({
          userProduct,
          quantity: quantity,
          price: productPrice.price,
        });
      }
      //* Save cart
      await cart.save();
      return res.status(200).json({ res: cart });
    } catch (error) {
      next(error);
    }
  },
  removeFromCart: async (req: Request, res: Response, next: NextFunction) => {
    const { userId, userProduct } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(400).json({ error: 'Bad request' });
      }
      cart.products = cart.products.filter((product) => {
        return (
          product.userProduct && product.userProduct.toString() !== userProduct
        );
      }) as Types.DocumentArray<ProductCart>;

      await cart.save();
      return res.status(200).json({ cart });
    } catch (error) {
      next(error);
    }
  },
  increaseProductQuantity: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, userProduct } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        res.status(404).json({ message: 'Not Found' });
      }
      const product = cart?.products.find(
        (item) => item.userProduct.toString() === userProduct
      ) as ProductCart;
      if (!product) {
        res.status(404).json({ message: 'Not Found' });
      }
      product.quantity++;
      await cart?.save();
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },
  decreaseProductQuantity: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, userProduct } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(400).json({ error: 'Bad request' });
      }
      cart.products = cart.products.filter((product) => {
        return (
          product.userProduct && product.userProduct.toString() !== userProduct
        );
      }) as Types.DocumentArray<ProductCart>;

      await cart.save();
      return res.status(200).json({ cart });
    } catch (error) {
      next(error);
    }
  },
  updateProductQuantity: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, userProduct, quantity } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(400).json({ error: 'Bad Request' });
      }
      const product = cart.products.find(
        (item) => item.userProduct.toString() === userProduct
      );
      if (!product) {
        return res.status(404).json({ error: 'Not Found' });
      }
      product.quantity = quantity;
      await cart?.save();
      return res.status(200).json({ cart });
    } catch (error) {
      next(error);
    }
  },
  removeCart: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Cart.findByIdAndDelete(req.params.id);
      if (data) {
        res.status(200).json({
          message: 'Remove cart success',
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
const OrderController = {
  GetAllOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Order.find();

      res.status(200).json({
        res: data,
      });
    } catch (error) {
      next(error);
    }
  },
  AddNewOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const order = new Order(body);
      const checkOrder = await order.save();
      res.status(200).json({
        message: 'Order success',
        res: checkOrder,
      });
    } catch (error) {
      next(error);
    }
  },
  GetOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id).exec();

      res.status(200).json({
        res: order,
      });
    } catch (error) {
      next(error);
    }
  },
  RemoveOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Order.findByIdAndDelete(req.params.id);

      res.status(200).json({
        message: 'Delete order success',
      });
    } catch (error) {
      next(error);
    }
  },
};
export {
  CartController,
  CategoryController,
  OrderController,
  ProductController,
  UserController,
};
