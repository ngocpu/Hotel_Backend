import jwt from "jsonwebtoken";
import { createError } from "../utils/CreateError.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  const refreshToken = req.cookies.refreshToken;
  if (token) {
    const accessToken = token && token.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (
      req.user.id === req.params.id ||
      req.user.role === "admin" ||
      req.user.role === "employee"
    ) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
export const verifyEmploy = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === "employee") {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
