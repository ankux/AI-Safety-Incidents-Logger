import express, {Application, Request, Response} from 'express';
import helmet  from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';


import incidentRoutes from './routes/incidentRoutes';
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';
import { initDB } from './config/initDB';


dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8000;


app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}))


app.use('/api/incidents', incidentRoutes);
app.use(notFound);
app.use(errorHandler);


initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
})
