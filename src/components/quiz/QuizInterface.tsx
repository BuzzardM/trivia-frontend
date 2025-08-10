import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, ArrowLeft, Send } from 'lucide-react';
import QuestionCard from './QuestionCard';
import { QuizResponse, Answer } from '@/types/quiz';

interface QuizInterfaceProps {
  quiz: QuizResponse;
  answers: Answer;
  loading: boolean;
  onAnswerSelect: (questionId: string, answerIndex: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function QuizInterface({
  quiz,
  answers,
  loading,
  onAnswerSelect,
  onSubmit,
  onBack,
}: QuizInterfaceProps) {
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = quiz.questions.length;
  const progress = (answeredCount / totalQuestions) * 100;

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <Card className="sticky top-4 z-10 backdrop-blur-sm bg-white/95 border-0 shadow-xl animate-slide-up mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-gray-800">
                Quiz in Progress
              </h2>
              <div className="text-lg font-bold text-gray-700">
                {answeredCount}/{totalQuestions}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress: {Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-100" />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onBack}
              className="border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button
              onClick={onSubmit}
              disabled={loading || answeredCount === 0}
              className="ml-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold transition-all duration-300"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Submit Quiz
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6 p-4">
        {quiz.questions.map((question, index) => (
          <div
            key={question.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <QuestionCard
              question={question}
              questionNumber={index + 1}
              selectedAnswer={answers[question.id]}
              onAnswerSelect={answerIndex =>
                onAnswerSelect(question.id, answerIndex)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
