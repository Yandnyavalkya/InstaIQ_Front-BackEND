import express from 'express';
import { getAllCourses, purchaseCourse,getCourseById } from '../controllers/courseController.js';
import { protect, authorizeRoles } from '../middelwares/auth.js';

const router = express.Router();

// Public route to get all courses (for browsing)
router.get('/', getAllCourses);

router.get('/:id', getCourseById); // NEW: Route for single course details


// Protected route for purchasing a course
router.post('/:id/purchase', protect, authorizeRoles('user'), purchaseCourse);

export default router;
