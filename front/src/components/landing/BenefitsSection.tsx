'use client';

import BenefitItem from './BenefitItem';

export default function BenefitsSection() {
  const benefits = [
    'Build confidence in interview situations',
    'Practice answering common questions',
    'Improve communication skills',
    'Reduce interview anxiety',
    'Learn proper interview etiquette',
    'Get comfortable with video interviews'
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold">What You'll Gain</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map((b, idx) => <BenefitItem key={idx} text={b} />)}
        </div>
      </div>
    </section>
  );
}
