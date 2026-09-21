import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Standard utility combining clsx and tailwind-merge for safe className concatenation
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Indonesian Rupiah currency formatter (e.g., 1500000 -> "Rp 1.500.000")
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace(/\s+/g, ' ');
}

/**
 * Indonesian date formatter with date-fns
 */
export function formatDateIndo(date: Date | string, formatPattern: string = 'EEEE, d MMMM yyyy'): string {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, formatPattern, { locale: id });
  } catch {
    return String(date);
  }
}

/**
 * Generate standard WhatsApp click-to-chat URL for DKM or UMKM
 * Cleans phone numbers (e.g. 0812... -> 62812...)
 */
export function getWhatsAppUrl(phone: string, message: string = ''): string {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleaned}${encodedMsg ? `?text=${encodedMsg}` : ''}`;
}

/**
 * Parse time string "04:32" or "04:32:00" into normalized HH:mm
 */
export function normalizePrayerTime(timeStr: string): string {
  if (!timeStr) return '--:--';
  const parts = timeStr.trim().split(':');
  if (parts.length >= 2) {
    return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
  }
  return timeStr;
}
