import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Get all certificates
export const getCertificates = async (req: Request, res: Response): Promise<void> => {
    try {
        const certificates = await prisma.certificate.findMany({
            orderBy: { issueDate: 'desc' },
            include: {
                user: { select: { name: true, email: true } },
                course: { select: { title: true } }
            }
        });
        
        res.status(200).json({ success: true, data: certificates });
    } catch (error: any) {
        console.error("Error getting certificates:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Create a new certificate
export const createCertificate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, courseId, certificateUrl } = req.body;

        const existing = await prisma.certificate.findUnique({
            where: { userId_courseId: { userId, courseId } }
        });

        if (existing) {
            res.status(400).json({ success: false, message: 'Certificate already exists for this user and course' });
            return;
        }

        const certificate = await prisma.certificate.create({
            data: {
                userId,
                courseId,
                certificateUrl,
                status: 'ISSUED'
            },
            include: {
                user: { select: { name: true, email: true } },
                course: { select: { title: true } }
            }
        });

        res.status(201).json({ success: true, data: certificate, message: 'Certificate created successfully' });
    } catch (error: any) {
        console.error("Error creating certificate:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Revoke a certificate
export const revokeCertificate = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;

        const certificate = await prisma.certificate.update({
            where: { id },
            data: { status: 'REVOKED' },
            include: {
                user: { select: { name: true, email: true } },
                course: { select: { title: true } }
            }
        });

        res.status(200).json({ success: true, data: certificate, message: 'Certificate revoked successfully' });
    } catch (error: any) {
        console.error("Error revoking certificate:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
