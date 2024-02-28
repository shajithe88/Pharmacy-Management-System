import { Request, Response } from 'express';
import { querySaveTokenToDatabase} from '../models/Database';
import { sign } from 'jsonwebtoken';
import {User} from "../models/UserModel";
import { queryUserByUsername } from '../models/Database';

export const UserController = {
    authenticateUser: async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            const user = await getUserByUsername(username);

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            if (!process.env.JWT_SECRET) {
                return res.status(500).json({ message: 'JWT secret is not defined in environment variables' });
            }

            const token = sign({  username: user.username, role: user.role  }, process.env.JWT_SECRET);

            await saveTokenToDatabase(user, token);

            return res.json({ token });


        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};

async function getUserByUsername(username: string): Promise<User | undefined> {
    try {
        const user = await queryUserByUsername(username);

        if (user) {
            return user;
        }

        return undefined;
    } catch (error) {
        throw error;
    }}



async function saveTokenToDatabase(user: User, token: string): Promise<void> {
    try {
        await querySaveTokenToDatabase(user,token);
    } catch (error) {
        throw error;
    }
}

