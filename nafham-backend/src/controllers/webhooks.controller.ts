import { Request, Response } from 'express';
import crypto from 'crypto';
import prisma from '../utils/prisma';

// Secret keys should ideally be in environment variables
const PAYMOB_HMAC_SECRET = process.env.PAYMOB_HMAC_SECRET || 'your_paymob_hmac_secret';
const FAWRY_SECURITY_CODE = process.env.FAWRY_SECURITY_CODE || 'your_fawry_security_code';

export const paymobWebhook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { hmac } = req.query;
        const body = req.body;

        // Verify Paymob HMAC
        const obj = body.obj;
        const concatenatedString = [
            obj.amount_cents,
            obj.created_at,
            obj.currency,
            obj.error_occured,
            obj.has_parent_transaction,
            obj.id,
            obj.integration_id,
            obj.is_3d_secure,
            obj.is_auth,
            obj.is_capture,
            obj.is_refunded,
            obj.is_standalone_payment,
            obj.is_voided,
            obj.order.id,
            obj.owner,
            obj.pending,
            obj.source_data.pan,
            obj.source_data.sub_type,
            obj.source_data.type,
            obj.success
        ].join('');

        const hashed = crypto.createHmac('sha512', PAYMOB_HMAC_SECRET).update(concatenatedString).digest('hex');

        if (hashed !== hmac) {
            res.status(401).json({ success: false, message: 'Invalid HMAC signature' });
            return;
        }

        // Process successful payment
        if (obj.success === true && obj.pending === false) {
            // Locate transaction in our DB using the order id or integration id
            const gatewayTransactionId = obj.order.id.toString();
            
            const transaction = await prisma.transaction.findUnique({
                where: { gatewayTransactionId }
            });

            if (transaction && transaction.status === 'PENDING') {
                // Update transaction status
                await prisma.transaction.update({
                    where: { id: transaction.id },
                    data: { 
                        status: 'SUCCESS',
                        metadata: body // Store the webhook payload for record
                    }
                });

                // Enroll the user in the course
                if (transaction.courseId) {
                    await prisma.enrollment.upsert({
                        where: {
                            userId_courseId: {
                                userId: transaction.userId,
                                courseId: transaction.courseId
                            }
                        },
                        update: {},
                        create: {
                            userId: transaction.userId,
                            courseId: transaction.courseId,
                            progress: 0
                        }
                    });
                }
            }
        }

        res.status(200).json({ success: true });
    } catch (error: any) {
        console.error("Paymob Webhook Error:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const fawryWebhook = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        
        // Fawry sends: requestId, fawryRefNumber, merchantRefNumber, customerMobile, customerMail, paymentAmount, orderAmount, fawryFees, shippingFees, orderStatus, paymentMethod, messageSignature
        
        const concatenatedString = [
            body.fawryRefNumber,
            body.merchantRefNumber,
            body.paymentAmount,
            body.orderAmount,
            body.orderStatus,
            body.paymentMethod,
            FAWRY_SECURITY_CODE
        ].join('');

        const hashed = crypto.createHash('sha256').update(concatenatedString).digest('hex');

        if (hashed !== body.messageSignature) {
            res.status(401).json({ success: false, message: 'Invalid signature' });
            return;
        }

        if (body.orderStatus === 'PAID') {
            const gatewayTransactionId = body.merchantRefNumber;

            const transaction = await prisma.transaction.findUnique({
                where: { gatewayTransactionId }
            });

            if (transaction && transaction.status === 'PENDING') {
                await prisma.transaction.update({
                    where: { id: transaction.id },
                    data: { 
                        status: 'SUCCESS',
                        metadata: body 
                    }
                });

                if (transaction.courseId) {
                    await prisma.enrollment.upsert({
                        where: {
                            userId_courseId: {
                                userId: transaction.userId,
                                courseId: transaction.courseId
                            }
                        },
                        update: {},
                        create: {
                            userId: transaction.userId,
                            courseId: transaction.courseId,
                            progress: 0
                        }
                    });
                }
            }
        }

        res.status(200).json({ success: true });
    } catch (error: any) {
        console.error("Fawry Webhook Error:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
