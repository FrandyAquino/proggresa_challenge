import { Router } from 'express';
import { createUser, getUserPreferences, loginController, usersController } from '../controllers/user.controller';
import { registerSchema, userLoginSchema } from '../validators/UserValidar'
import { schemaValidatorMiddleware } from '../shared/middlewares/schema'

const router = Router();

router.post(
    '/', 
    schemaValidatorMiddleware('body', registerSchema),
    createUser
);
router.post(
    '/login',
    schemaValidatorMiddleware('body', userLoginSchema),
    loginController
)
router.get('/', usersController)
router.get('/:userId/preferences', getUserPreferences);

export default router;
