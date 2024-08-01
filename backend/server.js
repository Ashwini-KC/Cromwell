import express from 'express';
import dotenv from 'dotenv';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

dotenv.config();
const PORT= process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js'


connectDB();
const app = express();

app.use(express.json());

app.use('/users',userRoutes);

app.use(notFound);

app.use(errorHandler);

app.get('/',(req,res)=>res.send('Server is ready'));
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));