'use client'

import { useCallback, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Button } from "./button"
import { Camera, Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"

interface AvatarUploadProps {
  initialImage?: string
  onUpload?: (file: File) => Promise<void>
  className?: string
  size?: 'sm' | 'md' | 'lg'
  fallback: string
}

const sizeClasses = {
  sm: 'h-16 w-16',
  md: 'h-24 w-24',
  lg: 'h-32 w-32'
}

export function AvatarUpload({ 
  initialImage, 
  onUpload, 
  className,
  size = 'md',
  fallback 
}: AvatarUploadProps) {
  const [image, setImage] = useState<string | undefined>(initialImage)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file)
      setImage(previewUrl)

      // Call the onUpload callback if provided
      if (onUpload) {
        await onUpload(file)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      // Revert to previous image on error
      setImage(initialImage)
    } finally {
      setIsUploading(false)
    }
  }, [initialImage, onUpload])

  return (
    <div className="relative group">
      <Avatar className={cn(
        sizeClasses[size],
        'border-4 border-white shadow-lg',
        className
      )}>
        <AvatarImage src={image} />
        <AvatarFallback className="bg-red-100 text-red-600 font-semibold text-2xl">
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            fallback
          )}
        </AvatarFallback>
      </Avatar>
      
      <label
        htmlFor="avatar-upload"
        className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
      >
        <Camera className="w-6 h-6" />
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleUpload}
          disabled={isUploading}
        />
      </label>
    </div>
  )
}

