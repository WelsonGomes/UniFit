import { Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({origin:"*"}));
const port = 3333;

app.get('/',(req: Request, res: Response) => {
    return res.status(200).json({msg: `App Running on port ${port}`});
});

app.listen(port, ()=>{
    console.log(`App Running on port ${port}`);
});
