import { NextResponse } from 'next/server';
import { getPrayerSchedule, calculateNextPrayer } from '@/lib/api/kemenag';

export const revalidate = 43200; // 12 hours revalidation

export async function GET() {
  try {
    const schedule = await getPrayerSchedule();
    const nextInfo = calculateNextPrayer(schedule);

    return NextResponse.json({
      success: true,
      schedule,
      nextInfo,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prayer schedule' },
      { status: 500 }
    );
  }
}
