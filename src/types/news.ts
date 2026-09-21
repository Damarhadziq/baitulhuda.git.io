export type NewsCategory = 'warta' | 'lelayu' | 'kajian' | 'kegiatan' | 'laporan-kas';

export interface NewsItem {
  id: string;
  title: string;
  category: NewsCategory;
  date: string;
  author: string;
  summary: string;
  content?: string;
  imageUrl?: string;
  isUrgent?: boolean; // For duka cita / lelayu emergency announcements
  deceasedName?: string; // Specific for lelayu
  funeralInfo?: string; // Specific for lelayu
  waShareText?: string;
}
