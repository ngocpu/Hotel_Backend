import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/CreateError.js";
import jwt from "jsonwebtoken";

let refreshTokens = [];
const gennerateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "365d" }
  );
};

const gennerateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );
};
export const reqRefreshToken = async (req, res) => {
  const refreshToken = req.cookie.refreshToken;
  if (!refreshToken) return res.status(401).json("You're not authenticated");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid");
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      console.log(err);
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    //create new access token, refresh token and send to user
    const newAccessToken = authController.generateAccessToken(user);
    const newRefreshToken = authController.generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};
export const register = async (req, res, next) => {
  try {
    // ma hoa pass
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    console.log(req.body)
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) return next(createError(404, "User not found!"));
    try {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return next(createError(400, "Wrong password or email!"));

      const accessToken = gennerateAccessToken(user);
      const refreshToken = gennerateRefreshToken(user);
      refreshTokens.push(refreshToken)
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sercure: false,
        sameSite: "strict",
      });
      const { password, ...otherDetails } = user._doc;
      res.status(200).json({ ...otherDetails, accessToken, refreshToken });
    } catch (error) {
      // Xử lý lỗi trong quá trình so sánh mật khẩu
      console.error("Error comparing passwords:", error);
      return next(createError(500, "Internal Server Error"));
    }
  } catch (err) {
    next(err);
  }
};
export const logOut = async (req, res) => {
  //Clear cookies when user logs out
  refreshTokens = refreshTokens.filter((token) => token !== req.header.token);
  res.clearCookie("refreshToken");
  res.status(200).json("Logged out successfully!");
}
