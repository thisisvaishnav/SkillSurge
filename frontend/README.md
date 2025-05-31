# SkillSurge Frontend

This is the frontend application for SkillSurge, a modern learning platform built with Next.js. The application provides a beautiful and responsive user interface for browsing courses, managing user accounts, and accessing learning content.

## Technologies Used

- **Next.js**: React framework with server-side rendering and routing
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling and responsive design
- **Shadcn/UI**: Component library for consistent UI elements
- **JWT Authentication**: For secure user sessions

## Project Structure

- **`/src/app`**: Contains the Next.js page components and routes
- **`/src/components`**: Reusable UI components
- **`/src/context`**: React context providers (e.g., AuthContext)
- **`/src/lib`**: Utility functions and API client

## Key Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **User Authentication**: Sign up, login, and session management
- **Course Browsing**: Browse and search for available courses
- **Course Details**: View detailed information about courses
- **Protected Routes**: Secure routes that require authentication

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Building for Production

```bash
npm run build
npm run start
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
