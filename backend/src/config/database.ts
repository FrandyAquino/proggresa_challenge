import mongoose from 'mongoose';
import { MONGO_URI } from './enviroments';

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log('MongoDB connected');
	} catch (error) {
		console.error('MongoDB connection failed', error);
		process.exit(1);
	}
};

export default connectDB;
