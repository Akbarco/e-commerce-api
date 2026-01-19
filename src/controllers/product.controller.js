import { prisma } from "../lib/prisma.js";
import fs from "fs";
import path from "path";
import { successResponse } from "../utils/response.js";
import { AppError } from "../utils/appError.js";

const getCleanedImageUrl = (baseUrl, imagePath) => {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const normalizedImagePath = imagePath.replace(/^\//g, "");

  return `${normalizedBaseUrl}/${normalizedImagePath}`;
};

export const getAllProducts = async (req, res, next) => {
  try {
    const productsWithInventory = await prisma.product.findMany({
      include: {
        inventory: true,
      },
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productsWithImageUrl = productsWithInventory.map((product) => ({
      ...product,
      imageUrl: product.image
        ? getCleanedImageUrl(baseUrl, product.image)
        : null,
    }));

    return successResponse(
      res,
      "Get all products success",
      productsWithImageUrl,
      201,
    );
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productWithImageUrl = {
      ...product,
      imageUrl: product.image
        ? getCleanedImageUrl(baseUrl, product.image)
        : null,
    };

    return successResponse(
      res,
      "Get product by id success",
      productWithImageUrl,
      201,
    );
  } catch (error) {
    next(error);
  }
};
export const getProductByInventoryId = async (req, res, next) => {
  const inventoryId = req.params.id;

  try {
    const products = await prisma.product.findMany({
      where: { inventoryId },
    });

    if (!products || products.length === 0) {
      throw new AppError("Products not found", 404);
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const productsWithImageUrl = products.map((product) => ({
      ...product,
      imageUrl: product.image ? cleanImageUrl(baseUrl, product.image) : null,
    }));

    return successResponse(
      res,
      "Get all products by inventory id success",
      productsWithImageUrl,
      201,
    );
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (req, res, next) => {
  const {
    name,
    description,
    price: productPrice,
    stock: productStock,
    inventoryId,
  } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !inventoryId) {
    return next(new AppError("Name and inventoryId are required", 400));
  }

  try {
    const createdProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(productPrice),
        stock: Number(productStock),
        image,
        inventoryId,
      },
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const responseProduct = {
      ...createdProduct,
      imageUrl: createdProduct.image
        ? `${baseUrl}${createdProduct.image}`
        : null,
    };

    return successResponse(res, "Create product success", responseProduct, 201);
  } catch (error) {
    return next(error);
  }
};
export const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const { name, description, price, stock, inventoryId } = req.body;

  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    if (image && product.image) {
      const oldImagePath = path.join(
        process.cwd(),
        "uploads",
        path.basename(product.image),
      );

      fs.unlink(oldImagePath, (err) => {
        if (err) console.warn("Failed delete file:", oldImagePath);
      });
    }

    const updateData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(stock && { stock: Number(stock) }),
      ...(inventoryId && { inventoryId }),
      ...(image && { image }),
    };

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: updateData,
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    return successResponse(
      res,
      "Product updated successfully",
      {
        ...updatedProduct,
        imageUrl: updatedProduct.image
          ? `${baseUrl}${updatedProduct.image}`
          : null,
      },
      200,
    );
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    if (product.image) {
      const imagePath = path.join(
        process.cwd(),
        "uploads",
        path.basename(product.image),
      );

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.warn("Failed to delete image:", imagePath);
        }
      });
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return successResponse(res, "Product deleted successfully", null, 200);
  } catch (error) {
    next(error);
  }
};
