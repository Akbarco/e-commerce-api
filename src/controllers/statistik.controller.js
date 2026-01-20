import { prisma } from "../lib/prisma.js";
import { successResponse } from "../utils/response.js";
import { AppError } from "../utils/appError.js";

export const getRange = async (req, res, next) => {
  const { start, end } = req.query;
  try {
    const data = await prisma.invoice.findMany({
      where: {
        createdAt: {
          gte: new Date(start),
          lte: new Date(end),
        },
      },
    });

    if (!data) {
      throw new AppError("Invoice not found", 404);
    }

    const totalPesanan = data.reduce((sum, inv) => sum + 1, 0);
    const totalTerbayar = data.reduce((sum, inv) => sum + inv.total, 0);

    const result = {
      totalPesanan,
      totalTerbayar,
    };

    return successResponse(res, "Get all invoice success", result, 201);
  } catch (error) {
    next(error);
  }
};
export const getSingle = async (req, res, next) => {
  const date = req.query;
  const target = new Date(date);
  const nexDay = new Date(date);
  nexDay.setDate(nexDay.getDate() + 1);
  try {
    const data = await prisma.invoice.findMany({
      where: {
        createdAt: {
          gte: target,
          lte: nexDay,
        },
      },
    });

    if (!data) {
      throw new AppError("Invoice not found", 404);
    }

    const totalPesanan = data.length;
    const totalTerbayar = data.reduce((sum, inv) => sum + inv.total, 0);

    const result = {
      totalPesanan,
      totalTerbayar,
    };

    return successResponse(res, "Get all invoice success", result, 201);
  } catch (error) {
    next(error);
  }
};
