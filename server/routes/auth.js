import expresss from 'express';

import { login,register } from "../controllers/auth.js";

const router = expresss.Router();


router.post("/login",login);
router.post("/register",register);

export default router;
