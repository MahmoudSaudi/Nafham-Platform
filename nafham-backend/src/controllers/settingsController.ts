import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { encrypt } from '../utils/cryptoUtils';

// Get all settings
export const getAllSettings = async (req: Request, res: Response) => {
    try {
        const settings = await prisma.setting.findMany();

        // Check if the user is a SUPER_ADMIN.
        // For now, any ADMIN can access settings, but if we want only SUPER_ADMIN to see payments
        // We can filter out payments category if not super admin.
        // The frontend will hide the tabs, but backend should also protect it.
        // We assume req.user.role === 'ADMIN' has passed from middleware.

        const sanitizedSettings = settings.map(setting => {
            if (setting.key === 'OPENAI_API_KEY' || setting.key.includes('SECRET')) {
                return { ...setting, value: setting.value ? '********' : '' };
            }
            return setting;
        });

        res.status(200).json({
            success: true,
            data: sanitizedSettings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching settings',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Update multiple settings at once
export const updateSettings = async (req: Request, res: Response) => {
    try {
        // Expected payload: { settings: [{ key: "SITE_NAME", value: "Nafham", category: "GENERAL" }, ...] }
        const { settings } = req.body;

        if (!settings || !Array.isArray(settings)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payload. Expected an array of settings.'
            });
        }

        // Use Prisma transaction for batch update/upsert
        const updatePromises = settings.map((s: any) => {
            let valueToSave = s.value;
            
            // Skip updating if it's the masked dummy value from frontend
            if (valueToSave === '********') {
                return null;
            }

            // Encrypt API keys and secrets
            if (s.key === 'OPENAI_API_KEY' || s.key.includes('SECRET') || s.key.includes('PRIVATE')) {
                if (valueToSave) {
                    valueToSave = encrypt(valueToSave);
                }
            }

            return prisma.setting.upsert({
                where: { key: s.key },
                update: {
                    value: valueToSave,
                    category: s.category || "GENERAL",
                    isPublic: s.isPublic !== undefined ? s.isPublic : false
                },
                create: {
                    key: s.key,
                    value: valueToSave,
                    category: s.category || "GENERAL",
                    isPublic: s.isPublic !== undefined ? s.isPublic : false
                }
            });
        }).filter(Boolean) as any[];

        await prisma.$transaction(updatePromises);

        res.status(200).json({
            success: true,
            message: 'Settings updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while updating settings',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
