import User from "../models/user.model.js";
import Session from "../utils/session.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token maquant.",
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
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      profileImgUrl: user.profile_url,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Token Invalide.",
    });
  }
};

export default authMiddleware;
