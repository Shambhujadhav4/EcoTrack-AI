'use client';

import React, { useState, useEffect } from 'react';
import { EmissionInputs } from '../utils/calculator';
import { Zap, Car, Sparkles } from 'lucide-react';

interface InputFormProps {
  onChange: (inputs: EmissionInputs) => void;
}

type TabType = 'energy' | 'transportation' | 'lifestyle';

export default function InputForm({ onChange }: InputFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>('energy');

  // Local state for all inputs
  const [inputs, setInputs] = useState<EmissionInputs>({
    electricity: 450,       // kWh default
    naturalGas: 45,         // Therms default
    milesDriven: 800,       // miles default
    vehicleMpg: 25,         // MPG default
    isEv: false,            // EV flag default
    dietType: 'balanced',   // Diet default
    weeklyFlights: 0,       // Flights default
  });

  // Notify parent on any input change
  useEffect(() => {
    onChange(inputs);
  }, [inputs, onChange]);

  const handleInputChange = (name: keyof EmissionInputs, value: string | number | boolean) => {
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const tabs = [
    { id: 'energy' as TabType, label: 'Energy', icon: Zap, colorClass: 'text-amber-500' },
    { id: 'transportation' as TabType, label: 'Transportation', icon: Car, colorClass: 'text-eco-500' },
    { id: 'lifestyle' as TabType, label: 'Lifestyle', icon: Sparkles, colorClass: 'text-sky-500' },
  ];

  return (
    <div className="rounded-2xl border border-eco-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      {/* Form Tabs Navigation */}
      <div className="border-b border-zinc-100 dark:border-zinc-800 flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-bold border-b-2 transition-all ${
                isActive
                  ? 'border-eco-500 text-eco-600 dark:text-eco-400 bg-eco-50/20 dark:bg-eco-900/10'
                  : 'border-transparent text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? tab.colorClass : 'text-zinc-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panel */}
      <div className="p-6">
        {/* ENERGY TAB */}
        {activeTab === 'energy' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-dashed border-zinc-100 pb-3 dark:border-zinc-800">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-500" /> Household Energy
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Enter your average monthly electricity and heating fuel usage.
              </p>
            </div>

            {/* Electricity (kWh) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Electricity (kWh)</label>
                <input
                  type="number"
                  min="0"
                  max="5000"
                  value={inputs.electricity}
                  onChange={(e) => handleInputChange('electricity', Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-20 rounded-lg border border-zinc-200 px-2 py-1 text-right text-xs font-semibold focus:border-eco-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="25"
                value={inputs.electricity}
                onChange={(e) => handleInputChange('electricity', parseInt(e.target.value))}
                className="w-full h-1.5 rounded-full bg-zinc-100 appearance-none cursor-pointer dark:bg-zinc-800"
              />
              <div className="flex justify-between text-xxs text-zinc-400 font-medium">
                <span>0 kWh</span>
                <span>Average (450 kWh)</span>
                <span>2,000+ kWh</span>
              </div>
            </div>

            {/* Natural Gas (Therms) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Natural Gas (Therms)</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={inputs.naturalGas}
                  onChange={(e) => handleInputChange('naturalGas', Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-20 rounded-lg border border-zinc-200 px-2 py-1 text-right text-xs font-semibold focus:border-eco-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </div>
              <input
                type="range"
                min="0"
                max="250"
                step="5"
                value={inputs.naturalGas}
                onChange={(e) => handleInputChange('naturalGas', parseInt(e.target.value))}
                className="w-full h-1.5 rounded-full bg-zinc-100 appearance-none cursor-pointer dark:bg-zinc-800"
              />
              <div className="flex justify-between text-xxs text-zinc-400 font-medium">
                <span>0 Therms</span>
                <span>Average (45 Therms)</span>
                <span>250+ Therms</span>
              </div>
            </div>
          </div>
        )}

        {/* TRANSPORTATION TAB */}
        {activeTab === 'transportation' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-dashed border-zinc-100 pb-3 dark:border-zinc-800 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                  <Car className="h-4 w-4 text-eco-500" /> Commuting & Travel
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Adjust miles driven monthly and specify fuel efficiency.
                </p>
              </div>

              {/* EV Mode Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.isEv}
                  onChange={(e) => handleInputChange('isEv', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-eco-600" />
                <span className="ml-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">EV Mode</span>
              </label>
            </div>

            {/* Monthly Miles */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Miles Driven / Month</label>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  value={inputs.milesDriven}
                  onChange={(e) => handleInputChange('milesDriven', Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-20 rounded-lg border border-zinc-200 px-2 py-1 text-right text-xs font-semibold focus:border-eco-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </div>
              <input
                type="range"
                min="0"
                max="3000"
                step="50"
                value={inputs.milesDriven}
                onChange={(e) => handleInputChange('milesDriven', parseInt(e.target.value))}
                className="w-full h-1.5 rounded-full bg-zinc-100 appearance-none cursor-pointer dark:bg-zinc-800"
              />
              <div className="flex justify-between text-xxs text-zinc-400 font-medium">
                <span>0 miles</span>
                <span>Average (900 mi)</span>
                <span>3,000+ miles</span>
              </div>
            </div>

            {/* MPG (Only shown if NOT an EV) */}
            <div className={`space-y-2 transition-all duration-300 ${inputs.isEv ? 'opacity-40 pointer-events-none' : ''}`}>
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Vehicle MPG {inputs.isEv && <span className="text-xxs font-normal text-eco-600">(EV charging factor used)</span>}
                </label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  disabled={inputs.isEv}
                  value={inputs.isEv ? '' : inputs.vehicleMpg}
                  onChange={(e) => handleInputChange('vehicleMpg', Math.max(5, parseInt(e.target.value) || 0))}
                  className="w-20 rounded-lg border border-zinc-200 px-2 py-1 text-right text-xs font-semibold focus:border-eco-500 focus:outline-none disabled:bg-zinc-50 disabled:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:disabled:bg-zinc-950"
                />
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="1"
                disabled={inputs.isEv}
                value={inputs.isEv ? 25 : inputs.vehicleMpg}
                onChange={(e) => handleInputChange('vehicleMpg', parseInt(e.target.value))}
                className="w-full h-1.5 rounded-full bg-zinc-100 appearance-none cursor-pointer dark:bg-zinc-800 disabled:cursor-not-allowed"
              />
              <div className="flex justify-between text-xxs text-zinc-400 font-medium">
                <span>10 MPG</span>
                <span>Average (25 MPG)</span>
                <span>60 MPG</span>
              </div>
            </div>
          </div>
        )}

        {/* LIFESTYLE TAB */}
        {activeTab === 'lifestyle' && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-dashed border-zinc-100 pb-3 dark:border-zinc-800">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-sky-500" /> Lifestyle Choices
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Food habits and airline travel influence environmental output significantly.
              </p>
            </div>

            {/* Diet Type */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Dietary Pattern</label>
              <select
                value={inputs.dietType}
                onChange={(e) => handleInputChange('dietType', e.target.value)}
                className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold bg-white text-zinc-800 focus:border-eco-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              >
                <option value="meat-heavy">🍖 Meat-heavy (high impact)</option>
                <option value="balanced">🥗 Balanced / Average</option>
                <option value="vegetarian">🧀 Vegetarian</option>
                <option value="vegan">🌱 Vegan (low impact)</option>
              </select>
            </div>

            {/* Weekly Flights */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Flights / Week (Avg)</label>
                <input
                  type="number"
                  min="0"
                  max="15"
                  value={inputs.weeklyFlights}
                  onChange={(e) => handleInputChange('weeklyFlights', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-20 rounded-lg border border-zinc-200 px-2 py-1 text-right text-xs font-semibold focus:border-eco-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="0.5"
                value={inputs.weeklyFlights}
                onChange={(e) => handleInputChange('weeklyFlights', parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-full bg-zinc-100 appearance-none cursor-pointer dark:bg-zinc-800"
              />
              <div className="flex justify-between text-xxs text-zinc-400 font-medium">
                <span>0 flights</span>
                <span>1 flight/wk</span>
                <span>8+ flights/wk</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
