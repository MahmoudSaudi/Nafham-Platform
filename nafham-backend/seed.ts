import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Create an instructor first
  const instructor = await prisma.user.create({
    data: {
      name: 'أحمد محمود',
      email: 'ahmed.instructor@nafham.com',
      password: 'dummy_hashed_password', // Just a seed mock
      role: 'TEACHER',
    }
  });

  // Create a course
  const course = await prisma.course.create({
    data: {
      title: 'مقدمة في تطوير الويب (Full-Stack)',
      description: 'تعلم أساسيات تطوير الويب وبناء تطبيقات متكاملة باستخدام أحدث التقنيات.',
      price: 199,
      level: 'مبتدئ',
      category: 'برمجة',
      image: '/images/courses/web-dev.jpg', // Mock image
      rating: 4.8,
      students: 1250,
      duration: '40 ساعة',
      isPublished: true,
      instructorId: instructor.id,
    }
  });

  console.log('Database seeded successfully:', course);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
