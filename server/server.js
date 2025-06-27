// server/server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// TODO
// import authRoutes from './routes/auth.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

// TODO routes
// app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Connect to MongoDB
// TODO add MONGO_URI to .env
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Mongo error:', err));


app.listen(port, () => console.log(`Server started on port ${port}`));
