import express from 'express';
import dotenv from'dotenv';
import AuthRoutes from './routes/Auth.js';
import DbCon from './utils/db.js';
import NotesRoutes from './routes/Notes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();

DbCon();

const PORT = process.env.PORT ||5000;
const app = express();

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

app.use(express.json())
app.use(cookieParser());

app.use('/auth',AuthRoutes);
app.use('/notes',NotesRoutes);

app.get('/',(req,res)=>
{
       res.send("Hello!");
})

app.listen(PORT,()=>
{
    console.log(`Server is Connected at the Port ${PORT}`)
});