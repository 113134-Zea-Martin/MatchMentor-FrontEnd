# Mentor Match

## Overview

Mentor Match is a platform that connects students with tutors to facilitate academic advising. This front-end application is built with Angular and provides a user-friendly interface for registration, authentication, and profile management.

## Features

- **User Authentication System**
  - Registration for students and tutors
  - Secure login with token-based authentication
  - Password recovery functionality
  - Form validation with real-time feedback

- **Profile Management**
  - Tutor profile display with detailed information
  - Professional background visualization
  - Interests and expertise areas
  - Rate and availability information

- **Search and Matching**
  - Advanced search filters for tutors
  - Skills and subject matching algorithm
  - Availability calendar integration
  - Rating and review system

- **Messaging System**
  - Real-time chat functionality
  - Message history and notifications
  - File sharing capabilities

- **Appointment Management**
  - Scheduling interface with calendar integration
  - Appointment confirmation and reminders
  - Session tracking and history

- **Responsive Design**
  - Bootstrap implementation for responsive layouts
  - Mobile-friendly interface
  - Bootstrap Icons for improved visual experience

## Tech Stack

- **Frontend**: Angular 18.2.0
- **UI Framework**: Bootstrap 5.3.3
- **Icon Library**: Bootstrap Icons 1.11.3
- **HTTP Communication**: Angular HttpClient
- **Form Handling**: Angular Reactive Forms
- **Routing**: Angular Router
- **State Management**: NgRx
- **Real-time Communication**: Socket.io
- **Calendar Integration**: FullCalendar
- **Testing**: Jasmine & Karma

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/113134-Zea-Martin/MatchMentor-FrontEnd.git
   ```

2. Navigate to the project directory:
   ```bash
   cd MatchMentor-FrontEnd/mentor-match-front
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Run the development server:
```bash
npm start
```
Navigate to `http://localhost:4200/` in your browser.

## Project Structure

- **auth module**: Contains components and services for authentication
  - Login
  - Registration
  - Password recovery
  - Password reset
- **profile module**: Contains components and services for user profiles
  - Tutor profile display
  - User information management
  - Profile data models
- **search module**: Components for search functionality
  - Search filters
  - Results display
  - Sort and filter options
- **messaging module**: Real-time chat implementation
  - Chat interface
  - Message history
  - Notifications service
- **appointment module**: Scheduling components
  - Calendar integration
  - Booking interface
  - Reminder service
- **shared module**: Reusable components and services
  - UI components
  - Directives
  - Pipes and utilities

## Environment Configuration

The application uses environment files for configuration:
- `environment.ts` - Development configuration
- `environment.prod.ts` - Production configuration

## Development

### Development Server

```bash
ng serve
```

### Building for Production

```bash
ng build
```
Build artifacts will be stored in the `dist/` directory.

### Running Unit Tests

```bash
ng test
```

### Running End-to-End Tests

```bash
ng e2e
```

### Code Linting

```bash
ng lint
```

## Deployment

This application can be deployed to various hosting platforms:

- Firebase Hosting
- Netlify
- Vercel
- AWS S3 + CloudFront

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Project Status

This project is currently in development as part of a supervised practice project for Universidad Tecnológica Nacional (UTN), Argentina.

## Contact

For questions about this project, please contact [mzeacardenas@gmail.com](mailto:mzeacardenas@gmail.com).

## License

This project is licensed under the MIT License - see the LICENSE file for details.