import { Router } from 'express'
const router = Router();

import { getPdf , getPdfHtml , createPdf } from '../controllers/api.controller'

// Routes

router.get('/pdf', getPdf);
router.get('/pdf2', getPdfHtml);
router.get('/pdf3', createPdf);


export default router;