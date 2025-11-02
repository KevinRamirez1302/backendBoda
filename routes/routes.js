import { Router } from 'express';
import { getInvitados } from '../controller/invitados.js';
import { createGuest } from '../controller/createGuest.js';

const router = Router();

router.get('/invitados', getInvitados);

router.post('/create/guests', createGuest);

export default router;
