
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
  tutorial?: string;
  rating?: number;
  useCount?: number;
  isPremium?: boolean;
  status?: 'active' | 'inactive';
}

export interface UsageMetric {
  toolId: string;
  timestamp: number;
  action: 'use' | 'download' | 'copy' | 'share';
  device: string;
  location?: string;
}

export interface ToolConfig {
  id: string;
  status: 'active' | 'inactive';
  isPremium: boolean;
  visibility: string[]; // e.g., ['US', 'EU', 'ALL']
}
