import expresss from 'express';

import { login } from "../controllers/auth.js";

const router = expresss.Router();


router.post("/login",login)

export default router;
