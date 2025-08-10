import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';
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
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Quiz in Progress</h2>
            <span className="text-sm text-muted-foreground">
              {answeredCount} of {totalQuestions} answered
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
          <div className="flex gap-2">
            <Button variant="outline" onClick={onBack}>
              Back to Config
            </Button>
            <Button
              onClick={onSubmit}
              disabled={loading || answeredCount === 0}
              className="ml-auto"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Quiz ({answeredCount} answers)
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {quiz.questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionNumber={index + 1}
            selectedAnswer={answers[question.id]}
            onAnswerSelect={answerIndex =>
              onAnswerSelect(question.id, answerIndex)
            }
          />
        ))}
      </div>
    </div>
  );
}
