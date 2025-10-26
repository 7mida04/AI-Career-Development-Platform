"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import Image from "next/image";
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Briefcase, MapPin, Mail, Phone, Upload, BookOpen } from 'lucide-react'
import { CareerAIIcon } from "../components/ui/career-ai-icon"
import { useToast } from "../components/ui/use-toast"

interface ProfileInfo {
  full_name: string;
  location: string;
  email: string;
  phone: string;
  key_skills: string[];
}

export default function Profile() {
  const router = useRouter();
  const { toast } = useToast()
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(() => {
    const storedProfile = localStorage.getItem('profileRecommendations');
    return storedProfile ? JSON.parse(storedProfile) : null;
  });

  const handleContinue = () => {
    router.push('/job-results');
  };

  const handleContinueToCourses = () => {
    router.push('/formations');
  };

  const handleContinueToCoursera = () => {
    router.push('/coursera');
  };

  const handleUpdateCV = () => {
    router.push('/upload-cv');
  };

  if (!profileInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No profile information available. Please upload your CV.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="p-4 flex justify-between items-center border-b bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/um6p-logo.png"
            alt="UM6P Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">PROFILE</h1>
        <div className="flex items-center space-x-2">
          <CareerAIIcon />
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto py-12 px-4">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-[#E7451F] h-32"></div>
          <CardContent className="relative pt-16 pb-8 px-8">
            <div className="absolute -top-16 left-8">
              <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <Image
                  src="/images/profile-picture.jpg"
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{profileInfo.full_name}</h2>
                <p className="text-gray-600 mb-4 flex items-center">
                  
                  
                </p>
                <p className="text-gray-600 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {profileInfo.location}
                </p>
                <p className="text-gray-600 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {profileInfo.email}
                </p>
                <p className="text-gray-600 mb-4 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {profileInfo.phone}
                </p>
                <Button 
                  onClick={handleUpdateCV}
                  className="bg-white text-red-600 border border-red-600 hover:bg-red-50 px-4 py-2 rounded-full shadow-sm transition duration-300 ease-in-out flex items-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Update CV
                </Button>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Skills</h3>
                <ul className="space-y-2">
                  {profileInfo.key_skills.map((skill, index) => (
                    <li key={index} className="flex items-center bg-red-50 rounded-full py-2 px-4">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-8 space-x-4">
          <Button 
            size="lg" 
            onClick={handleContinueToCoursera}
            className="bg-gradient-to-r from-[#E7451F] to-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Coursera Courses
          </Button>
          <Button 
            size="lg" 
            onClick={handleContinueToCourses}
            className="bg-gradient-to-r from-[#E7451F] to-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Executive Programs
          </Button>
          <Button 
            size="lg" 
            onClick={handleContinue}
            className="bg-gradient-to-r from-[#E7451F] to-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Continue to Job Results
          </Button>
        </div>
      </main>
    </div>
  );
}

