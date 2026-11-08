import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Create a new chapter
export const createChapter = async (req: Request, res: Response): Promise<void> => {
    try {
        const { courseId } = req.params as { courseId: string };
        const { title, order } = req.body;

        const chapter = await prisma.chapter.create({
            data: {
                title,
                order: parseInt(order),
                courseId
            }
        });

        res.status(201).json({ success: true, data: chapter });
    } catch (error: any) {
        console.error("Error creating chapter:", error);
        res.status(500).json({ success: false, message: 'Server error while creating chapter' });
    }
};

// Update chapter
export const updateChapter = async (req: Request, res: Response): Promise<void> => {
    try {
        const { chapterId } = req.params as { chapterId: string };
        const { title, order } = req.body;

        const chapter = await prisma.chapter.update({
            where: { id: chapterId },
            data: {
                ...(title && { title }),
                ...(order !== undefined && { order: parseInt(order) })
            }
        });

        res.status(200).json({ success: true, data: chapter });
    } catch (error: any) {
        console.error("Error updating chapter:", error);
        res.status(500).json({ success: false, message: 'Server error while updating chapter' });
    }
};

// Delete chapter
export const deleteChapter = async (req: Request, res: Response): Promise<void> => {
    try {
        const { chapterId } = req.params as { chapterId: string };
        await prisma.chapter.delete({ where: { id: chapterId } });
        res.status(200).json({ success: true, message: 'Chapter deleted' });
    } catch (error: any) {
        console.error("Error deleting chapter:", error);
        res.status(500).json({ success: false, message: 'Server error while deleting chapter' });
    }
};

// Create Lesson
export const createLesson = async (req: Request, res: Response): Promise<void> => {
    try {
        const { chapterId } = req.params as { chapterId: string };
        const { title, videoUrl, videoType, duration, order, isFree } = req.body;

        const lesson = await prisma.lesson.create({
            data: {
                title,
                videoUrl,
                videoType: videoType || "UPLOAD",
                duration,
                order: parseInt(order),
                isFree: Boolean(isFree),
                chapterId
            }
        });

        res.status(201).json({ success: true, data: lesson });
    } catch (error: any) {
        console.error("Error creating lesson:", error);
        res.status(500).json({ success: false, message: 'Server error while creating lesson' });
    }
};

// Update Lesson
export const updateLesson = async (req: Request, res: Response): Promise<void> => {
    try {
        const { lessonId } = req.params as { lessonId: string };
        const { title, videoUrl, videoType, duration, order, isFree } = req.body;

        const lesson = await prisma.lesson.update({
            where: { id: lessonId },
            data: {
                ...(title && { title }),
                ...(videoUrl !== undefined && { videoUrl }),
                ...(videoType !== undefined && { videoType }),
                ...(duration !== undefined && { duration }),
                ...(order !== undefined && { order: parseInt(order) }),
                ...(isFree !== undefined && { isFree: Boolean(isFree) })
            }
        });

        res.status(200).json({ success: true, data: lesson });
    } catch (error: any) {
        console.error("Error updating lesson:", error);
        res.status(500).json({ success: false, message: 'Server error while updating lesson' });
    }
};

// Delete Lesson
export const deleteLesson = async (req: Request, res: Response): Promise<void> => {
    try {
        const { lessonId } = req.params as { lessonId: string };
        await prisma.lesson.delete({ where: { id: lessonId } });
        res.status(200).json({ success: true, message: 'Lesson deleted' });
    } catch (error: any) {
        console.error("Error deleting lesson:", error);
        res.status(500).json({ success: false, message: 'Server error while deleting lesson' });
    }
};
