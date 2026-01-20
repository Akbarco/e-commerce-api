import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/appError.js";
import { successResponse } from "../utils/response.js";

export const getAllCart = async (req, res, next) => {
  try {
    const cartItem = await prisma.cart.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        product: true,
      },
    });

    return successResponse(res, "Get all cart success", cartItem, 201);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (quantity <= 0) {
      throw new AppError("Quantity must be greater than 0", 400);
    }

    if (!productId || !quantity) {
      throw new AppError("Product ID and quantity are required", 400);
    }

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const totalPrice = product.price * quantity;

    const cartItem = await prisma.cart.create({
      data: {
        productId,
        quantity,
        total: totalPrice,
        userId: req.user.id,
      },
    });

    return successResponse(res, "Add to cart success", cartItem, 201);
  } catch (error) {
    next(error);
  }
};
