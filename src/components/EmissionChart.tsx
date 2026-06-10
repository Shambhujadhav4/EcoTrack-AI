'use client';

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';

interface EmissionChartProps {
  energy: number;
  transportation: number;
  lifestyle: number;
  total: number;
}

const COLORS = {
  energy: '#2e7d32',        // Forest Green
  transportation: '#8d6e63',  // Earth Soil Brown
  lifestyle: '#0284c7',     // Accent Sky Blue
};

interface ChartDataEntry {
  name: string;
  value: number;
  color: string;
  key: 'energy' | 'transportation' | 'lifestyle';
}

interface ActiveShapeProps {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: {
    name: string;
  };
  percent: number;
}

const renderActiveShape = (props: ActiveShapeProps) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  return (
    <g>
      <text x={cx} y={cy - 8} dy={8} textAnchor="middle" fill="#71717a" className="text-xs font-semibold uppercase tracking-wider">
        {payload.name}
      </text>
      <text x={cx} y={cy + 14} dy={8} textAnchor="middle" fill="#18181b" className="text-lg font-bold dark:fill-zinc-50">
        {Math.round(percent * 100)}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 11}
        fill={fill}
      />
    </g>
  );
};

export default function EmissionChart({ energy, transportation, lifestyle, total }: EmissionChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PieComponent = Pie as any;

  const allData: ChartDataEntry[] = [
    { name: 'Energy', value: energy, color: COLORS.energy, key: 'energy' },
    { name: 'Transportation', value: transportation, color: COLORS.transportation, key: 'transportation' },
    { name: 'Lifestyle', value: lifestyle, color: COLORS.lifestyle, key: 'lifestyle' },
  ];
  const data = allData.filter(item => item.value > 0); // Don't show 0 value slices

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-eco-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 lg:h-full">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Carbon Breakdown</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Visualizing your monthly greenhouse gas emissions in kg CO₂ equivalent.
        </p>
      </div>

      {total === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
          <div className="h-16 w-16 rounded-full bg-zinc-50 flex items-center justify-center dark:bg-zinc-900">
            🌱
          </div>
          <p className="mt-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">No data inputted yet</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Emissions will appear once you input values in the form.</p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col sm:flex-row items-center justify-center gap-6">
          {/* Chart Container */}
          <div className="relative h-64 w-64 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  formatter={(value: unknown) => [`${Number(value || 0).toLocaleString()} kg CO₂`, 'Emissions']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    border: '1px solid #e2f3e8',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  }}
                />
                <PieComponent
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  isAnimationActive={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="stroke-white dark:stroke-zinc-950 stroke-2" />
                  ))}
                </PieComponent>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Table Breakdown */}
          <div className="flex-1 w-full space-y-4">
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {data.map((entry) => {
                const percentage = total > 0 ? Math.round((entry.value / total) * 100) : 0;
                return (
                  <div
                    key={entry.key}
                    className={`flex items-center justify-between py-2.5 transition-colors cursor-pointer rounded-lg px-2 -mx-2 ${
                      data[activeIndex]?.key === entry.key
                        ? 'bg-zinc-50 dark:bg-zinc-900/40'
                        : 'hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20'
                    }`}
                    onMouseEnter={() => {
                      const idx = data.findIndex(d => d.key === entry.key);
                      if (idx !== -1) setActiveIndex(idx);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3.5 w-3.5 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        {entry.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                        {entry.value.toLocaleString()} <span className="text-xxs font-normal text-zinc-500">kg</span>
                      </p>
                      <p className="text-xxs font-medium text-zinc-400">
                        {percentage}% of total
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Footer */}
            <div className="pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Total Footprint</span>
              <span className="text-base font-extrabold text-eco-600 dark:text-eco-400">
                {total.toLocaleString()} kg CO₂/mo
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
