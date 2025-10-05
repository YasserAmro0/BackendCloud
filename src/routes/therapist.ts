import express from 'express';
import {
  findTherapistById, getAllTherapists, updateTherapistProfile, updateProfileImg,
} from '../controllers/therapist';
import { checkAuth } from '../middlewares';
import { RolesForSelect } from '../types';

const router = express.Router();

router.get('/', getAllTherapists);
router.get('/profile_img', checkAuth(RolesForSelect.therapist), updateProfileImg);
router.get('/:id', findTherapistById);
router.patch('/', checkAuth(RolesForSelect.therapist), updateTherapistProfile);

export default router;
