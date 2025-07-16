
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},
{
    timestamps: true,
    versionKey: false
});

todoSchema.set('toJSON', {
    transform: (doc, ret) => ({
        id: ret._id,
        title: ret.title,
        owner: ret.owner,
        createdAt: ret.createdAt,
        updatedAt: ret.updatedAt
    })
});

export default mongoose.model('Todo', todoSchema, 'todos');
