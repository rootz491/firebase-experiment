import { Router } from "express";
import { auth } from "../controllers/auth";
import { businessAuth, customerAuth } from "../middleware/type";

const router = Router();

router.post("/customer", customerAuth, auth);
router.post("/business", businessAuth, auth);

export default router;
