export interface Quote {

  id: string;

  userId: string;

  fullName: string;

  email: string;

  phone: string;

  location: string;

  service: string;

  projectType: string;

  budget: string;

  contactMethod: string;

  message: string;

  imagePaths: string | null;

  status: number;

  createdAt: string;

  expiresAt: string;

}