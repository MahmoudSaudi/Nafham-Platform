import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Get all paths
export const getPaths = async (req: Request, res: Response): Promise<void> => {
    try {
    // @ts-ignore
    const paths = await prisma.learningPath.findMany({
            include: {
                courses: {
                    include: {
                        course: true
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.status(200).json({ success: true, data: paths });
    } catch (error: any) {
        console.error("Error getting paths:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get single path by ID
export const getPathById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        const path = await prisma.learningPath.findUnique({
            where: { id },
            include: {
                courses: {
                    include: {
                        course: {
                            include: {
                                instructor: {
                                    select: {
                                        name: true,
                                        avatarUrl: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        });

        if (!path) {
            res.status(404).json({ success: false, message: 'Path not found' });
            return;
        }

        res.status(200).json({ success: true, data: path });
    } catch (error: any) {
        console.error("Error getting path:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Create a new path
export const createPath = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, image, level, courses } = req.body as { title: string; description: string; image?: string; level?: string; courses?: string[] };
        // @ts-ignore
        const newPath = await prisma.learningPath.create({
            data: {
                title,
                description,
                image,
                level,
                courses: {
                    create: courses?.map((courseId: string, index: number) => ({
                        courseId,
                        order: index + 1
                    })) || []
                }
            },
            include: {
                courses: true
            }
        });

        res.status(201).json({ success: true, data: newPath });
    } catch (error: any) {
        console.error("Error creating path:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update path
export const updatePath = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        const { title, description, image, level, courses } = req.body as { title?: string; description?: string; image?: string; level?: string; courses?: string[] };

        // Start transaction for updating path and its courses
        const updatedPath = await prisma.$transaction(async (prisma) => {
            // Update the path basic details
// @ts-ignore
            const path = await prisma.learningPath.update({
                where: { id },
                data: {
                    ...(title && { title }),
                    ...(description && { description }),
                    ...(image !== undefined && { image }),
                    ...(level && { level }),
                }
            });

            // If courses are provided, we need to replace existing ones to update order
            if (courses && Array.isArray(courses)) {
                // Delete existing path courses
                await prisma.pathCourse.deleteMany({
                    where: { pathId: id }
                });

                // Create new path courses with updated order
                if (courses.length > 0) {
                    await prisma.pathCourse.createMany({
                        data: courses.map((courseId: string, index: number) => ({
                            pathId: id,
                            courseId,
                            order: index + 1
                        }))
                    });
                }
            }

            // Return updated path with courses
            return prisma.learningPath.findUnique({
                where: { id },
                include: {
                    courses: {
                        include: { course: true },
                        orderBy: { order: 'asc' }
                    }
                }
            });
        });

        res.status(200).json({ success: true, data: updatedPath });
    } catch (error: any) {
        console.error("Error updating path:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete path
export const deletePath = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params as { id: string };
        await prisma.learningPath.delete({
            where: { id }
        });
        res.status(200).json({ success: true, message: 'Path deleted successfully' });
    } catch (error: any) {
        console.error("Error deleting path:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
