import prisma from './src/utils/prisma';
import { execSync } from 'child_process';
import path from 'path';
import { beforeAll, afterAll, jest } from '@jest/globals';

jest.setTimeout(30000);

// Setup anything before tests if needed
beforeAll(async () => {
    // Connect to the DB
    await prisma.$connect();
});

afterAll(async () => {
    // Disconnect from the DB
    await prisma.$disconnect();
});
