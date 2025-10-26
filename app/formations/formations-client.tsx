'use client'

import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { CareerAIIcon } from "../components/ui/career-ai-icon"
import { Book, Clock, GraduationCap, BookOpen } from 'lucide-react'
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useToast } from "../components/ui/use-toast"

interface Program {
  name: string
  type: string
  start_date: string
  location: string
  description: string
  program_url: string
  brochure_url: string
}

interface EducationRecommendation {
  recommended_theme: string
  programs: Program[]
}

export default function Formations() {
  const router = useRouter()
  const { toast } = useToast()
  const [educationData, setEducationData] = useState<EducationRecommendation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem('educationRecommendations')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setEducationData(parsedData)
      } catch (error) {
        setError("Failed to load education recommendations")
        toast({
          title: "Error",
          description: "Failed to load education recommendations",
          variant: "destructive",
        })
      }
    } else {
      setError("No education recommendations found")
    }
    setIsLoading(false)
  }, [toast])

  const handleBack = () => {
    router.push('/job-results')
  }

  const handleApply = (url: string) => {
    window.open(url, '_blank')
  }

  const handleDownloadBrochure = (url: string) => {
    if (url) {
      window.open(url, '_blank')
    } else {
      toast({
        title: "Info",
        description: "Brochure not available for this program",
      })
    }
  }

  const handleCourseraClick = () => {
    router.push('/coursera')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading education recommendations...</p>
      </div>
    )
  }

  if (error || !educationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{error || "Failed to load education recommendations"}</p>
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
            <Image
              src="/images/executive education .jpg"
              alt="executive education"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="text-red-600">"{educationData.recommended_theme}"</span>
          </h1>
          <div className="flex items-center gap-2">
            <CareerAIIcon />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            className="pl-0"
            onClick={handleBack}
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            Back to Job Results
          </Button>
          <Button variant="outline" size="sm" onClick={handleCourseraClick}>
            <BookOpen className="w-4 h-4 mr-2" />
            Coursera Courses
          </Button>
        </div>
        
        {educationData.programs && educationData.programs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {educationData.programs.map((program, index) => (
              <Card key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <CardHeader className="bg-[#E7451F] text-white">
                  <CardTitle className="text-xl font-bold">{program.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <Book className="h-4 w-4" />
                    <span>{program.type}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Start Date: {program.start_date || 'TBD'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap className="h-4 w-4" />
                      <span>Location: {program.location}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{program.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApply(program.program_url)}
                        className="flex-1 bg-[#E7451F] text-white"
                      >
                        Apply
                      </Button>
                      <Button
                        onClick={() => handleDownloadBrochure(program.brochure_url)}
                        variant="outline"
                        className="flex-1 border-[#E7451F] text-[#E7451F] hover:bg-red-50"
                        disabled={!program.brochure_url}
                      >
                        Download Brochure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No programs available for the recommended theme.</p>
        )}
      </main>

      <footer className="bg-gradient-to-r from-[#E7451F] to-red-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-8 mb-4 md:mb-0">
              <span className="text-sm">© 2024 Career AI</span>
            </div>
            <div className="flex items-center gap-4">
              <a className="text-sm hover:text-red-400 transition-colors">Made by group 1</a>
              <a className="text-sm hover:text-red-400 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

