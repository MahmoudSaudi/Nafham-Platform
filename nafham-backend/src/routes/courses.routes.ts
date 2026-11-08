import { Router } from 'express';
import { getAllCourses, getCourseById, getAdminCourses, createCourse, updateCourse, deleteCourse, updateProgress } from '../controllers/courses.controller';
import { createChapter, updateChapter, deleteChapter, createLesson, updateLesson, deleteLesson } from '../controllers/curriculum.controller';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();

// GET /api/courses
router.get('/', getAllCourses);

// GET /api/courses/admin
router.get('/admin', protect, authorize('ADMIN', 'TEACHER'), getAdminCourses);

// GET /api/courses/:id
router.get('/:id', getCourseById);

// POST /api/courses
router.post('/', protect, authorize('ADMIN', 'TEACHER'), createCourse);

// PUT /api/courses/:id
router.put('/:id', protect, authorize('ADMIN', 'TEACHER'), updateCourse);

// DELETE /api/courses/:id
router.delete('/:id', protect, authorize('ADMIN', 'TEACHER'), deleteCourse);

// POST /api/courses/:courseId/progress
router.post('/:courseId/progress', protect, updateProgress);

// Curriculum Routes
router.post('/:courseId/chapters', protect, authorize('ADMIN', 'TEACHER'), createChapter);
router.put('/chapters/:chapterId', protect, authorize('ADMIN', 'TEACHER'), updateChapter);
router.delete('/chapters/:chapterId', protect, authorize('ADMIN', 'TEACHER'), deleteChapter);

router.post('/chapters/:chapterId/lessons', protect, authorize('ADMIN', 'TEACHER'), createLesson);
router.put('/lessons/:lessonId', protect, authorize('ADMIN', 'TEACHER'), updateLesson);
router.delete('/lessons/:lessonId', protect, authorize('ADMIN', 'TEACHER'), deleteLesson);

export default router;
