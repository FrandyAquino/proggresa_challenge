import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || '';
export const NEW_API_TOKEN = process.env.NEW_API_TOKEN || '';
export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET ?? 'SECRET_TOKEN'