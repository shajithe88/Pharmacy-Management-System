import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { User } from "./UserModel";
import {Medication} from "./MedicationModel";
import {Customer} from "./CustomerModel";

// Define the database path globally
const databasePath = './database.db';

// Define the database connection globally
let db: Database;

export async function initDatabase(): Promise<void> {
    try {
        // Open database connection
        db = await open({
            filename: databasePath,
            driver: sqlite3.Database,
        });

        // Create tables if they don't exist
        await db.exec(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            username TEXT UNIQUE,
            password TEXT,
            role TEXT,
            secretKey TEXT,
            isDeleted INTEGER,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        await db.exec(`CREATE TABLE IF NOT EXISTS medications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            quantity INTEGER,
            isDeleted INTEGER DEFAULT 0,
            lastUpdatedUserId INTEGER,
            deletedUserId INTEGER,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        await db.exec(`CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            isDeleted INTEGER DEFAULT 0,
            deletedUserId INTEGER,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

//         // Drop the 'medications' table
//         await db.exec(`DROP TABLE IF EXISTS medications`);
//
// // Drop the 'users' table
//         await db.exec(`DROP TABLE IF EXISTS users`);
//
// // Drop the 'customers' table
//         await db.exec(`DROP TABLE IF EXISTS customers`);





        // Insert dummy users if table is empty
        const userRowCount = await db.get('SELECT COUNT(*) AS count FROM users');
        if (userRowCount && userRowCount.count === 0) {
            const dummyUsers: User[] = [
                { name: 'Admin', username: 'admin', password: 'admin123', role: 'admin', secretKey: '' ,createdAt: new Date()},
                { name: 'Manager', username: 'manager', password: 'manager123', role: 'manager', secretKey: '' ,createdAt: new Date()},
                { name: 'Cashier', username: 'cashier', password: 'cashier123', role: 'cashier', secretKey: '' ,createdAt: new Date()},
                { name: 'owner', username: 'owner', password: 'owner123', role: 'owner', secretKey: '' ,createdAt: new Date()}
            ];

            for (const user of dummyUsers) {
                await db.run(`INSERT INTO users (name, username, password, role, secretKey) VALUES (?, ?, ?, ?, ?)`,
                    [user.name, user.username, user.password, user.role, user.secretKey]);
            }
        }

        // Insert dummy medications if table is empty
        const medicationRowCount = await db.get('SELECT COUNT(*) AS count FROM medications');
        if (medicationRowCount && medicationRowCount.count === 0) {
            const dummyMedications: Medication[] = [
                { name: 'Medicine A', description: 'Description A', quantity: 100 ,createdAt: new Date()},
                { name: 'Medicine B', description: 'Description B', quantity: 50 ,createdAt: new Date()},
                { name: 'Medicine C', description: 'Description C', quantity: 200 ,createdAt: new Date()}
            ];

            for (const medication of dummyMedications) {
                await db.run(`INSERT INTO medications (name, description, quantity) VALUES (?, ?, ?)`,
                    [medication.name, medication.description, medication.quantity]);
            }
        }

        // Insert dummy customers if table is empty
        const customerRowCount = await db.get('SELECT COUNT(*) AS count FROM customers');
        if (customerRowCount && customerRowCount.count === 0) {
            const dummyCustomers: Customer[] = [
                { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890',address: '234 street' ,createdAt: new Date()},
                { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' ,address: '234 street',createdAt: new Date()},
                { name: 'Alice Johnson', email: 'alice@example.com', phone: '555-555-5555',address: '234 street',createdAt: new Date() }
            ];

            for (const customer of dummyCustomers) {
                await db.run(`INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)`,
                    [customer.name, customer.email, customer.phone]);
            }
        }

    } catch (error) {
        throw error;
    }
}

// Function to query user from the database based on username
export async function queryUserByUsername(username: string): Promise<User | undefined> {
    try {
        // Query user by username
        const query = 'SELECT * FROM users WHERE username = ?';
        const userRow = await db.get(query, username);

        // Check if user exists
        if (userRow) {
            // Map database row to User object
            const user: User = {
                id: userRow.id,
                name: userRow.name,
                username: userRow.username,
                password: userRow.password,
                role: userRow.role,
                secretKey: userRow.secretKey
            };
            return user;
        } else {
            return undefined; // User not found
        }
    } catch (error) {
        throw error;
    }
}

// Function to update the user's secretKey field with the token in the database
export async function querySaveTokenToDatabase(user: User, token: string): Promise<void> {
    try {
        // Update the user's secretKey field with the token in the database
        const query = 'UPDATE users SET secretKey = ? WHERE id = ?';
        await db.run(query, [token, user.id]);

        console.log('Token saved to database successfully');
    } catch (error) {
        console.error('Error saving token to database:', error);
        throw error;
    }
}
