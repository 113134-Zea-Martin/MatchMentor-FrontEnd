# Mentor Match

## Overview

Mentor Match is a platform that connects students with tutors to facilitate academic advising. This front-end application is built with Angular and provides a user-friendly interface for registration, authentication, and profile management.

## Features

- **User Authentication System**
  - Registration for students and tutors
  - Secure login with token-based authentication
  - Password recovery functionality
  - Form validation with real-time feedback
  - Terms and conditions acceptance

- **Profile Management**
  - Tutor profile display with detailed information
  - Professional background visualization
  - Interests and expertise areas
  - Rate and availability information
  - Profile visibility settings

- **Search and Matching**
  - Advanced search filters for tutors
  - Skills and subject matching algorithm
  - Availability calendar integration
  - Rating and review system
  - Common interests highlighting

- **Messaging System**
  - Real-time chat functionality using WebSockets (STOMP/SockJS)
  - Message history and notifications
  - Unread messages indicators
  - File sharing capabilities

- **Meeting Management**
  - Scheduling interface with calendar integration
  - Meeting confirmation and rejection workflow
  - Session tracking and history
  - Meeting request notifications
  - Payment integration with MercadoPago

- **Payment System**
  - Secure payment processing with MercadoPago integration
  - Payment history tracking
  - Transaction records for both students and tutors
  - Payment confirmation notifications

- **Responsive Design**
  - Bootstrap implementation for responsive layouts
  - Mobile-friendly interface
  - Bootstrap Icons for improved visual experience
  - Modal dialogs for important interactions

## Tech Stack

- **Frontend**: Angular 18.2.0
- **UI Framework**: Bootstrap 5.3.3
- **Icon Library**: Bootstrap Icons 1.11.3
- **HTTP Communication**: Angular HttpClient
- **Form Handling**: Angular Reactive Forms
- **Routing**: Angular Router
- **WebSockets**: STOMP/SockJS for real-time chat
- **Payment Gateway**: MercadoPago
- **Testing**: Jasmine & Karma

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Angular CLI: `npm install -g @angular/cli`

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
  - Terms and conditions

- **profile module**: Contains components and services for user profiles
  - Tutor profile display
  - User information management
  - Profile data models
  - Profile editing

- **match module**: Components for matching and communication
  - Student-tutor matching system
  - Pending requests management
  - Confirmed matches list
  - Real-time chat functionality
  - Meeting scheduling

- **meet module**: Meeting management components
  - Meeting history list
  - Meeting confirmation modals
  - Meeting rejection handling
  - Payment integration

- **navbar module**: Navigation components
  - Responsive navigation bar
  - User status indicators
  - Notification indicators

- **shared module**: Reusable components and services
  - UI components
  - Directives
  - Pipes and utilities

## Environment Configuration

The application uses environment files for configuration:
- `environment.ts` - Development configuration
- `environment.prod.ts` - Production configuration

Each environment file includes:
- API URLs
- WebSocket endpoints
- Payment gateway configurations

## Proxy Configuration

The application uses proxy.conf.json to handle CORS issues during development by proxying API requests to the backend server.

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

## Key Features Implementation

### Real-time Chat

The chat functionality uses STOMP over WebSockets to provide real-time messaging between students and tutors. Features include:
- Message persistence
- Unread message tracking
- Real-time message delivery

### Meeting Management

The meeting system allows:
- Students to request meetings with tutors
- Tutors to accept or reject meeting requests
- Integration with payment system for confirmed meetings
- Meeting history tracking

### Payment Integration

The application integrates with MercadoPago to process payments:
- Secure payment links generation
- Payment status tracking
- Payment history for both parties

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