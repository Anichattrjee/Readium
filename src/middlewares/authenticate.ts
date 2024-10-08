import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

//extending express request so that we can put the userId decoding the token inside  the request object
export interface AuthRequest extends Request {
  userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return next(createHttpError(401, "Auth Token Is required"));
  }

  try {
    const parsedToken = token.split(" ")[1];

    const decoded = jwt.verify(parsedToken, config.jwt_secret as string);

    const _req = req as AuthRequest;
    
    _req.userId = decoded.sub as string;

  } catch (error) {
    return next(createHttpError(401, "Token Expired"));
  }

  next();
};

export default authenticate;
