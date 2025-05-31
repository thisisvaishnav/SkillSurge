"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Lock, ShoppingCart, ExternalLink } from "lucide-react"

interface Video {
  id: number
  title: string
  duration: string
  link?: string
  isPreview: boolean
}

interface VideoPlayerProps {
  video?: Video
  isPurchased?: boolean
  coursePurchased: boolean
}

export function VideoPlayer({ video, coursePurchased }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!video) {
    return (
      <Card className="aspect-video">
        <CardContent className="flex items-center justify-center h-full bg-gray-100">
          <div className="text-center">
            <div className="text-gray-600 mb-2">No video selected</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const canPlay = video.isPreview || coursePurchased
  const hasVideoLink = video.link && video.link.trim() !== ""

  return (
    <Card className="aspect-video overflow-hidden">
      <CardContent className="p-0 h-full relative">
        {canPlay ? (
          <div className="relative w-full h-full bg-gradient-to-r from-blue-900 to-indigo-900">
            {hasVideoLink && isPlaying ? (
              // Actual video iframe when a link is available and playing
              <div className="w-full h-full">
                <iframe 
                  src={video.link} 
                  className="w-full h-full" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              // Play button overlay for starting video
              <div className="absolute inset-0 flex items-center justify-center">
                {!isPlaying ? (
                  <Button 
                    size="lg" 
                    className="rounded-full w-16 h-16 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700" 
                    onClick={() => setIsPlaying(true)}
                  >
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                ) : (
                  <div className="text-white text-center p-8 bg-blue-900 bg-opacity-80 rounded-lg">
                    <div className="text-lg mb-2">🎥 Playing: {video.title}</div>
                    <div className="text-sm opacity-75">Duration: {video.duration}</div>
                    <div className="flex gap-2 justify-center mt-4">
                      <Button 
                        variant="outline" 
                        className="bg-white text-blue-700 hover:bg-blue-50 border-blue-200"
                        onClick={() => setIsPlaying(false)}
                      >
                        Pause
                      </Button>
                      {hasVideoLink && (
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-1 bg-white text-blue-700 hover:bg-blue-50 border-blue-200"
                          onClick={() => window.open(video.link, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open in new tab
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Video overlay info */}
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {video.isPreview ? "Preview" : "Full Video"}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-r from-gray-100 to-gray-200">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <Lock className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Video Locked</h3>
              <p className="text-gray-600 mb-4">Purchase this course to access all videos</p>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="h-4 w-4" />
                Purchase Course
              </Button>
            </div>
          </div>
        )}

        {/* Video title overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-transparent p-4">
          <h3 className="text-white font-semibold">{video.title}</h3>
          <p className="text-blue-200 text-sm">{video.duration}</p>
          {hasVideoLink && (
            <p className="text-blue-300 text-xs mt-1 flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              Video link available
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 