import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { verifyAgent } from "../middlewares/verify-agent.middleware";
import ViewingController from "../controllers/viewing.controller";
import { scheduleViewingSchema, updateViewingSchema } from "../validations/viewing.validation";
import { validateId } from "../middlewares/validate-id.middleware";

const router = Router();
const controller = new ViewingController();

router.use(verifyAgent);
router.post("/", validate(scheduleViewingSchema), controller.scheduleViewing);
router.patch("/:id", validateId, validate(updateViewingSchema), controller.update);

export default router;
