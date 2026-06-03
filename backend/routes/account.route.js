import express from "express";
import { requireAuth } from "@clerk/express";
import { getUserAccounts, createAccounts } from "../controllers/account.controller.js";

const router = express.Router();

router.get("/", requireAuth(), getUserAccounts);
router.post("/bulk", requireAuth(), createAccounts);

export default router;