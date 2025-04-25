import express, {Application, Request, Response} from 'express';
import helmet  from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';


import incidentRoutes from './routes/incidentRoutes';
import { sql } from './config/db';

dotenv.config();


const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}))

app.use('/api/incidents', incidentRoutes);


// initializing database
async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS incidents (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                severity VARCHAR(10) CHECK (severity IN ('Low', 'Medium', 'High')) NOT NULL,
                reported_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log('DB init successful');
    } catch (error) {
        console.log("Error initDB ", error);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
})
