import request from 'supertest';
import app from '../app';
import prisma from '../utils/prisma';
import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';
import jwt from 'jsonwebtoken';

describe('Courses Integration Tests', () => {
    let adminToken: string;
    let studentToken: string;
    let instructorId: string;
    let createdCourseId: string;

    beforeAll(async () => {
        // Clear dependent data
        await prisma.course.deleteMany({});
        await prisma.user.deleteMany({});

        // Create an instructor user
        const instructor = await prisma.user.create({
            data: {
                name: 'Instructor Test',
                email: 'instructor@test.com',
                password: 'hashedpassword',
                role: 'TEACHER'
            }
        });
        instructorId = instructor.id;

        // Create a student user
        const student = await prisma.user.create({
            data: {
                name: 'Student Test',
                email: 'student@test.com',
                password: 'hashedpassword',
                role: 'STUDENT'
            }
        });

        // Generate tokens
        const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';
        adminToken = jwt.sign({ id: instructor.id, role: instructor.role }, JWT_SECRET, { expiresIn: '1h' });
        studentToken = jwt.sign({ id: student.id, role: student.role }, JWT_SECRET, { expiresIn: '1h' });
    });

    afterAll(async () => {
        await prisma.course.deleteMany({});
        await prisma.user.deleteMany({});
    });

    it('should allow an instructor to create a course', async () => {
        const res = await request(app)
            .post('/api/courses')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                title: 'Test Course',
                description: 'This is a test course',
                price: 100,
                category: 'Programming',
                instructorId: instructorId,
                isPublished: true
            });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data.title).toBe('Test Course');

        createdCourseId = res.body.data.id;
    });

    it('should retrieve all courses', async () => {
        const res = await request(app)
            .get('/api/courses');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should retrieve a single course by id', async () => {
        const res = await request(app)
            .get(`/api/courses/${createdCourseId}`);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.id).toBe(createdCourseId);
    });
});
