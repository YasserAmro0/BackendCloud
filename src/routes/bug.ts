import { Router } from 'express';
import { checkAuth } from '../middlewares';
import { RolesForSelect } from '../types';
import {
  getAllBugs, createNewBug, editBug, createIssue, deleteBug, getContributors,
} from '../controllers';

const router = Router();

router.get('/', checkAuth(RolesForSelect.admin), getAllBugs);
router.post('/', createNewBug);
router.patch('/', checkAuth(RolesForSelect.admin), editBug);
router.post('/github', checkAuth(RolesForSelect.admin), createIssue);
router.delete('/:id', checkAuth(RolesForSelect.admin), deleteBug);
router.get('/contributors', checkAuth(RolesForSelect.admin), getContributors);

export default router;
