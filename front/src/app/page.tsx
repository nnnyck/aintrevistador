'use client';

import Link from 'next/link';

import {
  Video,
  Brain,
  Trophy,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
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

      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Interview Training</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                Master Your Next
                <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Job Interview
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Practice with a realistic AI interviewer featuring a human-like avatar.
                Get instant feedback and build the confidence you need to succeed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link href="/interview">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                  >
                    Start Training Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 hover:bg-blue-50 transition-all duration-300"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="mt-20 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl transform rotate-1"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-blue-600">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                      <Video className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-gray-600 font-medium">Realistic Video Interview Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-bold">Why Choose InterviewAI?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to ace your interviews, powered by cutting-edge AI technology
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="pt-6 space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Realistic Experience</h3>
                  <p className="text-gray-600">
                    Practice with a lifelike 3D avatar that simulates real interview scenarios,
                    complete with natural speech and facial expressions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="pt-6 space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">AI-Powered Questions</h3>
                  <p className="text-gray-600">
                    Get intelligent, contextual interview questions tailored to your target role
                    and experience level.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="pt-6 space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Instant Feedback</h3>
                  <p className="text-gray-600">
                    Receive immediate insights on your performance, body language, and communication
                    skills to improve continuously.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">How It Works</h2>
              <p className="text-xl text-blue-100">
                Get started in three simple steps
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: 'Start Your Session',
                  description: 'Click "Start Training" and prepare for your virtual interview experience.'
                },
                {
                  step: 2,
                  title: 'Meet Your AI Interviewer',
                  description: 'Engage with our realistic 3D avatar who will ask you relevant interview questions.'
                },
                {
                  step: 3,
                  title: 'Practice & Improve',
                  description: 'Answer questions naturally and receive feedback to enhance your skills.'
                }
              ].map((item) => (
                <div key={item.step} className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-blue-100">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">What You'll Gain</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                'Build confidence in interview situations',
                'Practice answering common questions',
                'Improve communication skills',
                'Reduce interview anxiety',
                'Learn proper interview etiquette',
                'Get comfortable with video interviews'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors duration-300">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Trophy className="w-16 h-16 text-blue-600 mx-auto" />
            <h2 className="text-4xl font-bold">Ready to Land Your Dream Job?</h2>
            <p className="text-xl text-gray-600">
              Start practicing today and transform your interview performance
            </p>
            <Link href="/interview">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Begin Your Training Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">InterviewAI</span>
          </div>
          <p className="text-gray-400">
            © 2025 InterviewAI. Empowering candidates worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}
