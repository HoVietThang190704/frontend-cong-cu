"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export type SimpleBarChartProps = React.SVGAttributes<SVGElement> & {
  data: Array<number>;
  height?: number;
  barColor?: string;
  gap?: number;
};

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, height = 80, barColor = '#60a5fa', gap = 8, className, ...props }) => {
  const max = Math.max(...data, 1);
  const width = (data.length * 10) + ((data.length - 1) * gap);
  const barWidth = 10;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className={cn(className)} {...props}>
      {data.map((val, idx) => {
        const h = (val / max) * (height - 10);
        const x = idx * (barWidth + gap);
        const y = height - h;
        return <rect key={idx} x={x} y={y} width={barWidth} height={h} fill={barColor} rx={2} />;
      })}
    </svg>
  );
};

SimpleBarChart.displayName = 'SimpleBarChart';

export default SimpleBarChart;
