// Interface for typing post data
export interface Post {
    id: number;
    title: string;
    summary: string;
    author?: {
      name: string;
    };
    publishDate?: string; 
    categories?: { name: string }[]; 
  }