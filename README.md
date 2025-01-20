# Firebase Todo App

A real-time Todo application built with React, Vite, and Firebase. Features user authentication and real-time data synchronization.

<img width="1080" alt="Screenshot 2025-01-20 at 11 41 56 AM" src="https://github.com/user-attachments/assets/1d2230d5-bc99-4f5e-90f5-d86c9582c327" />

## Features

- 🔐 User Authentication (Sign up/Sign in)
- ✨ Real-time updates
- 📝 Create, Read, Update, Delete (CRUD) operations
- 🎯 Task completion tracking
- 💾 Persistent data storage
- 🎨 Clean and responsive UI

## Tech Stack

- React 18
- Vite
- Firebase 9
  - Firestore
  - Authentication
- TailwindCSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/yourusername/firebase-todo-app.git
    cd firebase-todo-app
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with your Firebase configuration:
    ```env
    VITE_API_KEY=your_api_key
    VITE_AUTH_DOMAIN=your_auth_domain
    VITE_PROJECTID=your_project_id
    VITE_STORAGE_BUCKET=your_storage_bucket
    VITE_MESSAGING_SENDERID=your_messaging_sender_id
    VITE_APPID=your_app_id
    VITE_MEASUREMENTID=your_measurement_id
    ```

4. Start the development server
    ```bash
    npm run dev
    ```

### Building for Production

1. Build with Vite
    ```bash
    vite build
    ```

## Firebase Configuration

The app uses the following Firebase services:
- Authentication for user management
- Firestore for data storage
- Hosting for deployment

## License
This project is licensed under the MIT License.
