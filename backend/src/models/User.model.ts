import mongoose from 'mongoose';
import { User } from '../interfaces/User'

const UserSchema = new mongoose.Schema<User>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: {
        topics: { type: [String], default: [] },
        sources: { type: [String], default: [] },
    },
});

export default mongoose.model('User', UserSchema);


