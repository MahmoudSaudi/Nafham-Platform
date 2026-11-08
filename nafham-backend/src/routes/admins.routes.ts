import { Router } from 'express';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin, getInstructorsDetails, getReports } from '../controllers/admins.controller';

const router = Router();

router.get('/reports', getReports);
router.get('/instructors', getInstructorsDetails);
router.get('/', getAdmins);
router.post('/', createAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;
