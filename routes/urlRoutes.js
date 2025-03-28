import express from 'express';
import { shortenUrl, redirectToOriginalUrl, getUrlStats, deleteUrl } from '../controllers/urlController.js';
const router = express.Router();
router.post('/url/shorten', shortenUrl);
router.get('/url/:alias', redirectToOriginalUrl);
router.get('/url/stats/:alias', getUrlStats);
router.delete('/url/:alias', deleteUrl);
export default router;
