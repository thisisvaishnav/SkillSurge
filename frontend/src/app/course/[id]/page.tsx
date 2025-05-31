"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VideoPlayer } from "@/components/video-player"
import { Star, Clock, Users, PlayCircle, CheckCircle, Lock, ArrowLeft } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

// Define interfaces for better type safety
// This matches the VideoPlayer component's expectation
interface Video {
  id: number
  title: string
  duration: string
  link?: string
  isPreview: boolean
}

interface FormattedCourse {
  id: number
  originalId: string
  title: string
  description: string
  price: number
  originalPrice: number
  image: string
  instructor: string
  rating: number
  students: number
  duration: string
  level: string
  videos: Video[]
}

interface ApiCourse {
  _id: string
  title: string
  description: string
  price: number
  image: string
  instructor: string
  videos?: { title: string, link: string }[]
}

// Improved implementation to use API data instead of mock data
export default function CoursePage() {
  const params = useParams()
  const courseId = params.id as string
  const { isLoggedIn, hasPurchased, purchaseCourse } = useAuth()
  
  const [course, setCourse] = useState<FormattedCourse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [purchaseMessage, setPurchaseMessage] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null)
  
  // Use state for purchased status to allow dynamic updates without page reload
  const [isPurchased, setIsPurchased] = useState(false)

  // Convert MongoDB _id to a course ID format that we can use
  const apiCourseIdToUiId = (id: string): number => {
    return parseInt(id.substring(id.length - 6), 16)
  }

  // Format videos from API response or create mock videos if none are provided
  const formatVideos = (apiCourse: ApiCourse): Video[] => {
    if (apiCourse.videos && apiCourse.videos.length > 0) {
      return apiCourse.videos.map((video, index) => ({
        id: index + 1,
        title: video.title,
        duration: "15:00", // Mock duration if not provided by the API
        link: video.link,
        isPreview: index === 0 // Make the first video a preview
      }))
    } else {
      // Create mock videos if the API doesn't provide any
      return [
        { id: 1, title: "Introduction to the course", duration: "15:30", isPreview: true },
        { id: 2, title: "Getting Started", duration: "22:45", isPreview: false },
        { id: 3, title: "Core Concepts", duration: "35:20", isPreview: false },
        { id: 4, title: "Advanced Techniques", duration: "28:15", isPreview: false },
      ]
    }
  }

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:3000/courses`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch courses')
        }
        
        const data = await response.json()
        
        // Find the specific course by ID
        const apiCourse = data.courses.find((c: ApiCourse) => c._id === courseId)
        
        if (!apiCourse) {
          setError('Course not found')
          return
        }
        
        // Format the course data to include UI-specific properties
        const formattedCourse: FormattedCourse = {
          id: apiCourseIdToUiId(apiCourse._id),
          originalId: apiCourse._id,
          title: apiCourse.title,
          description: apiCourse.description,
          price: apiCourse.price,
          originalPrice: apiCourse.price * 1.5, // Calculate original price
          image: apiCourse.image || "/placeholder.svg?height=300&width=500",
          instructor: apiCourse.instructor,
          rating: 4.7, // Mock rating
          students: Math.floor(Math.random() * 10000) + 1000, // Mock student count
          duration: "30 hours", // Mock duration
          level: "All Levels", // Mock level
          videos: formatVideos(apiCourse)
        }
        
        setCourse(formattedCourse)
        setSelectedVideo(formattedCourse.videos[0])
        
        // Check if course is purchased
        if (isLoggedIn && hasPurchased(apiCourse._id)) {
          setIsPurchased(true)
        }
      } catch (err) {
        console.error('Failed to fetch course:', err)
        setError('Failed to load course details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId, isLoggedIn, hasPurchased])

  const handlePurchase = async () => {
    if (!isLoggedIn) {
      setPurchaseMessage({
        message: "Please log in to purchase this course",
        type: "warning"
      })
      return
    }
    
    if (!course) return
    
    // Check if course is already purchased
    if (isPurchased) {
      // Just display the course content without trying to purchase again
      setPurchaseMessage({
        message: "You already own this course",
        type: "info"
      })
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setPurchaseMessage(null)
      }, 3000)
      return
    }
    
    setIsPurchasing(true)
    
    try {
      const success = await purchaseCourse(course.originalId)
      
      if (success) {
        setPurchaseMessage({
          message: `You have successfully purchased ${course.title}`,
          type: "success"
        })
        
        // Update the purchased state directly to unlock content without reloading
        setIsPurchased(true)
      } else {
        setPurchaseMessage({
          message: "There was a problem purchasing this course. Please try again.",
          type: "error"
        })
      }
    } catch (err) {
      console.error('Failed to purchase course:', err)
      setPurchaseMessage({
        message: "There was a problem purchasing this course. Please try again.",
        type: "error"
      })
    } finally {
      setIsPurchasing(false)
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setPurchaseMessage(null)
      }, 3000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Course Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "Could not find the requested course."}</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">Back to Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Purchase Message */}
      {purchaseMessage && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md z-50 ${
          purchaseMessage.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' :
          purchaseMessage.type === 'error' ? 'bg-red-100 text-red-800 border border-red-300' :
          purchaseMessage.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
          'bg-blue-100 text-blue-800 border border-blue-300'
        }`}>
          {purchaseMessage.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
        {/* Course navigation */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Courses</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">{course.title}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player and Course Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <VideoPlayer 
                video={selectedVideo || undefined} 
                isPurchased={isPurchased} 
                coursePurchased={isPurchased} 
              />

              <div className="p-6 text-gray-800">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">{course.level}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-gray-800">{course.rating}</span>
                  </div>
                  <span className="text-gray-500">({course.students.toLocaleString()} students)</span>
                  <span className="text-sm text-gray-600">
                    Instructor: <span className="font-medium text-gray-800">{course.instructor}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6 border-y border-gray-100 py-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <PlayCircle className="h-4 w-4" />
                    {course.videos.length} lessons
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students.toLocaleString()} students
                  </div>
                </div>

                <div className="prose prose-blue max-w-none">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">About This Course</h2>
                  <p className="text-gray-600">{course.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card - Only show if not purchased */}
            {!isPurchased && (
              <Card className="bg-white overflow-hidden shadow-sm">
                <CardHeader className="bg-white border-b border-gray-100">
                  <CardTitle className="text-gray-800">Get Full Access</CardTitle>
                </CardHeader>
                <CardContent className="bg-white p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-bold text-green-600">${course.price}</span>
                    <span className="text-lg text-gray-500 line-through">${course.originalPrice.toFixed(2)}</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                  <Button 
                    onClick={handlePurchase} 
                    className="w-full mb-4 bg-blue-600 hover:bg-blue-700 py-6 text-base font-medium"
                    disabled={isPurchasing}
                  >
                    {isPurchasing ? "Processing..." : "Purchase Course"}
                  </Button>
                  <div className="text-sm text-gray-600 text-center space-y-2">
                    <p>30-day money-back guarantee</p>
                    <p>Full lifetime access</p>
                    <p>Access on mobile and desktop</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Course Content */}
            <Card className="bg-white overflow-hidden shadow-sm">
              <CardHeader className="bg-white border-b border-gray-100 px-6 py-4">
                <CardTitle className="text-gray-800 flex items-center justify-between">
                  <span>Course Content</span>
                  <Badge className="ml-2 bg-blue-100 text-blue-800 font-normal">
                    {course.videos.length} lessons
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 bg-white max-h-[500px] overflow-y-auto">
                <div className="divide-y divide-gray-100">
                  {course.videos.map((video: Video) => (
                    <div
                      key={video.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedVideo?.id === video.id ? "bg-blue-50 border-l-4 border-l-blue-500 pl-3" : ""
                      }`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 bg-gray-100 rounded-full p-2">
                            {video.isPreview || isPurchased ? (
                              <PlayCircle className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Lock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-sm text-gray-800">{video.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{video.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {video.isPreview && !isPurchased && (
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                              Preview
                            </Badge>
                          )}
                          {isPurchased && video.id === selectedVideo?.id && (
                            <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* What You'll Learn Card */}
            <Card className="bg-white overflow-hidden shadow-sm">
              <CardHeader className="bg-white border-b border-gray-100 px-6 py-4">
                <CardTitle className="text-gray-800">What You&apos;ll Learn</CardTitle>
              </CardHeader>
              <CardContent className="bg-white p-6">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Master the fundamentals of {course.title}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Build real-world projects to apply your knowledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Understand advanced concepts and best practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Learn from industry professionals</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 