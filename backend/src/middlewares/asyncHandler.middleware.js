import Logger from "../config/logger.js";

const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    Logger.error(err);
    next(err); // passe au middleware d'erreur
  }
};

export default asyncHandler;
