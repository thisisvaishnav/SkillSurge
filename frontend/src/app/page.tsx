'use client';

// import { useAuth } from '@/context/AuthContext';
// import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/coursecard';
import { BookOpen } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, and Node.js from scratch to build modern web applications.",
    price: 99.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 12543,
    duration: "40 hours",
    lessons: 156,
    level: "Beginner to Advanced",
  },
  {
    id: 2,
    title: "Advanced React & TypeScript",
    description: "Master advanced React patterns, TypeScript, state management, and modern development practices.",
    price: 129.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Mike Chen",
    rating: 4.9,
    students: 8932,
    duration: "32 hours",
    lessons: 124,
    level: "Intermediate to Advanced",
  },
  {
    id: 3,
    title: "Full-Stack Next.js Development",
    description:
      "Build production-ready applications with Next.js, including authentication, databases, and deployment.",
    price: 149.99,
    originalPrice: 299.99,
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Alex Rodriguez",
    rating: 4.7,
    students: 6721,
    duration: "45 hours",
    lessons: 178,
    level: "Intermediate",
  },
]

export default function Home() {
  // const { isLoggedIn, username } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 -mt-px">
      
        {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master New Skills with
            <span className="text-blue-600"> Expert-Led Courses</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of students learning cutting-edge web development skills from industry professionals. Start
            your journey today with our comprehensive course library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={() => {
                document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Browse Courses
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">28,000+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>


      {/* Courses Section */}
      <section id="courses" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated selection of courses designed to take your skills to the next level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">LearnHub</span>
              </div>
              <p className="text-gray-400">Empowering developers worldwide with high-quality, practical courses.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Courses</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    React & TypeScript
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Next.js
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>



      

      </div>
  );
}
