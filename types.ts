
export type ToolCategory = 'AI' | 'Media' | 'Developer' | 'Utility' | 'Text' | 'Social';

export interface Tool {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
  category: ToolCategory;
  component: React.ComponentType;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export interface UsageMetric {
  toolId: string;
  timestamp: number;
  action: 'use' | 'download' | 'copy';
}

export interface AdminSettings {
  featuredTools: string[];
  bannerAdUrl?: string;
  premiumEnabled: boolean;
}
