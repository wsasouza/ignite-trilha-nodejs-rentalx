import { Router } from "express";

import { AuthenticateUseController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUseController()

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes }; 