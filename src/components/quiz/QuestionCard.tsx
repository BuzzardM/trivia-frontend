import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Question } from '@/types/quiz';
import { getDifficultyStyles } from '@/lib/quiz-utils';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer?: number;
  onAnswerSelect: (answerIndex: number) => void;
}

export default function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerSelect,
}: QuestionCardProps) {
  return (
    <Card
      className={`w-full backdrop-blur-sm bg-white/90 border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${selectedAnswer !== undefined ? 'ring-2 ring-blue-500/20 bg-blue-50/50' : ''}`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold text-gray-800">
              Question {questionNumber}
            </CardTitle>
            {selectedAnswer !== undefined && (
              <div className="inline-flex items-center gap-2 text-xs text-blue-600 font-medium">
                <Check className="h-3 w-3" />
                Answered
              </div>
            )}
          </div>
          <div className="flex gap-2 items-start">
            <Badge
              variant="outline"
              className={`${getDifficultyStyles(question.difficulty)} capitalize font-medium`}
            >
              {question.difficulty}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 border-gray-200"
              dangerouslySetInnerHTML={{ __html: question.category }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
          <p
            className="text-lg font-semibold text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: question.question }}
          />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Choose your answer:
          </h4>
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={value => onAnswerSelect(parseInt(value))}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`${question.id}-${index}`}
                  className={selectedAnswer === index ? 'text-blue-600' : ''}
                />
                <Label
                  htmlFor={`${question.id}-${index}`}
                  className="flex-1 cursor-pointer text-gray-700 font-medium"
                  dangerouslySetInnerHTML={{ __html: option }}
                />
                {selectedAnswer === index && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
