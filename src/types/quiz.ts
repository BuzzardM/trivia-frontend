export interface Category {
  id: number;
  name: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  category: string;
  difficulty: string;
}

export interface QuizResponse {
  sessionId: string;
  questions: Question[];
}

export interface QuizConfig {
  amount?: number;
  difficulty?: string;
  type?: string;
  category?: number;
}

export interface Answer {
  [questionId: string]: number;
}

export interface ResultDetail {
  questionId: string;
  correct: boolean;
  correctIndex: number;
  givenIndex: number;
}

export interface CheckAnswersResponse {
  sessionId: string;
  total: number;
  correct: number;
  details: ResultDetail[];
}
