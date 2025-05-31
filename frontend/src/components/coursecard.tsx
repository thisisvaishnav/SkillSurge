import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, PlayCircle } from "lucide-react"

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
}

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
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
        <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
          {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
        </Badge>
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
            {course.lessons} lessons
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
      </CardContent>

      <CardFooter className="p-6 pt-0 bg-white">
        <div className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-green-600">${course.price}</span>
            <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
          </div>

          <Link href={`/course/${course.id}`} className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">View Course</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
