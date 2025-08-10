'use client';

import { useQuiz } from '@/hooks/useQuiz';
import { Alert, AlertDescription } from '@/components/ui/alert';
import QuizResults from '@/components/quiz/QuizResults';
import QuizInterface from '@/components/quiz/QuizInterface';
import QuizConfigForm from '@/components/quiz/QuizConfigForm';

export default function QuizApp() {
  const {
    quiz,
    answers,
    results,
    loading,
    error,
    startQuiz,
    setAnswer,
    submitQuiz,
    resetQuiz,
  } = useQuiz();

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (results && quiz) {
    return (
      <div className="container mx-auto p-4">
        <QuizResults
          results={results}
          questions={quiz.questions}
          onRestart={resetQuiz}
        />
      </div>
    );
  }

  if (quiz) {
    return (
      <div className="container mx-auto p-4">
        <QuizInterface
          quiz={quiz}
          answers={answers}
          loading={loading}
          onAnswerSelect={setAnswer}
          onSubmit={submitQuiz}
          onBack={resetQuiz}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-gray-700 mb-4 animate-bounce-gentle">
            ✨ Ready to test your knowledge?
          </div>
        </div>
        <QuizConfigForm onStartQuiz={startQuiz} loading={loading} />
      </div>
    </div>
  );
}
