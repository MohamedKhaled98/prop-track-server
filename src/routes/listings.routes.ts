import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { validateId } from "../middlewares/validate-id.middleware";
import ListingController from "../controllers/listing.controller";
import { listingFiltersSchema } from "../validations/listing.validation";

const router = Router();
const controller = new ListingController();

router.post("/", validate(listingFiltersSchema), controller.list); // using POST for long query filters, we can use get and params for sharable links
router.get("/:id", validateId, controller.findById);

export default router;
