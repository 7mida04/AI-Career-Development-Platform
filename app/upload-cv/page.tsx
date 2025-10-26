'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import { Upload, Loader2 } from 'lucide-react'
import { CareerAIIcon } from "../components/ui/career-ai-icon"
import { uploadCV } from "../actions/upload-cv"
import { useToast } from "../components/ui/use-toast"

export default function UploadCVClient() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setSelectedFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleContinue = async () => {
    if (selectedFile) {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('file', selectedFile)

      try {
        const result = await uploadCV(formData)
        
        if (result.success) {
          localStorage.setItem('jobRecommendations', JSON.stringify(result.jobs))
          localStorage.setItem('educationRecommendations', JSON.stringify(result.education))
          localStorage.setItem('profileRecommendations', JSON.stringify(result.profile))
          localStorage.setItem('courseraRecommendations', JSON.stringify(result.coursera))
          router.push('/profile')
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to process CV",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload CV",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="p-4 flex justify-between items-center border-b bg-white">
        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <CareerAIIcon />
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center bg-white/80 backdrop-blur-sm shadow-lg 
              ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-lg font-medium mb-2">Drag & Drop</h2>
            <p className="text-sm text-muted-foreground mb-4">
              or select files from device
            </p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" asChild>
                <span>Select File</span>
              </Button>
            </label>
            <p className="text-xs text-muted-foreground mt-4">max: 25MB</p>
          </div>
          {selectedFile && (
            <div className="bg-white p-4 rounded-lg flex items-center justify-between shadow-md">
              <span className="text-sm font-medium">{selectedFile.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                Remove
              </Button>
            </div>
          )}
          <Button
            className="w-full bg-[#E7451F] hover:bg-red-600"
            disabled={!selectedFile || isLoading}
            onClick={handleContinue}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </main>
    </div>
  )
}