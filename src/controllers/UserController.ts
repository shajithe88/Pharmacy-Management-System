import { Request, Response } from 'express';
import { querySaveTokenToDatabase} from '../models/Database';
import { sign } from 'jsonwebtoken';
import {User} from "../models/UserModel";
import { queryUserByUsername } from '../models/Database';

export const UserController = {
    authenticateUser: async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            // Query the user from the database based on the username
            const user = await getUserByUsername(username);

            console.log("user",user)
            console.log("password",password)

            if (!user) {
                console.log("ddd")
                return res.status(401).json({ message: 'Unauthorized' });
            }
            if (!process.env.JWT_SECRET) {
                return res.status(500).json({ message: 'JWT secret is not defined in environment variables' });
            }
            // Generate JWT token with user information
            const token = sign({  username: user.username, role: user.role  }, process.env.JWT_SECRET);

            // Save the token in the user's secretKey field
            await saveTokenToDatabase(user, token);

            // Return token to the client
            return res.json({ token });


        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};

// Function to query user from the database based on username
async function getUserByUsername(username: string): Promise<User | undefined> {
    try {
        const user = await queryUserByUsername(username);

        if (user) {
            return user;
        }

        return undefined;
    } catch (error) {
        console.error('Error querying user:', error);
        throw error;
    }}



async function saveTokenToDatabase(user: User, token: string): Promise<void> {
    try {
        await querySaveTokenToDatabase(user,token);
    } catch (error) {
        throw error;
    }
}

