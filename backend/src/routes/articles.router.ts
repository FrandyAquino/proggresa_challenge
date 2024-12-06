import { Router } from 'express';
import { getArticles } from '../controllers/article.controller';

const router = Router();

router.get('/', getArticles);

export default router;
