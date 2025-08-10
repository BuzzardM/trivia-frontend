import {
  Category,
  QuizConfig,
  QuizResponse,
  Answer,
  CheckAnswersResponse,
} from '@/types/quiz';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

class QuizService {
  private async fetchApi<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  async getCategories(): Promise<{ categories: Category[] }> {
    return this.fetchApi('/v1/quiz/categories');
  }

  async getQuestions(config: QuizConfig): Promise<QuizResponse> {
    const params = new URLSearchParams();

    if (config.amount) params.append('amount', config.amount.toString());
    if (config.difficulty) params.append('difficulty', config.difficulty);
    if (config.type) params.append('type', config.type);
    if (config.category) params.append('category', config.category.toString());

    const queryString = params.toString();
    const endpoint = `/v1/quiz/questions${queryString ? `?${queryString}` : ''}`;

    return this.fetchApi(endpoint);
  }

  async checkAnswers(
    sessionId: string,
    answers: Answer
  ): Promise<CheckAnswersResponse> {
    return this.fetchApi('/v1/quiz/check-answers', {
      method: 'POST',
      body: JSON.stringify({
        sessionId,
        answers,
      }),
    });
  }
}

export const quizService = new QuizService();
