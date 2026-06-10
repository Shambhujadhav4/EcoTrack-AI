import React from 'react';
import { TreePine, Smartphone, Activity } from 'lucide-react';

interface StatsPanelProps {
  total: number;
}

export default function StatsPanel({ total }: StatsPanelProps) {
  // Co2 Absorption: A mature tree absorbs ~22 kg of CO2 per year, which is ~1.83 kg per month
  const treesRequired = Math.max(1, Math.round(total / 1.83));
  
  // Smartphone charges: Average smartphone charge releases ~8g (0.008 kg) of CO2
  const smartphoneCharges = Math.max(0, Math.round(total / 0.008));
  
  // Averages for comparison
  const usAverageMonthly = 1330; // 1.33 metric tons per month
  const globalAverageMonthly = 380; // 0.38 metric tons per month

  const pctOfUsAverage = Math.round((total / usAverageMonthly) * 100);
  const pctOfGlobalAverage = Math.round((total / globalAverageMonthly) * 100);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {/* Trees Equivalent Card */}
      <div className="relative overflow-hidden rounded-2xl border border-eco-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-eco-50 text-eco-600 dark:bg-eco-900/20 dark:text-eco-400">
            <TreePine className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tree Offsets Required</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {treesRequired.toLocaleString()} <span className="text-sm font-normal text-zinc-500">trees</span>
            </h3>
          </div>
        </div>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          Number of mature trees needed to absorb this amount of CO₂ in one month.
        </p>
      </div>

      {/* Smartphone Charges Card */}
      <div className="relative overflow-hidden rounded-2xl border border-eco-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/10 dark:text-amber-400">
            <Smartphone className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Smartphone Charges</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {smartphoneCharges.toLocaleString()} <span className="text-sm font-normal text-zinc-500">charges</span>
            </h3>
          </div>
        </div>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          The amount of smartphone battery charges that generate equivalent carbon emissions.
        </p>
      </div>

      {/* Comparisons Card */}
      <div className="relative overflow-hidden rounded-2xl border border-eco-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400">
            <Activity className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">National Comparisons</p>
            <div className="mt-2 space-y-2">
              {/* US Average comparison bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-zinc-600 dark:text-zinc-400">vs US Avg (1,330 kg)</span>
                  <span className={pctOfUsAverage > 100 ? 'text-rose-600' : 'text-eco-600'}>
                    {pctOfUsAverage}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 mt-1 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pctOfUsAverage > 100 ? 'bg-rose-500' : 'bg-eco-500'
                    }`}
                    style={{ width: `${Math.min(100, pctOfUsAverage)}%` }}
                  />
                </div>
              </div>

              {/* Global Average comparison bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-zinc-600 dark:text-zinc-400">vs Global Avg (380 kg)</span>
                  <span className={pctOfGlobalAverage > 100 ? 'text-rose-600' : 'text-eco-600'}>
                    {pctOfGlobalAverage}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 mt-1 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pctOfGlobalAverage > 100 ? 'bg-rose-500' : 'bg-eco-500'
                    }`}
                    style={{ width: `${Math.min(100, pctOfGlobalAverage)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
