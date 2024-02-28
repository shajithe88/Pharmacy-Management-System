import { Request, Response } from 'express';
import { getDatabase } from '../databaseConnection';
import { Medication } from '../models/MedicationModel';

export const MedicationController = {
    queryMedications: async (req: Request, res: Response) => {
        await handleQuery(req, res, 'medications');
    },
    addMedication: async (req: Request, res: Response) => {
        await handleAddOrUpdate(req, res, 'medications');
    },
    updateMedication: async (req: Request, res: Response) => {
        await handleAddOrUpdate(req, res, 'medications');
    },
    softDeleteMedication: async (req: Request, res: Response) => {
        await handleSoftDelete(req, res, 'medications');
    },
    deleteMedication: async (req: Request, res: Response) => {
        await handleDelete(req, res, 'medications');
    },
};

async function handleQuery(req: Request, res: Response, tableName: string) {
    try {
        const db = getDatabase();
        const medications: Medication[] = await db.all(`SELECT * FROM ${tableName}`);
        res.json({ medications });
    } catch (error) {
        console.error(`Error querying ${tableName}:`, error);
        res.status(500).json({ error: `Error querying ${tableName}` });
    }
}

async function handleAddOrUpdate(req: Request, res: Response, tableName: string) {
    try {
        const db = getDatabase();
        const { id, name, description, quantity } = req.body;
        if (!name || !description || !quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if (id) {
            await db.run(`UPDATE ${tableName} SET name = ?, description = ?, quantity = ? WHERE id = ?`, [name, description, quantity, id]);
            res.json({ message: 'Medication updated successfully' });
        } else {
            await db.run(`INSERT INTO ${tableName} (name, description, quantity) VALUES (?, ?, ?)`, [name, description, quantity]);
            res.json({ message: 'Medication added successfully' });
        }
    } catch (error) {
        console.error(`Error modifying medication record in ${tableName}:`, error);
        res.status(500).json({ error: `Error modifying medication record in ${tableName}` });
    }
}

async function handleSoftDelete(req: Request, res: Response, tableName: string) {
    try {
        const db = getDatabase();
        const { id } = req.params;
        await db.run(`UPDATE ${tableName} SET isDeleted = 1 WHERE id = ?`, [id]);
        res.json({ message: 'Medication soft deleted successfully' });
    } catch (error) {
        console.error(`Error soft deleting medication in ${tableName}:`, error);
        res.status(500).json({ error: `Error soft deleting medication in ${tableName}` });
    }
}

async function handleDelete(req: Request, res: Response, tableName: string) {
    try {
        const db = getDatabase();
        const { id } = req.params;
        await db.run(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
        res.json({ message: 'Medication deleted successfully' });
    } catch (error) {
        console.error(`Error deleting medication in ${tableName}:`, error);
        res.status(500).json({ error: `Error deleting medication in ${tableName}` });
    }
}
