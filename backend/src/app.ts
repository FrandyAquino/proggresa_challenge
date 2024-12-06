import express from 'express';
import morgan from 'morgan';
import connectDB from './config/database';
import userRoutes from './routes/users.router';
import articleRoutes from './routes/articles.router';
import cors from 'cors';
import { sessionMiddleware } from './shared/middlewares/session'

const app = express();

app.use(cors({
    origin: 'https://newshub-nine.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(sessionMiddleware as any)

connectDB();

app.use('/api/users', userRoutes); 
app.use('/api/articles', articleRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

export default app;
