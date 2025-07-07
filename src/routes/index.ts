import { Router } from "express";
import propertyRoutes from "./property.routes";
import agentRoutes from "./agent.routes";
import inquiryRoutes from "./inquiry.routes";
import viewingRoutes from "./viewing.routes";
import listingRoutes from "./listings.routes";
import locationRoutes from "./location.routes";

const router = Router();

router.use("/agents", agentRoutes);
router.use("/properties", propertyRoutes);
router.use("/inquiries", inquiryRoutes);
router.use("/viewings", viewingRoutes);
router.use("/locations", locationRoutes);

router.use("/", listingRoutes);

export default router;
