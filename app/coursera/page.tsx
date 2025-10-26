'use client'
import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { CareerAIIcon } from "../components/ui/career-ai-icon"
import { Book, Clock, GraduationCap, ExternalLink } from 'lucide-react'
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useToast } from "../components/ui/use-toast"

interface Course {
  title: string;
  provider: string;
  duration: string;
  url: string;
  description: string;
  recommended_experience: string;
}

interface CourseraRecommendation {
  recommended_topics: string[];
  courses: Course[];
}

export default function CourseraCourses() {
  const router = useRouter()
  const { toast } = useToast()
  const [courseraData, setCourseraData] = useState<CourseraRecommendation | null>(() => {
    const storedCoursera = localStorage.getItem('courseraRecommendations');
    return storedCoursera ? JSON.parse(storedCoursera) : null;
  });

  const handleBack = () => {
    router.push('/profile')
  }

  const handleEnroll = (url: string) => {
    window.open(url, '_blank')
  }

  if (!courseraData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No Coursera recommendations available. Please upload your CV.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
        <Image
          src="/images/um6p-logo.png"
          alt="UM6P Logo"
          width={120}
          height={40}
          className="object-contain"
        />
      </div>
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold text-gray-800">Recommended Courses From</h1>
        <Image
          src="/images/coursera.jpg"
          alt="Coursera Logo"
          width={120}
          height={40}
          className="object-contain"
        />
      </div>
      <div className="flex items-center gap-0">
        <CareerAIIcon />
      </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 pl-0"
          onClick={handleBack}
        >
          <GraduationCap className="h-4 w-4 mr-2" />
          Back to Profile
        </Button>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courseraData.courses.map((course, index) => (
            <Card key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-[#E7451F]  text-white">
                <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <Book className="h-4 w-4" />
                  <span>{course.provider}</span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Duration: {course.duration}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{course.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GraduationCap className="h-4 w-4 text-green-500" />
                    <span>Recommended Experience: {course.recommended_experience}</span>
                  </div>
                  
                  <Button
                    onClick={() => handleEnroll(course.url)}
                    className="w-full bg-[#E7451F] text-white"
                  >
                    Enroll <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-gradient-to-r from-[#E7451F] to-red-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-8 mb-4 md:mb-0">
              <span className="text-sm">© 2024 Career AI</span>
              
            </div>
            <div className="flex items-center gap-4">
              <a  className="text-sm hover:text-red-400 transition-colors">Made by group 1</a>
              <a  className="text-sm hover:text-red-400 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

