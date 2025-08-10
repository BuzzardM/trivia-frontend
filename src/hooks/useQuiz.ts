import { useState, useEffect } from 'react';
import { quizService } from '@/services/quiz.service';
import {
  Category,
  QuizConfig,
  QuizResponse,
  Answer,
  CheckAnswersResponse,
} from '@/types/quiz';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await quizService.getCategories();
        setCategories(response.categories);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch categories'
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useQuiz = () => {
  const [quiz, setQuiz] = useState<QuizResponse | null>(null);
  const [answers, setAnswers] = useState<Answer>({});
  const [results, setResults] = useState<CheckAnswersResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = async (config: QuizConfig) => {
    setLoading(true);
    setError(null);
    try {
      const quizData = await quizService.getQuestions(config);
      setQuiz(quizData);
      setAnswers({});
      setResults(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start quiz');
    } finally {
      setLoading(false);
    }
  };

  const setAnswer = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const submitQuiz = async () => {
    if (!quiz) return;

    setLoading(true);
    setError(null);
    try {
      const results = await quizService.checkAnswers(quiz.sessionId, answers);
      setResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit quiz');
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setQuiz(null);
    setAnswers({});
    setResults(null);
    setError(null);
  };

  return {
    quiz,
    answers,
    results,
    loading,
    error,
    startQuiz,
    setAnswer,
    submitQuiz,
    resetQuiz,
  };
};
