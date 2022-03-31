import jwt from "jsonwebtoken";

export const getUser = (token) => {

    if (!token) {
      return null
    }
    return jwt.decode(token, process.env.JWT_SECRET);
}
