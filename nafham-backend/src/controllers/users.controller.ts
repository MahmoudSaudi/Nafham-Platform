import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Get all students
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany({
            where: { role: 'STUDENT' },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
                // Add _count for enrollments to show activity
                _count: {
                    select: { enrollments: true, reviews: true }
                }
            }
        });
        res.status(200).json({ success: true, data: users });
    } catch (error: any) {
        console.error("Error getting users:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Create a new student (admin action)
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, isActive } = req.body;
        
        // Basic validation
        if (!name || !email || !password) {
            res.status(400).json({ success: false, message: 'Name, email, and password are required' });
            return;
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'Email is already in use' });
            return;
        }

        // Normally hash password here
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password, // NOTE: Should be hashed with bcrypt in production
                role: 'STUDENT',
                isActive: isActive ?? true
            }
        });

        res.status(201).json({ success: true, data: user });
    } catch (error: any) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update a student
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const { name, email, isActive } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { id: id as string } });
        if (!existingUser || existingUser.role !== 'STUDENT') {
            res.status(404).json({ success: false, message: 'Student not found' });
            return;
        }

        const user = await prisma.user.update({
            where: { id: id as string },
            data: {
                name,
                email,
                isActive
            }
        });

        res.status(200).json({ success: true, data: user });
    } catch (error: any) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete a student
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;

        const existingUser = await prisma.user.findUnique({ where: { id: id as string } });
        if (!existingUser || existingUser.role !== 'STUDENT') {
            res.status(404).json({ success: false, message: 'Student not found' });
            return;
        }

        await prisma.user.delete({
            where: { id: id as string }
        });

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error: any) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
