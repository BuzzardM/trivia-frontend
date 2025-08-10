import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { CheckAnswersResponse, Question } from '@/types/quiz';

interface QuizResultsProps {
  results: CheckAnswersResponse;
  questions: Question[];
  onRestart: () => void;
}

export default function QuizResults({
  results,
  questions,
  onRestart,
}: QuizResultsProps) {
  const percentage = Math.round((results.correct / results.total) * 100);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className={`text-6xl font-bold ${getScoreColor(percentage)}`}>
            {percentage}%
          </div>
          <p className="text-lg text-muted-foreground">
            You got {results.correct} out of {results.total} questions correct
          </p>
          <Button onClick={onRestart}>Take Another Quiz</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Detailed Results</h3>
        {results.details.map((result, index) => {
          const question = questions.find(q => q.id === result.questionId);
          if (!question) return null;

          return (
            <Card key={result.questionId}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {result.correct ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    Question {index + 1}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p
                  className="font-medium"
                  dangerouslySetInnerHTML={{ __html: question.question }}
                />

                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === result.correctIndex;
                    const isSelected = optionIndex === result.givenIndex;

                    let bgColor = '';
                    if (isCorrect) bgColor = 'bg-green-100 border-green-300';
                    else if (isSelected && !isCorrect)
                      bgColor = 'bg-red-100 border-red-300';

                    return (
                      <div
                        key={optionIndex}
                        className={`p-2 rounded border ${bgColor}`}
                      >
                        <div className="flex items-center gap-2">
                          {isCorrect && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                          {isSelected && !isCorrect && (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span dangerouslySetInnerHTML={{ __html: option }} />
                          {isSelected && (
                            <Badge variant="outline" className="ml-auto">
                              Your answer
                            </Badge>
                          )}
                          {isCorrect && (
                            <Badge
                              variant="outline"
                              className="ml-auto bg-green-50"
                            >
                              Correct
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
