'use client';

import { CheckCircle2 } from 'lucide-react';

interface BenefitItemProps {
  text: string;
}

export default function BenefitItem({ text }: BenefitItemProps) {
  return (
    <div className="flex items-center space-x-3 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors duration-300">
      <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
      <span className="text-gray-800 font-medium">{text}</span>
    </div>
  );
}
