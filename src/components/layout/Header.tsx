'use client';

import { Brain, Trophy, Star } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <Brain className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">TriviaChamp</h1>
        </div>
      </div>
    </header>
  );
}
