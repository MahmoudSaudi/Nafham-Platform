import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getDashboardOverview = async (req: Request, res: Response): Promise<void> => {
    try {
        const [totalStudents, completedCourses, totalRevenue, recentRegistrations] = await Promise.all([
            prisma.user.count({ where: { role: 'STUDENT' } }),
            prisma.enrollment.count({ where: { progress: 100 } }),
            prisma.course.aggregate({ _sum: { price: true } }), // Simplified revenue calculation
            prisma.enrollment.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { name: true, id: true } },
                    course: { select: { title: true, id: true } }
                }
            })
        ]);

        const stats = [
            {
                id: 1,
                title: "إجمالي الطلاب النشطين",
                value: totalStudents.toString(),
                change: "+12%", // Mock change
                isPositive: true,
                iconType: "users"
            },
            {
                id: 2,
                title: "الدورات المكتملة",
                value: completedCourses.toString(),
                change: "+5%",
                isPositive: true,
                iconType: "courses"
            },
            {
                id: 3,
                title: "متوسط وقت التعلم اليومي",
                value: "4.2h", // Mock
                change: "-0%",
                isPositive: false,
                iconType: "time"
            },
            {
                id: 4,
                title: "الإيرادات",
                value: `$${totalRevenue._sum.price || 0}`,
                change: "+18%",
                isPositive: true,
                iconType: "revenue"
            }
        ];

        const mappedRegistrations = recentRegistrations.map((reg: any) => ({
            id: reg.id,
            user: reg.user.name,
            course: reg.course.title,
            date: new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }).format(reg.createdAt),
            progress: reg.progress,
            status: reg.progress > 0 ? "نشط" : "معلق"
        }));

        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const enrollments7Days = await prisma.enrollment.findMany({
            where: { createdAt: { gte: sevenDaysAgo } },
            select: { createdAt: true }
        });

        // Activity data: [Saturday, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday]
        const activityData = [0, 0, 0, 0, 0, 0, 0];
        enrollments7Days.forEach(e => {
            const day = e.createdAt.getDay(); // 0=Sun, 1=Mon... 6=Sat
            const index = day === 6 ? 0 : day + 1; // map so Saturday is 0, Sunday is 1... Friday is 6
            activityData[index]++;
        });

        const coursesByCategory = await prisma.course.groupBy({
            by: ['category'],
            _count: { id: true }
        });
        
        const totalCoursesCount = coursesByCategory.reduce((sum, item) => sum + item._count.id, 0) || 1;
        const colors = ["bg-[#10b981]", "bg-[#3b82f6]", "bg-[#f59e0b]", "bg-[#ef4444]", "bg-[#8b5cf6]"];
        const hexColors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];
        
        const pathsData = coursesByCategory.map((c, i) => ({
            label: c.category,
            value: Math.round((c._count.id / totalCoursesCount) * 100),
            colorClass: colors[i % colors.length],
            hexColor: hexColors[i % hexColors.length]
        }));

        res.status(200).json({
            success: true,
            data: {
                stats,
                recentRegistrations: mappedRegistrations,
                activityData,
                pathsData: pathsData.length ? pathsData : [
                    { label: "لا يوجد", value: 100, colorClass: "bg-gray-300", hexColor: "#d1d5db" }
                ]
            }
        });
    } catch (error: any) {
        console.error("Error getting dashboard overview:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
