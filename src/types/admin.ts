export type User = {
  id: number;
  username: string;
  created_at: string;
  updated_at: string;
};

export type ServerErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
};
