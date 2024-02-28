import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { queryUserByUsername } from '../models/Database';

dotenv.config();

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const decodedToken: any = jwt?.verify(token, process.env.JWT_SECRET || '');

            if (!decodedToken.username) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const user = await queryUserByUsername(decodedToken.username);

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            next();

        }catch (error) {
           return res.status(401).json({ message: 'Unauthorized' });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

