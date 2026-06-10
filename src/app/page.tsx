'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import InputForm from '../components/InputForm';
import EmissionChart from '../components/EmissionChart';
import StatsPanel from '../components/StatsPanel';
import AIRecommendations from '../components/AIRecommendations';
import { calculateEmissions, EmissionInputs, EmissionResult } from '../utils/calculator';
import { Sparkles, HelpCircle } from 'lucide-react';

export default function Home() {
  // 1. Core State
  const [result, setResult] = useState<EmissionResult>({
    energy: 0,
    transportation: 0,
    lifestyle: 0,
    total: 0,
    highestCategory: 'energy',
  });

  // 2. AI Recommendations State
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
  const [recommendations, setRecommendations] = useState<RecommendationData | null>(null);
  const [isLoadingRecs, setIsLoadingRecs] = useState<boolean>(false);
  const [recsError, setRecsError] = useState<string | null>(null);

  // Calculate emissions whenever inputs change
  const handleInputChange = useCallback((newInputs: EmissionInputs) => {
    const calculated = calculateEmissions(newInputs);
    setResult(calculated);
    if (calculated.total === 0) {
      setRecommendations(null);
      setIsLoadingRecs(false);
    } else {
      setIsLoadingRecs(true);
    }
  }, []);

  // Destructure primitive values for dependency tracking
  const { total, highestCategory, energy, transportation, lifestyle } = result;

  // Debounce API calls to the AI recommendation engine
  useEffect(() => {
    if (total === 0) {
      return;
    }

    const debounceHandler = setTimeout(async () => {
      try {
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total,
            highestCategory,
            energy,
            transportation,
            lifestyle,
          }),
        });

        if (!response.ok) {
          throw new Error('Server responded with an error');
        }

        const data = await response.json();
        if (data.success) {
          setRecommendations(data);
          setRecsError(null);
        } else {
          setRecsError(data.error || 'Failed to fetch suggestions');
        }
      } catch (err) {
        console.error('API Error:', err);
        setRecsError('Could not connect to the AI recommendation service. Please try again.');
      } finally {
        setIsLoadingRecs(false);
      }
    }, 600); // 600ms debounce

    return () => clearTimeout(debounceHandler);
  }, [total, highestCategory, energy, transportation, lifestyle]); // Re-fetch if footprint changes or category shifts

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/50 dark:bg-zinc-950/20">
      {/* Navigation Header */}
      <Header />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Welcome / Intro Banner */}
        <section className="rounded-3xl bg-gradient-to-r from-eco-600 to-eco-800 p-6 sm:p-8 text-white shadow-md shadow-eco-800/10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 text-xxs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-md">
              <Sparkles className="h-3 w-3" /> AI-Guided Climate Action
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
              Track & Reduce Your Carbon Footprint
            </h2>
            <p className="mt-2 text-sm sm:text-base text-eco-100 font-medium">
              Join the fight against global warming under UN Sustainable Development Goal 13 (Climate Action). Input your monthly usage details, analyze your personal impact, and let our AI recommendations guide your transition to a low-carbon lifestyle.
            </p>
          </div>
        </section>

        {/* Dashboard Grid (Inputs & Chart) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <InputForm onChange={handleInputChange} />
          </div>

          {/* Visualization Panel (7 cols) */}
          <div className="lg:col-span-7">
            <EmissionChart
              energy={result.energy}
              transportation={result.transportation}
              lifestyle={result.lifestyle}
              total={result.total}
            />
          </div>
        </div>

        {/* Equivalency and National Comparison Stats */}
        {result.total > 0 && (
          <section className="animate-slide-up">
            <div className="mb-3 flex items-center gap-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Environmental Equivalence
              </h3>
              <div className="group relative">
                <HelpCircle className="h-3.5 w-3.5 text-zinc-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-lg bg-zinc-950 p-2 text-xxs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-zinc-800">
                  Equivalent carbon values are calculated using estimates from the US EPA Green Greenhouse Gas Equivalencies Calculator.
                </div>
              </div>
            </div>
            <StatsPanel total={result.total} />
          </section>
        )}

        {/* AI Recommendations Module */}
        <section className="pt-2">
          <AIRecommendations
            isLoading={isLoadingRecs}
            data={recommendations}
            error={recsError}
          />
        </section>
      </main>

      {/* App Footer */}
      <footer className="mt-12 border-t border-zinc-150 py-6 text-center text-xs font-semibold text-zinc-400 dark:border-zinc-900 bg-white dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} EcoTrack AI. Committed to UN SDG 13 (Climate Action).</p>
          <p className="text-xxs">Data estimations modeled from EPA standard emissions coefficients.</p>
        </div>
      </footer>
    </div>
  );
}
