import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../shared/functions/response'
import { RequestDTO } from '../shared/interfaces/Dto'
import { LoginDTO, RegisterDTO } from '../validators/UserValidar'
import { createToken } from '../shared/functions/jwt'
import bcrypt from 'bcrypt'
import User from '../models/User.model';

export const createUser = async (req: RequestDTO<RegisterDTO>, res: Response) => {
    const { username, password } = req.ctx.body;

    if (!username || !password) {
        return errorResponse(res, {
            code: "VALIDATION_ERROR",
            message: "El nombre de usuario y la contraseña son obligatorios"
        });
    }

    try {
        const foundUser = await User.findOne({ username });

        if (foundUser) {
            return errorResponse(res, {
                code: "CONFLICT_ERROR",
                message: "Ya existe un usuario con ese nombre"
            });
        }
    } catch (error) {
        return errorResponse(res, {
            code: "INTERNAL_ERROR",
            message: "Error al buscar el usuario"
        });
    }

    let passwordHash: string = '';

    try {
        passwordHash = await bcrypt.hash(password, 15);
    } catch (error) {
        return errorResponse(res, {
            message: "Error al encriptar la contraseña",
            code: "HASH_ERROR"
        });
    }

    try {
        const newUser = new User({ username, password: passwordHash });
        await newUser.save();
        return successResponse(res, {
            message: "Usuario creado correctamente",
            data: {
                id: newUser._id
            }
        });
    } catch (error) {
        return errorResponse(res, {
            message: "Error al crear el usuario",
            code: "INTERNAL_ERROR"
        });
    }
};

export const getUserPreferences = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user?.preferences);
    } catch (error) {
        console.error('Error fetching user preferences', error);
        res.status(500).json({ message: 'Failed to fetch user preferences' });
    }
};


export const loginController = async (req: RequestDTO<LoginDTO>, res: Response) => {
    const { username, password } = req.ctx.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return errorResponse(res, {
                code: "AUTHENTICATION_ERROR",
                message: "Usuario o contraseña incorrectos"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return errorResponse(res, {
                code: "AUTHENTICATION_ERROR",
                message: "Usuario o contraseña incorrectos"
            });
        }

        const token = createToken({
            payload: {
                _id: user._id,
                username: user.username
            },
            time: 30 * 24 * 60 * 60 * 1000, 
            destination: "Login"
        });

        return successResponse(res, {
            message: "Inicio de sesión exitoso",
            data: {
                token
            }
        });
    } catch (error) {
        return errorResponse(res, {
            code: "INTERNAL_ERROR",
            message: "Error al intentar iniciar sesión"
        });
    }
};

export const usersController = async (req: Request, res: Response) => {
    try {
        const users = await User.find(); 
        return successResponse(res, {
            message: "Usuarios encontrados",
            data: {
                users
            }
        });
    } catch (error) {
        return errorResponse(res, {
            code: "INTERNAL_ERROR",
            message: "Error al intentar recuperar los usuarios"
        });
    }
};