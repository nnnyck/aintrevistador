'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
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
  );
}
