import React from 'react';
import PRFAQForm from '../components/PRFAQForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8" dir="rtl">
          יוצר PRFAQ
        </h1>
        <PRFAQForm />
      </main>
    </div>
  );
}
