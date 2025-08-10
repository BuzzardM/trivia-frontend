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
    <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
      <QuizConfigForm onStartQuiz={startQuiz} loading={loading} />
    </div>
  );
}
