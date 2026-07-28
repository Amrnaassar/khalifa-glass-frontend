export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  photo?: string | null;
  createdAt: string;
}