'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/coursecard';
import { BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Define the video item interface
interface VideoItem {
  title: string;
  link: string;
}

// Define the course interface to match what the CourseCard component expects
interface CourseCardType {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  level: string;
  videos?: VideoItem[];
  originalId: string; // Store the original MongoDB _id
}

// Define the API response structure
interface ApiCourse {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  instructor: string;
  videos?: VideoItem[];
  __v: number;
}

interface ApiResponse {
  courses: ApiCourse[];
}

export default function Home() {
  const { isLoggedIn, hasPurchased, purchaseCourse } = useAuth();
  const [courses, setCourses] = useState<CourseCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchaseMessage, setPurchaseMessage] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning';
  } | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/courses');
        
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        const data: ApiResponse = await response.json();
        
        if (data.courses) {
          // Transform API data to match the CourseCard component's expected format
          const formattedCourses = data.courses.map((course) => {
            // Check if the image URL is valid or use placeholder
            // Using a placeholder for all images to avoid Next.js image domain issues
            const imageUrl = "/placeholder.svg?height=200&width=300";
            
            return {
              id: parseInt(course._id.substring(course._id.length - 6), 16), // Convert last 6 chars of _id to a number
              title: course.title,
              description: course.description,
              price: course.price,
              originalPrice: course.price * 1.5, // Calculate original price as 1.5x the actual price
              image: imageUrl,
              instructor: course.instructor,
              rating: 4.5, // Default rating
              students: Math.floor(Math.random() * 10000) + 1000, // Random student count
              duration: "30 hours", // Default duration
              lessons: course.videos?.length || Math.floor(Math.random() * 100) + 20, // Use video length or random
              level: "Beginner", // Default level
              videos: course.videos, // Include videos array
              originalId: course._id // Store the original MongoDB _id
            };
          });
          
          setCourses(formattedCourses);
        }
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handlePurchase = async (courseId: number) => {
    if (!isLoggedIn) {
      setPurchaseMessage({
        message: "Please log in to purchase this course",
        type: "warning"
      });
      return;
    }
    
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    // Check if course is already purchased
    if (hasPurchased(course.originalId)) {
      // Open the course directly in the current tab
      window.location.href = `/course/${course.originalId}`;
      return;
    }
    
    const success = await purchaseCourse(course.originalId);
    
    if (success) {
      setPurchaseMessage({
        message: `You have successfully purchased ${course.title}`,
        type: "success"
      });
      
      // Open the course page after successful purchase in the current tab
      setTimeout(() => {
        // Navigate to the course page directly
        window.location.href = `/course/${course.originalId}`;
      }, 1000);
    } else {
      setPurchaseMessage({
        message: "There was a problem purchasing this course. Please try again.",
        type: "error"
      });
    }
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setPurchaseMessage(null);
    }, 3000);
  };

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

      {/* Purchase Message */}
      {purchaseMessage && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md z-50 ${
          purchaseMessage.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' :
          purchaseMessage.type === 'error' ? 'bg-red-100 text-red-800 border border-red-300' :
          'bg-yellow-100 text-yellow-800 border border-yellow-300'
        }`}>
          {purchaseMessage.message}
        </div>
      )}

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

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No courses available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  isPurchased={isLoggedIn && hasPurchased(course.originalId)}
                  onPurchase={handlePurchase}
                />
              ))}
            </div>
          )}
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
