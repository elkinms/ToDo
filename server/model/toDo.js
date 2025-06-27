import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true }
}, {
    timestamps: true,
    versionKey: false
});

todoSchema.set('toJSON', {
    transform: (doc, ret) => ({
        id: ret._id,
        title: ret.title,
        createdAt: ret.createdAt,
        updatedAt: ret.updatedAt
    })
});

export default mongoose.model('Todo', todoSchema, 'todos');
