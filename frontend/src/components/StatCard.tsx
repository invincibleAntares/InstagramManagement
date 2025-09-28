'use client';

import { StatCardProps } from '@/types';
import { formatNumber } from '@/lib/utils';

export function StatCard({ label, value, icon, format = 'compact' }: StatCardProps) {
  const formattedValue = formatNumber(value, format === 'compact');

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{formattedValue}</p>
        </div>
        {icon && (
          <div className="flex-shrink-0 text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
