import express from 'express';

import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/users.js';

import { verifyToken } from '../middleware/auth.js';

const router = express.Router();


/*gets*/
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);
/*update*/
router.patch('/:id/friends', verifyToken, addRemoveFriend);


export default router;





