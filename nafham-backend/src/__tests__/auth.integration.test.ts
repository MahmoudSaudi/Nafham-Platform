import request from 'supertest';
import app from '../app'; // Adjust path if needed to point to the express app export
import prisma from '../utils/prisma';
import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';

describe('Auth Integration Tests', () => {
    // Clear the user table before tests
    beforeAll(async () => {
        await prisma.user.deleteMany({});
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    let token: string;

    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toHaveProperty('id');
        expect(res.body.user.email).toBe('test@example.com');
        
        token = res.body.token; // Save token for protected routes if your API returns it
    });

    it('should fail to register with an existing email', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Another User',
                email: 'test@example.com',
                password: 'password123',
            });

        expect(res.status).toBe(400); // Or 409 depending on implementation
        expect(res.body.success).toBe(false);
    });

    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty('token');
    });

    it('should fail to login with wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword',
            });

        expect(res.status).toBe(401);
        expect(res.body.success).toBe(false);
    });
});
