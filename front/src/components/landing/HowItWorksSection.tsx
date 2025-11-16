'use client';

import StepCard from './StepCard';

export default function HowItWorksSection() {
  const steps = [
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
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold">How It Works</h2>
          <p className="text-xl text-blue-100">Get started in three simple steps</p>
        </div>

        <div className="space-y-8">
          {steps.map(step => <StepCard key={step.step} {...step} />)}
        </div>
      </div>
    </section>
  );
}
