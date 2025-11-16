'use client';

interface StepCardProps {
  step: number;
  title: string;
  description: string;
}

export default function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
      <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
        {step}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-blue-100">{description}</p>
      </div>
    </div>
  );
}
