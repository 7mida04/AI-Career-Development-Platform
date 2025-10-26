'use client'

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "../../../lib/utils"

interface ProfileAvatarProps {
  imageUrl?: string
  fallbackText: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fallbackClassName?: string
}

const sizeClasses = {
  sm: 'h-16 w-16',
  md: 'h-24 w-24',
  lg: 'h-32 w-32'
}

export function ProfileAvatar({
  imageUrl,
  fallbackText,
  size = 'md',
  className,
  fallbackClassName
}: ProfileAvatarProps) {
  return (
    <Avatar className={cn(
      sizeClasses[size],
      'border-4 border-white shadow-lg',
      className
    )}>
      {imageUrl && <AvatarImage src={imageUrl} alt="Profile picture" />}
      <AvatarFallback className={cn(
        "bg-red-100 text-red-600 font-semibold text-2xl",
        fallbackClassName
      )}>
        {fallbackText}
      </AvatarFallback>
    </Avatar>
  )
}

