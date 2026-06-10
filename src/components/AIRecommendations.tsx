import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, ArrowDownCircle } from 'lucide-react';

interface RecommendationTip {
  id: string;
  title: string;
  description: string;
  impact: string;
}

interface RecommendationData {
  success: boolean;
  highestCategory: 'energy' | 'transportation' | 'lifestyle';
  title: string;
  summary: string;
  analysis: string;
  tips: RecommendationTip[];
  timestamp: string;
}

interface AIRecommendationsProps {
  isLoading: boolean;
  data: RecommendationData | null;
  error: string | null;
}

export default function AIRecommendations({ isLoading, data, error }: AIRecommendationsProps) {
  // Skeleton Loader for premium AI feel
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-eco-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-eco-200 rounded animate-pulse dark:bg-zinc-800" />
            <div className="h-5 w-32 bg-zinc-200 rounded animate-pulse dark:bg-zinc-800" />
          </div>
          <div className="h-4 w-4 bg-zinc-200 rounded animate-pulse dark:bg-zinc-800" />
        </div>
        
        {/* Executive summary skeleton */}
        <div className="space-y-2.5 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40">
          <div className="h-4 w-full bg-zinc-200 rounded animate-pulse dark:bg-zinc-800" />
          <div className="h-4 w-5/6 bg-zinc-200 rounded animate-pulse dark:bg-zinc-800" />
        </div>

        {/* Tip skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-zinc-100 rounded-xl p-4 space-y-3 dark:border-zinc-900">
              <div className="h-4 w-3/4 bg-zinc-200 rounded animate-pulse dark:bg-zinc-800" />
              <div className="space-y-1.5">
                <div className="h-3 w-full bg-zinc-200 rounded animate-pulse dark:bg-zinc-800" />
                <div className="h-3 w-full bg-zinc-200 rounded animate-pulse dark:bg-zinc-800" />
                <div className="h-3 w-2/3 bg-zinc-200 rounded animate-pulse dark:bg-zinc-800" />
              </div>
              <div className="h-5 w-24 bg-eco-100 rounded-full animate-pulse dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-6 shadow-sm dark:border-rose-950/20 dark:bg-rose-950/10">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-rose-900 dark:text-rose-400">AI Recommendations Unavailable</h4>
            <p className="text-sm text-rose-700 dark:text-rose-500 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 p-8 shadow-sm text-center dark:border-zinc-800 dark:bg-zinc-950/30">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400 dark:bg-zinc-900">
          <Sparkles className="h-5 w-5" />
        </div>
        <h4 className="mt-4 text-sm font-bold text-zinc-900 dark:text-zinc-50">AI Footprint Assessment</h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
          Input your usage details above to generate personalized AI-driven recommendation guides.
        </p>
      </div>
    );
  }

  // Get icon colors based on highest category
  const categoryColors = {
    energy: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/10 dark:text-amber-400 dark:border-amber-900/30',
    transportation: 'bg-eco-50 text-eco-600 border-eco-100 dark:bg-eco-950/10 dark:text-eco-400 dark:border-eco-900/30',
    lifestyle: 'bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-950/10 dark:text-sky-400 dark:border-sky-900/30',
  };

  const badgeColor = categoryColors[data.highestCategory] || categoryColors.energy;

  return (
    <div className="rounded-2xl border border-eco-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 space-y-6 animate-slide-up">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800 gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-eco-500 text-white shadow-sm">
            <Sparkles className="h-4.5 w-4.5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Personalized Climate Advice</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Powered by EcoTrack AI Recommendation Engine</p>
          </div>
        </div>
        
        {/* Dynamic Category Badge */}
        <span className={`inline-flex items-center gap-1 text-xxs font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
          Focus: {data.title}
        </span>
      </div>

      {/* AI Narrative Analysis Card */}
      <div className="p-4 rounded-xl border border-eco-100/50 bg-eco-50/30 text-zinc-700 dark:border-eco-900/20 dark:bg-eco-900/5 dark:text-zinc-300">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 rounded-full p-1 bg-eco-100 text-eco-700 dark:bg-eco-900/50 dark:text-eco-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-eco-800 dark:text-eco-300 block mb-0.5">AI Executive Summary</span>
            <p className="text-xs leading-relaxed">{data.analysis}</p>
          </div>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.tips.map((tip, index) => (
          <div 
            key={tip.id} 
            className="group relative flex flex-col justify-between border border-zinc-100 rounded-xl p-4 bg-white hover:border-eco-300 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:border-eco-800 transition-all shadow-xxs"
          >
            <div>
              {/* Card Badge Counter */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-zinc-400">Recommendation 0{index + 1}</span>
                <ArrowDownCircle className="h-4 w-4 text-zinc-300 group-hover:text-eco-500 transition-colors" />
              </div>

              {/* Title & Description */}
              <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-eco-600 dark:group-hover:text-eco-400 transition-colors">
                {tip.title}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                {tip.description}
              </p>
            </div>

            {/* Impact indicator */}
            <div className="mt-4 pt-3 border-t border-dashed border-zinc-100 dark:border-zinc-900">
              <span className="inline-block text-xxs font-extrabold text-eco-600 dark:text-eco-400 bg-eco-50 dark:bg-eco-900/25 px-2.5 py-0.5 rounded-md">
                {tip.impact}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
