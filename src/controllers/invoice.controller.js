import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/appError.js";
import { successResponse } from "../utils/response.js";

export const checkout = async (req, res, next) => {
  const { email, name, phone, date } = req.body;
  try {
    const carts = await prisma.cart.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        product: true,
      },
    });

    if (!carts || carts.length === 0) {
      throw new AppError("Carts not found", 404);
    }

    const items = carts
      .map((c) => `${c.product.name} x ${c.quantity}`)
      .join(", ");
    const total = carts.reduce((sum, item) => sum + item.total, 0);

    const invoice = await prisma.invoice.create({
      data: {
        email,
        name,
        phone,
        date: new Date(date),
        items,
        total,
        userId: req.user.id,
      },
    });

    await prisma.cart.deleteMany({
      where: {
        userId: req.user.id,
      },
    });

    return successResponse(res, "Checkout success", invoice, 201);
  } catch (error) {
    next(error);
  }
};
export const getAllInvoice = async (req, res, next) => {
  try {
    const data = await prisma.invoice.findMany();
    return successResponse(res, "Get all invoice success", data, 201);
  } catch (error) {
    next(error);
  }
};
export const getInvoiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await prisma.invoice.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      throw new AppError("Invoice not found", 404);
    }
    return successResponse(res, "Get invoice by id success", data, 201);
  } catch (error) {
    next(error);
  }
};
export const getInvoiceByUsermail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const data = await prisma.invoice.findMany({
      where: {
        email,
      },  
    });

    if (!data) {
      throw new AppError("Invoice not found", 404);
    }
    return successResponse(res, "Get invoice by usermail success", data, 201);
  } catch (error) {
    next(error);
  }
};
