import React, { useState, useEffect } from 'react';
import { Flame, Play, Pause, RotateCcw, Clock, Zap, Calculator, ShieldCheck, HeartPulse } from 'lucide-react';

export const FastingTimer: React.FC = () => {
  // Fasting Schedule presets in hours
  const [targetHours, setTargetHours] = useState<number>(16);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(14 * 3600 + 25 * 60); // Default to 14h 25m for rich live view
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Macro Calculator state
  const [weightLbs, setWeightLbs] = useState<number>(175);
  const [activity, setActivity] = useState<'sedentary' | 'moderate' | 'active'>('moderate');
  const [goal, setGoal] = useState<'fat_loss' | 'maintenance' | 'muscle'>('fat_loss');

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const targetSeconds = targetHours * 3600;
  const progressPercent = Math.min(100, (elapsedSeconds / targetSeconds) * 100);
  const elapsedHours = elapsedSeconds / 3600;

  // Format HH:MM:SS
  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Determine current biological stage
  const getFastingStage = (hrs: number) => {
    if (hrs < 12) {
      return {
        stage: 'Insulin & Blood Sugar Drop',
        description: 'Pancreas stops producing insulin. Blood glucose levels stabilize to baseline.',
        color: 'text-sky-400',
        badgeBg: 'bg-sky-500/10 border-sky-500/30'
      };
    } else if (hrs < 16) {
      return {
        stage: 'Glycogen Depletion & Ketosis',
        description: 'Liver empties stored glycogen. Body transitions to burning stored body fat for fuel.',
        color: 'text-amber-400',
        badgeBg: 'bg-amber-500/10 border-amber-500/30'
      };
    } else if (hrs < 18) {
      return {
        stage: 'Autophagy Initiated',
        description: 'Cells recycle old, damaged proteins and defective mitochondria. Anti-aging mode activated.',
        color: 'text-emerald-400',
        badgeBg: 'bg-emerald-500/10 border-emerald-500/30'
      };
    } else {
      return {
        stage: 'Deep Ketosis & Growth Hormone Spike',
        description: 'Human Growth Hormone (HGH) increases up to 5x. Deep visceral fat burning and brain cell repair.',
        color: 'text-teal-300',
        badgeBg: 'bg-teal-500/10 border-teal-500/30'
      };
    }
  };

  const currentStage = getFastingStage(elapsedHours);

  // Macro Calculation (Keto 70% Fat, 25% Protein, 5% Net Carbs)
  const calculateMacros = () => {
    let baseCalories = weightLbs * 11;
    if (activity === 'moderate') baseCalories += 300;
    if (activity === 'active') baseCalories += 600;
    if (goal === 'fat_loss') baseCalories -= 400;

    const fatGrams = Math.round((baseCalories * 0.70) / 9);
    const proteinGrams = Math.round((baseCalories * 0.25) / 4);
    const netCarbGrams = Math.min(20, Math.round((baseCalories * 0.05) / 4));

    return { calories: baseCalories, fatGrams, proteinGrams, netCarbGrams };
  };

  const macros = calculateMacros();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-slate-100 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-extrabold uppercase tracking-widest border border-amber-500/30">
          <Flame className="w-4 h-4 text-amber-400" />
          Dr. Berg Autophagy & Fasting Tracker
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Real-Time Intermittent Fasting Clock
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Fasting lowers insulin — the master fat-storage hormone. Track your precise biological state as your body switches from sugar burning to deep fat burning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Fasting Clock & Controls */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* Preset Buttons */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Select Fasting Protocol</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { hours: 16, label: '16:8 Standard' },
                { hours: 18, label: '18:6 Advanced' },
                { hours: 20, label: '20:4 Warrior' },
                { hours: 23, label: '23:1 OMAD' }
              ].map(item => (
                <button
                  key={item.hours}
                  onClick={() => {
                    setTargetHours(item.hours);
                    setElapsedSeconds(0);
                    setIsRunning(true);
                  }}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    targetHours === item.hours
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Circular Progress & Clock Display */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* SVG Ring */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  stroke="#1e293b"
                  strokeWidth="14"
                  fill="transparent"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  stroke="url(#fasting-gradient)"
                  strokeWidth="14"
                  strokeDasharray="691"
                  strokeDashoffset={691 - (691 * progressPercent) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="fasting-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Time Display Inside Ring */}
              <div className="absolute text-center space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Elapsed Fast</span>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
                  {formatTime(elapsedSeconds)}
                </div>
                <div className="text-xs text-emerald-400 font-bold">
                  {Math.round(progressPercent)}% of {targetHours}h Target
                </div>
              </div>
            </div>

            {/* Timer Control Buttons */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all cursor-pointer ${
                  isRunning 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Pause Fast' : 'Resume Fast'}
              </button>

              <button
                onClick={() => {
                  setElapsedSeconds(0);
                  setIsRunning(false);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm border border-slate-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>

          {/* Biological Stage Breakdown */}
          <div className={`p-5 rounded-2xl border ${currentStage.badgeBg} space-y-2`}>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Zap className={`w-4 h-4 ${currentStage.color}`} />
              <span>Current Cellular State (Hour {Math.floor(elapsedHours)})</span>
            </div>
            <h3 className={`text-lg font-extrabold ${currentStage.color}`}>{currentStage.stage}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{currentStage.description}</p>
          </div>

        </div>

        {/* Right Column: Dr. Berg Healthy Keto Macro Calculator */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">Healthy Keto® Macro Calculator</h3>
          </div>

          <p className="text-xs text-slate-400">
            Dr. Berg recommends getting 70% of calories from healthy fats, 20-25% from protein, and keeping Net Carbs below 20g daily.
          </p>

          <div className="space-y-4">
            {/* Body Weight Input */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Body Weight (lbs)</label>
              <input
                type="number"
                value={weightLbs}
                onChange={(e) => setWeightLbs(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Activity Level */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Daily Activity Level</label>
              <select
                value={activity}
                onChange={(e: any) => setActivity(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white font-medium px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="sedentary">Sedentary (Desk Job, low movement)</option>
                <option value="moderate">Moderate (Light workouts 3x/week)</option>
                <option value="active">Very Active (Heavy workouts / physical labor)</option>
              </select>
            </div>

            {/* Goal */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Primary Goal</label>
              <select
                value={goal}
                onChange={(e: any) => setGoal(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white font-medium px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="fat_loss">Fat Loss & Insulin Sensitizing</option>
                <option value="maintenance">Health Maintenance & Autophagy</option>
              </select>
            </div>
          </div>

          {/* Macro Breakdown Result Box */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Your Daily Target ({macros.calories} Calories)</div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 block font-semibold">Healthy Fat</span>
                <span className="text-lg font-black text-amber-400">{macros.fatGrams}g</span>
                <span className="text-[10px] text-slate-500 block">70% Calories</span>
              </div>

              <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 block font-semibold">Protein</span>
                <span className="text-lg font-black text-teal-300">{macros.proteinGrams}g</span>
                <span className="text-[10px] text-slate-500 block">25% Calories</span>
              </div>

              <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 block font-semibold">Net Carbs</span>
                <span className="text-lg font-black text-emerald-400">&lt; {macros.netCarbGrams}g</span>
                <span className="text-[10px] text-slate-500 block">5% Calories</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 leading-relaxed">
              <span className="font-bold">Dr. Berg Golden Rule:</span> Always include 7-10 cups of raw organic leafy greens or salad daily. Salad carbs contain zero net impact due to high potassium & fiber.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
