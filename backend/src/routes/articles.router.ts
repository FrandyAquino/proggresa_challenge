import { Router } from 'express';
import { getArticles } from '../controllers/article.controller';
import { sessionMiddleware } from '../shared/middlewares/session'; 

const router = Router();

router.get('/', getArticles);

export default router;
