export interface CreateQuoteRequest {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  projectType: string;
  budget?: string;
  contactMethod: string;
  message: string;
  images?: File[];
}