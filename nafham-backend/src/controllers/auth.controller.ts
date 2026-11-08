import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

const generateToken = (id: string, role: string) => {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '30d' });
};

const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.string().optional()
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

const socialLoginSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    provider: z.string(),
    providerId: z.string(),
    avatarUrl: z.string().optional()
});

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = registerSchema.parse(req.body);
        
        const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'Email already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: (data.role as any) || 'STUDENT',
                provider: 'LOCAL'
            }
        });

        const token = generateToken(newUser.id, newUser.role);

        res.status(201).json({
            success: true,
            token,
            user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
        });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.errors || error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user || !user.password) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        const token = generateToken(user.id, user.role);

        res.status(200).json({
            success: true,
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.errors || error.message });
    }
};

export const socialLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = socialLoginSchema.parse(req.body);
        
        let user = await prisma.user.findUnique({ where: { email: data.email } });

        if (!user) {
            // Create new user if they don't exist
            user = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    provider: data.provider as any,
                    providerId: data.providerId,
                    avatarUrl: data.avatarUrl,
                    role: 'STUDENT'
                }
            });
        } else {
            // If user exists but is logging in with a new provider, we can just return the user
            // Optional: update avatarUrl or provider details
        }

        const token = generateToken(user.id, user.role);

        res.status(200).json({
            success: true,
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl }
        });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.errors || error.message });
    }
};
