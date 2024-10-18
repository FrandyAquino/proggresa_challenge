import { Article } from './Article';
import { ObjectId } from 'mongoose'

export interface User {
    _id: ObjectId;
    username: string;
    password: string;
    preferences: UserPreferences
}

interface UserPreferences {
    topics: string[];
    sources: string[];
}
