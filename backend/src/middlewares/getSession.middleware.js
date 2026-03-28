import User from "../models/user.model.js";
import Session from "../utils/session.js";

const getSessionMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token maquant vous devez vous connecté en premier.",
    });
  }

  try {
    const payload = Session.decodeToken(token);
    const user = await User.findOne({ where: { id: payload.id } });

    if (!payload || !user) {
      return res.status(401).json({
        success: false,
        message: "Token Invalide ou utilisateur introuvable",
      });
    }

    req.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileImgUrl: user.profileUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Token Invalide.",
    });
  }
};

export default getSessionMiddleware;
