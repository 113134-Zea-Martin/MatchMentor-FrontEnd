export const environment = {
    production: false,
    originalUrl: 'http://localhost:8080', // URL base de tu backend en desarrollo. 
    // DEBE IR SIN / AL FINAL SINO FALLA EL CHAT
    apiUrl: 'http://localhost:8080/api', // URL base de tu backend en desarrollo
  };

  // app-routes.constants.ts

export const AppRoutes = {
  AUTH: {
    BASE: 'auth',
    // LOGIN: 'auth/login',
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    FORGOT_PASSWORD: 'auth/forgot-password',
    RESET_PASSWORD: 'auth/reset-password'
  },
  HOME: 'home',
  EDIT_PROFILE: 'edit-profile',
  EXPLORE: {
    BASE: 'explore',
    TUTORS: 'explore/tutors',
    STUDENTS: 'explore/students',
    PENDINGS: 'explore/pendings'
  },
  ROOT: '', // Para la ruta raíz
  DEFAULT: 'auth/login' // Ruta por defecto
} as const;

export const AppRoles = {
  ADMIN: 'ADMIN',
  TUTOR: 'TUTOR',
  STUDENT: 'STUDENT'
} as const;