import { Router } from "express";
import PropertyController from "../controllers/property.controller";
import { verifyAgent } from "../middlewares/verify-agent.middleware";
import { compressImages, upload } from "../middlewares/multer-storage.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createPropertySchema } from "../validations/property.validation";
import { validateId } from "../middlewares/validate-id.middleware";

const router = Router();
const controller = new PropertyController();

router.use(verifyAgent);

router.post("/", upload.array("images", 2), compressImages, validate(createPropertySchema), controller.create);

router.put(
  "/:id",
  validateId,
  upload.array("images", 2),
  compressImages,
  validate(createPropertySchema),
  controller.update
);

router.delete("/:id", validateId, controller.delete);

router.patch("/:id/archive", validateId, controller.archive);
router.patch("/:id/publish", validateId, controller.publish);

export default router;
