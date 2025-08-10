import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  XCircle,
  Trophy,
  Star,
  Target,
  Award,
} from 'lucide-react';
import { CheckAnswersResponse, Question } from '@/types/quiz';
import { getDifficultyStyles, getScoreStyles } from '@/lib/quiz-utils';

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

  const getPerformanceLevel = (score: number) => {
    if (score >= 90)
      return {
        level: 'Outstanding!',
        icon: Trophy,
        message: "You're a trivia champion!",
      };
    if (score >= 80)
      return {
        level: 'Excellent!',
        icon: Award,
        message: 'Great knowledge and focus!',
      };
    if (score >= 70)
      return {
        level: 'Good Job!',
        icon: Target,
        message: 'Well done, keep it up!',
      };
    if (score >= 60)
      return {
        level: 'Not Bad!',
        icon: Star,
        message: 'Room for improvement!',
      };
    return {
      level: 'Keep Trying!',
      icon: Target,
      message: 'Practice makes perfect!',
    };
  };

  const performance = getPerformanceLevel(percentage);
  const PerformanceIcon = performance.icon;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
      <Card className="relative">
        <div className="absolute top-4 right-4 opacity-10">
          <PerformanceIcon className="h-16 w-16" />
        </div>

        <CardHeader className="text-center relative">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <PerformanceIcon className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-blue-600 mb-2">
            {performance.level}
          </CardTitle>
          <p className="text-muted-foreground">{performance.message}</p>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <div
              className={`text-8xl font-bold ${getScoreStyles(percentage)} drop-shadow-lg`}
            >
              {percentage}%
            </div>
            <div className="text-lg text-muted-foreground">
              {results.correct} out of {results.total} questions correct
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {results.correct}
              </div>
              <div className="text-xs text-green-700 uppercase tracking-wide">
                Correct
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {results.total - results.correct}
              </div>
              <div className="text-xs text-red-700 uppercase tracking-wide">
                Incorrect
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {results.total}
              </div>
              <div className="text-xs text-blue-700 uppercase tracking-wide">
                Total
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={onRestart}>Take Another Quiz</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-blue-600">Detailed Review</h3>
        </div>

        {results.details.map((result, index) => {
          const question = questions.find(q => q.id === result.questionId);
          if (!question) return null;

          return (
            <Card key={result.questionId}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${result.correct ? 'bg-green-100' : 'bg-red-100'}`}
                    >
                      {result.correct ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">
                        Question {index + 1}
                      </div>
                      <div
                        className={`text-sm font-medium ${result.correct ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {result.correct ? 'Correct' : 'Incorrect'}
                      </div>
                    </div>
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={`${getDifficultyStyles(question.difficulty)} capitalize font-semibold`}
                  >
                    {question.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
                  <p
                    className="font-semibold text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Answer Options:
                  </h4>
                  {question.options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === result.correctIndex;
                    const isSelected = optionIndex === result.givenIndex;

                    let bgColor = 'bg-gray-50 border-gray-200';
                    let iconColor = 'text-gray-400';

                    if (isCorrect) {
                      bgColor =
                        'bg-green-50 border-green-300 ring-1 ring-green-200';
                      iconColor = 'text-green-600';
                    } else if (isSelected && !isCorrect) {
                      bgColor = 'bg-red-50 border-red-300 ring-1 ring-red-200';
                      iconColor = 'text-red-600';
                    }

                    return (
                      <div
                        key={optionIndex}
                        className={`p-4 rounded-lg border-2 transition-all ${bgColor}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              {isCorrect && (
                                <div className="p-1 bg-green-100 rounded-full">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                              )}
                              {isSelected && !isCorrect && (
                                <div className="p-1 bg-red-100 rounded-full">
                                  <XCircle className="h-4 w-4 text-red-600" />
                                </div>
                              )}
                              {!isSelected && !isCorrect && (
                                <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                              )}
                            </div>
                            <span
                              className="font-medium text-gray-800"
                              dangerouslySetInnerHTML={{ __html: option }}
                            />
                          </div>
                          <div className="flex gap-2">
                            {isSelected && (
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-700 border-blue-200"
                              >
                                Your Choice
                              </Badge>
                            )}
                            {isCorrect && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Correct Answer
                              </Badge>
                            )}
                          </div>
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
