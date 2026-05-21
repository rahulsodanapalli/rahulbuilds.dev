export interface ExperienceItem {
  _id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  details: string[];
  tech: string[];
  createdAt?: string;
  updatedAt?: string;
}
