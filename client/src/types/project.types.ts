export interface ProjectSpec {
  challenge: string;
  solution: string;
  architecture: string;
  performance: string;
  tech: string[];
  impact: string;
}

export interface ProjectItem {
  _id: string;
  title: string;
  subtitle: string;
  category: string;
  desc: string;
  imageMockup: string;
  specs: ProjectSpec;
  createdAt?: string;
  updatedAt?: string;
}
export interface AchievementItem {
  _id: string;
  title: string;
  desc: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
}
