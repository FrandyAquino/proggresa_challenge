import express from 'express';
import { getArticles } from '../controllers/article.controller';
import { createUser, getUserPreferences } from '../controllers/user.controller';

const router = express.Router();

router.get('/articles', getArticles);
router.post('/users', createUser);
router.get('/users/:id/preferences', getUserPreferences);

export default router;
