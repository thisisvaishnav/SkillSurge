# SkillSurge

A full-stack web application built with Next.js frontend and Node.js/Express backend with MongoDB database.

## 🚀 Tech Stack

### Frontend
- **Next.js 15.3.3** with Turbopack
- **React 19** with TypeScript
- **TailwindCSS 4** for styling
- **Shadcn UI** components with Radix UI
- **Lucide React** icons

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **bcrypt** for password hashing
- **CORS** enabled

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd SkillSurge
```

### 2. Install dependencies

#### Backend setup
```bash
cd Backend
npm install
```

#### Frontend setup
```bash
cd ../frontend
npm install
```

### 3. Environment Configuration

#### Backend Environment Variables
Create a `.env` file in the `Backend` directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillsurge
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

#### Frontend Environment Variables (Optional)
Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Database Setup

Make sure MongoDB is running on your system:
- **Local MongoDB**: Start your MongoDB service
- **MongoDB Atlas**: Update the `MONGODB_URI` in your `.env` file with your Atlas connection string

## 🚀 Running the Application

### Development Mode

#### 1. Start the Backend Server
```bash
cd Backend
npm run dev
```
The backend API will run on `http://localhost:5000`

#### 2. Start the Frontend Development Server
Open a new terminal and run:
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

### Production Mode

#### 1. Build and Start Backend
```bash
cd Backend
npm run build
npm start
```

#### 2. Build and Start Frontend
```bash
cd frontend
npm run build
npm start
```

## 📁 Project Structure

```
SkillSurge/
├── Backend/
│   ├── dist/              # Compiled TypeScript files
│   ├── node_modules/      # Backend dependencies
│   ├── index.ts           # Main backend entry point
│   ├── package.json       # Backend dependencies and scripts
│   └── tsconfig.json      # TypeScript configuration
├── frontend/
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   ├── components.json    # Shadcn UI configuration
│   ├── next.config.ts     # Next.js configuration
│   ├── package.json       # Frontend dependencies and scripts
│   ├── postcss.config.mjs # PostCSS configuration
│   └── tsconfig.json      # TypeScript configuration
└── README.md              # Project documentation
```

## 🛠️ Available Scripts

### Backend Scripts
- `npm run dev` - Compile TypeScript and start development server
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

### Frontend Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use TailwindCSS for styling
- Implement proper error handling
- Use descriptive variable and function names
- Use early returns for better readability

### Component Development
- Use functional components with hooks
- Implement accessibility features
- Use Shadcn UI components when possible
- Follow the "Don't Repeat Yourself" (DRY) principle

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in your environment variables
2. **MongoDB connection error**: Ensure MongoDB is running and connection string is correct
3. **Frontend build errors**: Check Node.js version compatibility
4. **TypeScript compilation errors**: Verify tsconfig.json settings

### Getting Help

If you encounter any issues, please check:
- Node.js and npm versions
- MongoDB connection status
- Environment variables configuration
- Console error messages

---

**Happy coding! 🎉** 
