import { validate as isUUID } from "uuid";
import { AppError } from "../utils/appError.js";
export const validationUUID = (req, res, next) => {
  const id = req.params.id;

  if (!isUUID(id)) throw new AppError("invalid id", 400);

  next();
};
