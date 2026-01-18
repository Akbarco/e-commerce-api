import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/appError.js";
import { successResponse } from "../utils/response.js";

export const getInventories = async (req, res, next) => {
  try {
    const inventories = await prisma.inventory.findMany();
    return successResponse(res, "detail barang", inventories, 201);
  } catch (error) {
    next(error);
  }
};

export const getInventory = async (req, res, next) => {
  try {
    const id = req.params.id;

    const inventory = await prisma.inventory.findUnique({
      where: {
        id,
      },
    });

    if (!inventory) {
      throw new AppError("inventory not found", 404);
    }
    return successResponse(res, "data by id foundit", inventory, 201);
  } catch (error) {
    next(error);
  }
};
export const createInventories = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name?.trim()) {
      throw new AppError("name are required", 400);
    }

    const inventory = await prisma.inventory.create({
      data: {
        name,
        description,
      },
    });

    return successResponse(res, "succes create", inventory, 201);
  } catch (error) {
    next(error);
  }
};
export const updateInventory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;

    const existInventory = await prisma.inventory.findUnique({
      where: {
        id,
      },
    });

    if (!existInventory) {
      throw new AppError("inventory not found", 404);
    }
    if (!name?.trim()) {
      throw new AppError("name are required", 400);
    }

    const updateInventories = await prisma.inventory.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
    return successResponse(res, "succes update", updateInventories, 201);
  } catch (error) {
    next(error);
  }
};
export const deleteInventory = async (req, res, next) => {
  try {
    const id = req.params.id;

    const existInventory = await prisma.inventory.findUnique({
      where: {
        id,
      },
    });

    if (!existInventory) {
      throw new AppError("inventory not found", 404);
    }
    const deleteInventories = await prisma.inventory.delete({
      where: {
        id,
      },
    });
    return successResponse(res, "succes delete", deleteInventories, 201);
  } catch (error) {
    next(error);
  }
};
