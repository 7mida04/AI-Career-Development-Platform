'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { MapPin, Building, Clock, BookOpen } from 'lucide-react'
import { CareerAIIcon } from "../components/ui/career-ai-icon"
import { useToast } from "../components/ui/use-toast"

interface Job {
  title: string
  company: string
  location: string
  description: string
  posting_date: string
  remote_status: string
  job_url: string
}

interface JobRecommendation {
  recommended_job: string
  jobs: Job[]
}

export default function JobResults() {
  const router = useRouter()
  const { toast } = useToast()
  const [jobData, setJobData] = useState<JobRecommendation | null>(null)
  const [mainJobIndex, setMainJobIndex] = useState(0)

  useEffect(() => {
    const storedData = localStorage.getItem('jobRecommendations')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setJobData(parsedData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load job recommendations",
          variant: "destructive",
        })
      }
    }
  }, [toast])

  const handleApplyNow = (url: string) => {
    window.open(url, '_blank')
  }

  const handleMoreDetails = (index: number) => {
    setMainJobIndex(index)
  }

  const handleCourseraClick = () => {
    router.push('/coursera')
  }

  if (!jobData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading job recommendations...</p>
      </div>
    )
  }

  const mainJob = jobData.jobs[mainJobIndex]
  const otherJobs = jobData.jobs.filter((_, index) => index !== mainJobIndex)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CareerAIIcon />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
          Recommended Job : <span className="text-red-600">"{jobData.recommended_job}"</span>
          </h1>
          <div className="w-32"></div> {/* Placeholder for layout balance */}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-[#E7451F] text-white">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">{mainJob.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <Building className="h-4 w-4" />
                    <span>{mainJob.company}</span>
                    <MapPin className="h-4 w-4 ml-2" />
                    <span>{mainJob.location}</span>
                  </div>
                </div>
                <Badge className="bg-white text-[#E7451F]">
                  Full Time
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                  <p className="text-gray-600">{mainJob.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-[#E7451F] border-[#E7451F]">
                    Posted {mainJob.posting_date}
                  </Badge>
                </div>
                <Button
                  onClick={() => handleApplyNow(mainJob.job_url)}
                  className="bg-gradient-to-r from-[#E7451F] to-red-600 hover:bg-red-700 text-white"
                >
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex justify-between mb-4">
              <Button variant="outline" size="sm" onClick={() => router.push('/formations')}>
                Executive Programs
              </Button>
              <Button variant="outline" size="sm" onClick={handleCourseraClick}>
                <BookOpen className="w-4 h-4 mr-2" />
                Coursera Courses
              </Button>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Other Jobs by Priority</h2>
            {otherJobs.map((job, index) => (
              <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{job.posting_date}</span>
                      </div>
                    </div>
                    <Badge className="bg-[#E7451F]-300 text-red-600 border-[#E7451F]">
                      Full Time 
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => handleMoreDetails(jobData.jobs.findIndex(j => j === job))}
                  >
                    More Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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

