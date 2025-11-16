'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brain, Video, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              InterviewAI
            </span>
          </div>
          <Link href="/interview">
            <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105">
              Start Training
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
