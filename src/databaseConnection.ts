import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

const databasePath = './database.db';

let db: Database;

export async function initializeDatabase(): Promise<void> {
    try {
        db = await open({
            filename: databasePath,
            driver: sqlite3.Database,
        });
        console.log('Database connection established successfully');
    } catch (error) {
        console.error('Error initializing database connection:', error);
        throw error;
    }
}

export function getDatabase(): Database {
    if (!db) {
        throw new Error('Database connection has not been initialized');
    }
    return db;
}
