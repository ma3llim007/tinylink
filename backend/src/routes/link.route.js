import { Router } from "express";
import { createLink, deleteLink, getLinkStats, listLinks, redirectUrl } from "../controllers/link.controller.js";

const router = Router();

router.post("/", createLink);
router.get("/", listLinks);
router.get("/:code", redirectUrl);
router.delete("/:code", deleteLink);
router.get("/:code/stats", getLinkStats);

export default router;
