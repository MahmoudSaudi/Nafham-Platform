import { apiClient } from '../apiClient';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getCourses = async () => {
  try {
    const data = await apiClient.get('/courses');
    return data as any;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getCourseById = async (id: string) => {
  try {
    const data = await apiClient.get(`/courses/${id}`);
    return data as any;
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    throw error;
  }
};

export const getAdminCourses = async () => {
  try {
    const data = await apiClient.get('/courses/admin');
    return data as any;
  } catch (error) {
    console.error('Error fetching admin courses:', error);
    throw error;
  }
};

export const createCourse = async (courseData: any) => {
  try {
    const data = await apiClient.post('/courses', courseData);
    return data as any;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

export const updateCourse = async (id: string, courseData: any) => {
  try {
    const data = await apiClient.put(`/courses/${id}`, courseData);
    return data as any;
  } catch (error) {
    console.error(`Error updating course ${id}:`, error);
    throw error;
  }
};

export const deleteCourse = async (id: string) => {
  try {
    const data = await apiClient.delete(`/courses/${id}`);
    return data as any;
  } catch (error) {
    console.error(`Error deleting course ${id}:`, error);
    throw error;
  }
};

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    // The backend returns an absolute URL relative to domain, e.g. /uploads/filename.jpg
    // We should prepend the backend base URL (API_URL minus /api)
    const baseUrl = API_URL.replace('/api', '');
    return `${baseUrl}${response.data.url}`;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const uploadFile = uploadImage;

export const createChapter = async (courseId: string, chapterData: any) => {
  const data = await apiClient.post(`/courses/${courseId}/chapters`, chapterData);
  return data as any;
};

export const updateChapter = async (chapterId: string, chapterData: any) => {
  const data = await apiClient.put(`/courses/chapters/${chapterId}`, chapterData);
  return data as any;
};

export const deleteChapter = async (chapterId: string) => {
  const data = await apiClient.delete(`/courses/chapters/${chapterId}`);
  return data as any;
};

export const createLesson = async (chapterId: string, lessonData: any) => {
  const data = await apiClient.post(`/courses/chapters/${chapterId}/lessons`, lessonData);
  return data as any;
};

export const updateLesson = async (lessonId: string, lessonData: any) => {
  const data = await apiClient.put(`/courses/lessons/${lessonId}`, lessonData);
  return data as any;
};

export const deleteLesson = async (lessonId: string) => {
  const data = await apiClient.delete(`/courses/lessons/${lessonId}`);
  return data as any;
};
