export const environment = {
    production: false,
    originalUrl: 'https://kilometers-sponsorship-personals-colombia.trycloudflare.com', // URL base de tu backend en desarrollo
    // apiUrl: 'http://localhost:8080/api' // URL base de tu backend en desarrollo
    apiUrl: 'https://kilometers-sponsorship-personals-colombia.trycloudflare.com/api', // URL base de tu backend en desarrollo
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