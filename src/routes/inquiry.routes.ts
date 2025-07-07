import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import InquiryController from "../controllers/inquiry.controller";
import { inquirySchema } from "../validations/inquiry.validation";
import { verifyAgent } from "../middlewares/verify-agent.middleware";

const router = Router();
const controller = new InquiryController();

router.post("/", validate(inquirySchema), controller.create);

router.use(verifyAgent);
router.get("/", controller.list);

export default router;
