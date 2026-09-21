export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      news: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          category: string;
          summary: string;
          content: string | null;
          image_url: string | null;
          is_urgent: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          category: string;
          summary: string;
          content?: string | null;
          image_url?: string | null;
          is_urgent?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          category?: string;
          summary?: string;
          content?: string | null;
          image_url?: string | null;
          is_urgent?: boolean;
        };
      };
      treasury: {
        Row: {
          id: string;
          created_at: string;
          date: string;
          type: 'in' | 'out';
          amount: number;
          category: string;
          description: string;
          receipt_url: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          date: string;
          type: 'in' | 'out';
          amount: number;
          category: string;
          description: string;
          receipt_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          date?: string;
          type?: 'in' | 'out';
          amount?: number;
          category?: string;
          description?: string;
          receipt_url?: string | null;
        };
      };
      umkm: {
        Row: {
          id: string;
          name: string;
          owner: string;
          category: string;
          description: string;
          phone: string;
          location: string;
          image_url: string | null;
          is_active: boolean;
        };
      };
    };
  };
}
