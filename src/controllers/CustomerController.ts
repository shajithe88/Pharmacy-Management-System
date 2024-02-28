import { Request, Response } from 'express';
import { getDatabase } from '../databaseConnection';
import { Customer } from '../models/CustomerModel';

export const CustomerController = {
    queryCustomers: async (req: Request, res: Response) => {
        await handleQuery(req, res, 'customers');
    },
    addCustomer: async (req: Request, res: Response) => {
        await handleAddOrUpdate(req, res, 'customers');
    },
    updateCustomer: async (req: Request, res: Response) => {
        await handleAddOrUpdate(req, res, 'customers');
    },
    softDeleteCustomer: async (req: Request, res: Response) => {
        await handleSoftDelete(req, res, 'customers');
    },
    deleteCustomer: async (req: Request, res: Response) => {
        await handleDelete(req, res, 'customers');
    },
};

async function handleQuery(req: Request, res: Response, tableName: string) {
    try {
        const db = getDatabase();
        const customers: Customer[] = await db.all(`SELECT * FROM ${tableName} WHERE isDeleted = 0`);
        res.json({ customers });
    } catch (error) {
        res.status(500).json({ error: `Error querying ${tableName}` });
    }
}

async function handleAddOrUpdate(req: Request, res: Response, tableName: string) {
    try {
        const db = getDatabase();
        const { name, email, phone} = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if (req.method === 'POST') {
            await db.run(`INSERT INTO ${tableName} (name, email, phone) VALUES (?, ?, ?)`, [name, email, phone]);
        } else if (req.method === 'PUT') {
            const customerId = req.params.id;
            await db.run(`UPDATE ${tableName} SET name = ?, email = ?, phone = ? WHERE id = ?`, [name, email, phone, customerId]);
        }
        res.status(201).send("Customer record modified successfully");
    } catch (error) {
        res.status(500).json({ error: `Error modifying customer record in ${tableName}` });
    }
}

async function handleSoftDelete(req: Request, res: Response, tableName: string) {
    try {
        const db = getDatabase();
        const customerId = req.params.id;

        await db.run(`UPDATE ${tableName} SET isDeleted = 1 WHERE id = ?`, [customerId]);
        res.send("Customer soft deleted successfully");
    } catch (error) {
        res.status(500).json({ error: `Error soft deleting customer in ${tableName}` });
    }
}

async function handleDelete(req: Request, res: Response, tableName: string) {
    try {
        const db = getDatabase();
        const customerId = req.params.id;
        // Logic to permanently delete a customer record from the database
        await db.run(`DELETE FROM ${tableName} WHERE id = ?`, [customerId]);
        res.send("Customer deleted successfully");
    } catch (error) {
        res.status(500).json({ error: `Error deleting customer in ${tableName}` });
    }
}
