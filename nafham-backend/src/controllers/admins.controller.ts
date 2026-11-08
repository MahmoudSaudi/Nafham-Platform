import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Get all admins and teachers
export const getAdmins = async (req: Request, res: Response): Promise<void> => {
    try {
        const admins = await prisma.user.findMany({
            where: { 
                role: { in: ['ADMIN', 'TEACHER'] } 
            },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
            }
        });
        res.status(200).json({ success: true, data: admins });
    } catch (error: any) {
        console.error("Error getting admins:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Create a new admin/teacher
export const createAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, role, isActive } = req.body;
        
        if (!name || !email || !password || !role) {
            res.status(400).json({ success: false, message: 'Missing required fields' });
            return;
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'Email is already in use' });
            return;
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password, // NOTE: Should be hashed in production
                role, // 'ADMIN' or 'TEACHER'
                isActive: isActive ?? true
            }
        });

        res.status(201).json({ success: true, data: user });
    } catch (error: any) {
        console.error("Error creating admin:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update an admin
export const updateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const { name, role, isActive } = req.body;

        const user = await prisma.user.update({
            where: { id: id as string }, // Cast to string
            data: {
                name,
                role,
                isActive
            }
        });

        res.status(200).json({ success: true, data: user });
    } catch (error: any) {
        console.error("Error updating admin:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete an admin
export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;

        await prisma.user.delete({
            where: { id: id as string }
        });

        res.status(200).json({ success: true, message: 'Admin deleted successfully' });
    } catch (error: any) {
        console.error("Error deleting admin:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get aggregated instructors data
export const getInstructorsDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const teachers = await prisma.user.findMany({
            where: { role: 'TEACHER' },
            include: {
                courses: {
                    select: {
                        id: true,
                        transactions: {
                            select: { amount: true, status: true }
                        }
                    }
                }
            }
        });

        const instructorsData = teachers.map(teacher => {
            const publishedCoursesCount = teacher.courses.length; // You can filter by isPublished if you want, but for now length is fine
            
            // Calculate total earnings from all courses owned by this teacher
            // Only counting 'COMPLETED' or 'PAID' or whatever the success status is. Let's assume 'PAID' or 'COMPLETED'.
            let totalEarnings = 0;
            let pendingPayout = 0; // Simplified logic: let's just make pending 10% or calculate it if needed, but for now we'll mock pending

            teacher.courses.forEach(course => {
                course.transactions.forEach(t => {
                    // Assuming status is in Arabic or English based on previous schema. Let's assume all for now.
                    if (t.status === "مدفوع" || t.status === "COMPLETED" || t.status === "PAID" || t.status === "SUCCESS") {
                        totalEarnings += t.amount;
                    }
                });
            });

            return {
                id: teacher.id,
                name: teacher.name,
                email: teacher.email,
                avatar: teacher.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=f1f5f9&color=64748b`,
                track: "تطوير الويب", // Can be dynamic if we add specialty
                trackColor: "bg-emerald-50 text-emerald-700",
                publishedCourses: publishedCoursesCount,
                rating: 4.5, // Default or calculated average from reviews
                earnings: totalEarnings,
                pendingPayout: totalEarnings * 0.1, // Mock 10% pending
                contractStatus: teacher.isActive ? "نشط" : "غير نشط"
            };
        });

        res.status(200).json({ success: true, data: instructorsData });
    } catch (error: any) {
        console.error("Error fetching instructors details:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get aggregated reports data
export const getReports = async (req: Request, res: Response): Promise<void> => {
    try {
        // 1. Course Performance (Top courses by students/revenue)
        const courses = await prisma.course.findMany({
            include: {
                instructor: { select: { name: true } },
                transactions: { select: { amount: true, status: true } },
                enrollments: { select: { id: true, progress: true } }
            }
        });

        const coursePerformance = courses.map(course => {
            const studentsCount = course.enrollments.length;
            const completedCount = course.enrollments.filter(e => e.progress === 100).length;
            const completionRate = studentsCount > 0 ? Math.round((completedCount / studentsCount) * 100) : 0;
            
            let revenue = 0;
            course.transactions.forEach(t => {
                if (t.status === "مدفوع" || t.status === "COMPLETED" || t.status === "PAID" || t.status === "SUCCESS") {
                    revenue += t.amount;
                }
            });

            return {
                id: course.id,
                title: course.title,
                instructor: course.instructor.name,
                image: course.image || "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80",
                studentsCount,
                completionRate,
                rating: course.rating || 0,
                revenue: `$${revenue.toLocaleString()}`
            };
        }).sort((a, b) => b.studentsCount - a.studentsCount).slice(0, 5); // Top 5 courses

        // 2. Growth Data (Mocking by months for now, since we don't have historical snapshots)
        const growthData = [
            { month: "يناير", users: 450, revenue: 2000 },
            { month: "فبراير", users: 590, revenue: 2500 },
            { month: "مارس", users: 800, revenue: 3200 },
            { month: "أبريل", users: 810, revenue: 3000 },
            { month: "مايو", users: 560, revenue: 4100 },
            { month: "يونيو", users: 950, revenue: 4800 },
        ];

        // 3. Registration Sources (Mocking for now as we don't track source in User model yet)
        const registrationSources = [
            { name: "مباشر", value: 400, percentage: 40, color: "#166534" },
            { name: "بحث جوجل", value: 250, percentage: 25, color: "#3b82f6" },
            { name: "سوشيال ميديا", value: 200, percentage: 20, color: "#8b5cf6" },
        ];

        res.status(200).json({
            success: true,
            data: {
                coursePerformance,
                growthData,
                registrationSources
            }
        });
    } catch (error: any) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

