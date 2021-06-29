import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticate(
  request: Request, 
  response: Response, 
  next: NextFunction
) { 
  
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify (token, "5b52a5ef535c03731e65a847e8779f80") as IPayload;
    
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error("Users does not exists!");
    }

    next();
  } catch {
    throw new Error("Invalid Token");
  }



}