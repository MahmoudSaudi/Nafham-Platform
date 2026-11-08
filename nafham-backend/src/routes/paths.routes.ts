import { Router } from 'express';
import { getPaths, getPathById, createPath, updatePath, deletePath } from '../controllers/paths.controller';

const router = Router();

router.get('/', getPaths);
router.get('/:id', getPathById);
router.post('/', createPath);
router.put('/:id', updatePath);
router.delete('/:id', deletePath);

export default router;
