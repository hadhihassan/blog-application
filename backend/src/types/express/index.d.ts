import { IUser } from "../../models/User";
import { Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}
