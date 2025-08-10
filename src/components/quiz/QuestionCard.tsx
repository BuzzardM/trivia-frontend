import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Question } from '@/types/quiz';

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
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Question {questionNumber}</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">{question.difficulty}</Badge>
            <Badge
              variant="secondary"
              dangerouslySetInnerHTML={{ __html: question.category }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p
          className="text-lg font-medium"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />

        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={value => onAnswerSelect(parseInt(value))}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                value={index.toString()}
                id={`${question.id}-${index}`}
              />
              <Label
                htmlFor={`${question.id}-${index}`}
                className="flex-1 cursor-pointer"
                dangerouslySetInnerHTML={{ __html: option }}
              />
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
