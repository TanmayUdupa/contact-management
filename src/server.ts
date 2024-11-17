import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());

const mongoURI = process.env.MONGO_URI || 'your-mongodb-uri-here';
console.log(mongoURI);

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello, MERN with Typescript!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on  port ${PORT}`));
