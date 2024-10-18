import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    urlToImage: { type: String, required: true },
    publishedAt: { type: Date, required: true },
});

export default mongoose.model('Article', ArticleSchema);
