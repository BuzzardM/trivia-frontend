'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategories } from '@/hooks/useQuiz';
import { QuizConfig } from '@/types/quiz';
import { Loader2 } from 'lucide-react';

interface QuizConfigFormProps {
  onStartQuiz: (config: QuizConfig) => void;
  loading: boolean;
}

export default function QuizConfigForm({
  onStartQuiz,
  loading,
}: QuizConfigFormProps) {
  const { categories, loading: categoriesLoading } = useCategories();
  const [config, setConfig] = useState<QuizConfig>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartQuiz(config);
  };

  const updateConfig = (
    key: keyof QuizConfig,
    value: string | number | undefined
  ) => {
    setConfig(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Configure Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Number of Questions</Label>
            <Input
              id="amount"
              type="number"
              min="1"
              max="50"
              placeholder="Random amount"
              onChange={e => updateConfig('amount', parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              onValueChange={value =>
                updateConfig(
                  'difficulty',
                  value === 'random' ? undefined : value
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="random">Random</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Question Type</Label>
            <Select
              onValueChange={value =>
                updateConfig('type', value === 'random' ? undefined : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="random">Random</SelectItem>
                <SelectItem value="multiple">Multiple Choice</SelectItem>
                <SelectItem value="boolean">True/False</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={value =>
                updateConfig(
                  'category',
                  value === 'random' ? undefined : parseInt(value)
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="random">Random</SelectItem>
                {categoriesLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                ) : (
                  categories.map(category => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: category.name }}
                      />
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Start Quiz
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
