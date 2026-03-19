import Logger from "../config/logger.js";

const errorHandler = (err, req, res, next) => {
  Logger.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Erreur serveur",
  });
};

export default errorHandler;
