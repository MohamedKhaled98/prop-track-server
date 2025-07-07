import { Router } from "express";
import AgentController from "../controllers/agent.controller";
import { validate } from "../middlewares/validate.middleware";
import { createAgentSchema } from "../validations/agent.validation";

const router = Router();
const controller = new AgentController();

router.post("/", validate(createAgentSchema), controller.signup);

export default router;
