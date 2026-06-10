import React from 'react';
import { Leaf, Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-eco-100 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-eco-500 text-white shadow-md shadow-eco-500/20">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-eco-800 dark:text-eco-200">
              EcoTrack <span className="text-eco-500">AI</span>
            </h1>
            <p className="text-xxs text-zinc-500 dark:text-zinc-400 -mt-1 font-medium">
              UN SDG 13 Climate Action Companion
            </p>
          </div>
        </div>

        {/* SDG 13 Goal Identifier */}
        <div className="flex items-center gap-2">
          <div className="hidden xs:flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-eco-600 dark:bg-eco-800/20 dark:text-eco-400 border border-eco-200/50">
            <Globe className="h-3.5 w-3.5 animate-spin-slow" style={{ animationDuration: '10s' }} />
            <span>SDG 13: Climate Action</span>
          </div>
          
          <a
            href="https://sdgs.un.org/goals/goal13"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-eco-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-eco-500 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eco-600"
          >
            Learn More
          </a>
        </div>
      </div>
    </header>
  );
}
