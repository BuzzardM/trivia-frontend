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
import { Loader2, Shuffle, Target, FileText, TrueOrFalse } from 'lucide-react';

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
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Configure Your Quiz
          </CardTitle>
          <p className="text-muted-foreground text-sm text-center">
            Customize your trivia experience
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="amount"
                className="text-sm font-semibold text-gray-700"
              >
                Number of Questions
              </Label>
              <Input
                id="amount"
                type="number"
                min="1"
                max="50"
                placeholder="Random amount"
                onChange={e => updateConfig('amount', parseInt(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty for random amount
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="difficulty"
                className="text-sm font-semibold text-gray-700"
              >
                Difficulty Level
              </Label>
              <Select
                onValueChange={value =>
                  updateConfig(
                    'difficulty',
                    value === 'random' ? undefined : value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose your challenge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">
                    <div className="flex items-center gap-2">
                      <Shuffle className="h-4 w-4" />
                      Random
                    </div>
                  </SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="type"
                className="text-sm font-semibold text-gray-700"
              >
                Question Type
              </Label>
              <Select
                onValueChange={value =>
                  updateConfig('type', value === 'random' ? undefined : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pick your format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">
                    <div className="flex items-center gap-2">
                      <Shuffle className="h-4 w-4" />
                      Random
                    </div>
                  </SelectItem>
                  <SelectItem value="multiple">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Multiple Choice
                    </div>
                  </SelectItem>
                  <SelectItem value="boolean">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      True/False
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-sm font-semibold text-gray-700"
              >
                Category
              </Label>
              <Select
                onValueChange={value =>
                  updateConfig(
                    'category',
                    value === 'random' ? undefined : parseInt(value)
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose your topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">
                    <div className="flex items-center gap-2">
                      <Shuffle className="h-4 w-4" />
                      Random
                    </div>
                  </SelectItem>
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
    </div>
  );
}
