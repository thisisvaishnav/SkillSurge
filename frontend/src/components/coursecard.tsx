import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, PlayCircle, CheckCircle2, ExternalLink } from "lucide-react"

interface VideoItem {
  title: string
  link: string
}

interface Course {
  id: number
  title: string
  description: string
  price: number
  originalPrice: number
  image: string
  instructor: string
  rating: number
  students: number
  duration: string
  lessons: number
  level: string
  videos?: VideoItem[]
  originalId?: string // MongoDB _id
}

interface CourseCardProps {
  course: Course
  isPurchased?: boolean
  onPurchase?: (courseId: number) => void
}

export function CourseCard({ course, isPurchased = false, onPurchase }: CourseCardProps) {
  // Use the videos array length for lessons count if available
  const lessonCount = course.videos?.length || course.lessons;
  
  // Function to handle clicking on course (purchase or open)
  const handleCourseAction = () => {
    if (isPurchased) {
      // If already purchased, navigate to the course page directly
      window.location.href = `/course/${course.originalId || course.id}`;
    } else if (onPurchase) {
      // Otherwise attempt to purchase
      onPurchase(course.id);
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white gap-0.5 text-black border-0">
      <div className="relative">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        {!isPurchased ? (
          <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
            {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
          </Badge>
        ) : (
          <Badge className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Purchased
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{course.level}</Badge>
        </div>

        <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-black">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <PlayCircle className="h-4 w-4" />
            {lessonCount} lessons
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.students.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-black">{course.rating}</span>
            </div>
            <span className="text-gray-500 text-sm">({course.students.toLocaleString()} students)</span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Instructor: <span className="font-medium text-black">{course.instructor}</span>
        </div>
        
        {course.videos && course.videos.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Course Content:</p>
            <ul className="text-sm text-gray-600 space-y-1 max-h-20 overflow-y-auto">
              {course.videos.slice(0, 3).map((video, index) => (
                <li key={index} className="flex items-center gap-1">
                  <PlayCircle className="h-3 w-3 text-blue-500" />
                  <span className="truncate">{video.title}</span>
                </li>
              ))}
              {course.videos.length > 3 && (
                <li className="text-blue-500 text-xs font-medium">
                  +{course.videos.length - 3} more videos
                </li>
              )}
            </ul>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 bg-white">
        <div className="w-full">
          {!isPurchased ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-green-600">${course.price}</span>
                <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleCourseAction}
              >
                Purchase Course
              </Button>
            </>
          ) : (
            <>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                onClick={handleCourseAction}
              >
                <ExternalLink className="h-4 w-4" />
                Open Course
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
