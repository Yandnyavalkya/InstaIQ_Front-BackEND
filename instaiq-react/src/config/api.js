import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        if (parsedUserInfo.token) {
          config.headers.Authorization = `Bearer ${parsedUserInfo.token}`;
        }
      } catch (error) {
        console.error('Error parsing userInfo:', error);
        localStorage.removeItem('userInfo');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
  
  // User endpoints
  USER: {
    PROFILE: '/users/profile',
    PURCHASED_COURSES: '/users/purchased-courses',
    UPDATE_PROFILE: '/users/profile',
  },
  
  // Course endpoints
  COURSE: {
    ALL: '/courses',
    BY_ID: (id) => `/courses/${id}`,
    PURCHASE: (id) => `/courses/${id}/purchase`,
  },
  
  // Event endpoints
  EVENT: {
    ALL: '/events',
    BY_ID: (id) => `/events/${id}`,
    CREATE: '/events',
    UPDATE: (id) => `/events/${id}`,
    DELETE: (id) => `/events/${id}`,
  },
  
  // Contact endpoints
  CONTACT: {
    SUBMIT: '/contact',
  },
  
  // Admin endpoints
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    COURSES: '/admin/courses',
    EVENTS: '/admin/events',
    ORDERS: '/admin/orders',
    CREATE_ADMIN: '/admin/create-admin',
  },
};

// API service functions
export const apiService = {
  // Auth services
  auth: {
    register: (userData) => api.post(API_ENDPOINTS.AUTH.REGISTER, userData),
    login: (credentials) => api.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
    logout: () => api.post(API_ENDPOINTS.AUTH.LOGOUT),
  },
  
  // User services
  user: {
    getProfile: () => api.get(API_ENDPOINTS.USER.PROFILE),
    updateProfile: (userData) => api.put(API_ENDPOINTS.USER.UPDATE_PROFILE, userData),
    getPurchasedCourses: () => api.get(API_ENDPOINTS.USER.PURCHASED_COURSES),
  },
  
  // Course services
  course: {
    getAll: () => api.get(API_ENDPOINTS.COURSE.ALL),
    getById: (id) => api.get(API_ENDPOINTS.COURSE.BY_ID(id)),
    purchase: (id) => api.post(API_ENDPOINTS.COURSE.PURCHASE(id)),
  },
  
  // Event services
  event: {
    getAll: () => api.get(API_ENDPOINTS.EVENT.ALL),
    getById: (id) => api.get(API_ENDPOINTS.EVENT.BY_ID(id)),
    create: (eventData) => api.post(API_ENDPOINTS.EVENT.CREATE, eventData),
    update: (id, eventData) => api.put(API_ENDPOINTS.EVENT.UPDATE(id), eventData),
    delete: (id) => api.delete(API_ENDPOINTS.EVENT.DELETE(id)),
  },
  
  // Contact services
  contact: {
    submit: (contactData) => api.post(API_ENDPOINTS.CONTACT.SUBMIT, contactData),
  },
  
  // Admin services
  admin: {
    getDashboard: () => api.get(API_ENDPOINTS.ADMIN.DASHBOARD),
    getUsers: () => api.get(API_ENDPOINTS.ADMIN.USERS),
    getCourses: () => api.get(API_ENDPOINTS.ADMIN.COURSES),
    getEvents: () => api.get(API_ENDPOINTS.ADMIN.EVENTS),
    getOrders: () => api.get(API_ENDPOINTS.ADMIN.ORDERS),
    createAdmin: (adminData) => api.post(API_ENDPOINTS.ADMIN.CREATE_ADMIN, adminData),
  },
};

export default api;
export { API_BASE_URL }; 