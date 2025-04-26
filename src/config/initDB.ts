import { sql } from './db';

export async function initDB(): Promise<void> {
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
        console.error('Error initDB', error);
    }
}
