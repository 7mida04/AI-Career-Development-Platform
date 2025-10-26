import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pergola.original.jpg"
          alt="University Auditorium"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/um6p-logo.png"
            alt="UM6P"
            width={240}
            height={80}
            className="object-contain"
          />
          <span className="text-white text-sm font-medium">
            {/* University Mohammed VI Polytechnic */}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-start justify-center h-[calc(100vh-80px)] p-8">
        <div
          style={{ backgroundColor: "#E7451F" }}
          className="max-w-2xl p-8 rounded-lg"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Career AI Recommendation
          </h1>
          <Link href="/upload-cv">
            <Button
              size="lg"
              className="bg-white text-red-500 hover:bg-white/90 hover:text-red-600"
            >
              Continue
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
