import { Router } from 'express';
import { getCertificates, createCertificate, revokeCertificate } from '../controllers/certificates.controller';

const router = Router();

router.get('/', getCertificates);
router.post('/', createCertificate);
router.post('/:id/revoke', revokeCertificate);

export default router;
