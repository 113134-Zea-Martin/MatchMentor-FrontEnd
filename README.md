# Mentor Match

## Overview

Mentor Match is a platform that connects students with tutors to facilitate academic advising. This front-end application is built with Angular and provides a user-friendly interface for registration, authentication, and profile management.

## Features

- **User Authentication System**
  - Registration for students and tutors
  - Secure login with token-based authentication
  - Password recovery functionality
  - Form validation with real-time feedback

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

## Project Status

This project is currently in development as part of a supervised practice project for Universidad Tecnológica Nacional (UTN), Argentina.

## Contact

For questions about this project, please contact [mzeacardenas@gmail.com](mailto:mzeacardenas@gmail.com).