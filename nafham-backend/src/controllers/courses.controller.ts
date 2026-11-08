import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Get all published courses
export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
    try {
        const courses = await prisma.course.findMany({
            where: { isPublished: true },
            include: {
                instructor: {
                    select: { name: true, avatarUrl: true }
                },
                _count: {
                    select: { chapters: true, enrollments: true, reviews: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json({
            success: true,
            data: courses
        });
    } catch (error: any) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ success: false, message: 'Server error while fetching courses' });
    }
};

// Get single course by ID
export const getCourseById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const course = await prisma.course.findUnique({
            where: { id: id as string },
            include: {
                instructor: {
                    // @ts-ignore - bio exists in DB but IDE types are cached
                    select: { id: true, name: true, avatarUrl: true, email: true, bio: true }
                },
                chapters: {
                    orderBy: { order: 'asc' },
                    include: {
                        lessons: {
                            orderBy: { order: 'asc' },
                            select: { id: true, title: true, duration: true, isFree: true, order: true } // Don't expose videoUrl to public, only if enrolled
                        }
                    }
                },
                reviews: {
                    include: {
                        user: { select: { id: true, name: true, avatarUrl: true } }
                    },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!course) {
            res.status(404).json({ success: false, message: 'Course not found' });
            return;
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error: any) {
        console.error("Error fetching course:", error);
        res.status(500).json({ success: false, message: 'Server error while fetching course' });
    }
};

// Admin: Get all courses (including unpublished)
export const getAdminCourses = async (req: Request, res: Response): Promise<void> => {
    try {
        const courses = await prisma.course.findMany({
            include: {
                instructor: { select: { name: true, avatarUrl: true } },
                _count: { select: { chapters: true, enrollments: true, reviews: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json({ success: true, data: courses });
    } catch (error: any) {
        console.error("Error fetching admin courses:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Create a new course
export const createCourse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, price, level, category, image, duration, objectives, requirements, isPublished, instructorId } = req.body;
        
        let actualInstructorId = instructorId;
        if (!actualInstructorId) {
            const firstUser = await prisma.user.findFirst();
            if (firstUser) actualInstructorId = firstUser.id;
        }

        const course = await prisma.course.create({
            data: {
                title: title as string,
                description: description as string,
                price: price ? parseFloat(price as string) : 0,
                level: level ? (level as string) : "مبتدئ",
                category: category as string,
                image: image ? (image as string) : null,
                duration: duration ? (duration as string) : null,
                objectives: objectives || [],
                requirements: requirements || [],
                isPublished: Boolean(isPublished),
                instructorId: actualInstructorId as string
            } as any
        });

        res.status(201).json({ success: true, data: course });
    } catch (error: any) {
        console.error("Error creating course:", error);
        res.status(500).json({ success: false, message: 'Server error while creating course' });
    }
};

// Update an existing course
export const updateCourse = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const { title, description, price, level, category, image, duration, objectives, requirements, isPublished } = req.body;

        const updateData: any = {};
        if (title !== undefined) updateData.title = title as string;
        if (description !== undefined) updateData.description = description as string;
        if (price !== undefined) updateData.price = parseFloat(price as string);
        if (level !== undefined) updateData.level = level as string;
        if (category !== undefined) updateData.category = category as string;
        if (image !== undefined) updateData.image = image as string;
        if (duration !== undefined) updateData.duration = duration as string;
        if (objectives !== undefined) updateData.objectives = objectives;
        if (requirements !== undefined) updateData.requirements = requirements;
        if (isPublished !== undefined) updateData.isPublished = Boolean(isPublished);

        const course = await prisma.course.update({
            where: { id: id as string },
            data: updateData
        });

        res.status(200).json({ success: true, data: course });
    } catch (error: any) {
        console.error("Error updating course:", error);
        res.status(500).json({ success: false, message: 'Server error while updating course' });
    }
};

// Delete a course
export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        await prisma.course.delete({
            where: { id: id as string }
        });
        
        res.status(200).json({ success: true, message: 'Course deleted successfully' });
    } catch (error: any) {
        console.error("Error deleting course:", error);
        res.status(500).json({ success: false, message: 'Server error while deleting course' });
    }
};

// Update Course Progress & Generate Certificate if 100%
export const updateProgress = async (req: Request, res: Response): Promise<void> => {
    try {
        const courseId = req.params.courseId as string;
        const { userId, progress } = req.body; // progress should be 0-100

        if (!userId || progress === undefined) {
            res.status(400).json({ success: false, message: 'Missing userId or progress' });
            return;
        }

        const enrollment = await prisma.enrollment.update({
            where: {
                userId_courseId: {
                    userId: userId,
                    courseId: courseId
                }
            },
            data: {
                progress: parseFloat(progress)
            }
        });

        let certificate = null;

        // Auto-generate certificate if progress is 100
        if (enrollment.progress >= 100) {
            const existingCert = await prisma.certificate.findUnique({
                where: {
                    userId_courseId: {
                        userId: userId,
                        courseId: courseId
                    }
                }
            });

            if (!existingCert) {
                certificate = await prisma.certificate.create({
                    data: {
                        userId,
                        courseId,
                        status: 'ISSUED',
                        certificateUrl: `/certificates/${courseId}-${userId}.pdf` // Mock URL
                    }
                });

                // إرسال إشعار للطالب
                await prisma.notification.create({
                    data: {
                        title: 'مبروك! لقد أتممت الدورة',
                        message: 'لقد تم إصدار شهادة إتمام الدورة بنجاح. يمكنك الآن تحميلها من ملفك الشخصي.',
                        type: 'SYSTEM',
                        userId: userId,
                    }
                });

                // Gamification: Add points to the user
                await prisma.user.update({
                    where: { id: userId },
                    data: { points: { increment: 50 } }
                });

            } else {
                certificate = existingCert;
            }
        }

        res.status(200).json({
            success: true,
            data: {
                enrollment,
                certificate
            },
            message: certificate ? 'Progress updated and certificate issued' : 'Progress updated successfully'
        });

    } catch (error: any) {
        console.error("Error updating progress:", error);
        res.status(500).json({ success: false, message: 'Server error while updating progress' });
    }
};
