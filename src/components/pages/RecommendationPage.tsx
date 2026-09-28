import React, { useState } from 'react';
import { FoodProperties, StorageConditions, PackagingRequirements, RecommendationResult } from '../../types/packaging';
import { COMMODITY_PRESETS } from '../../data/commodities';
import { runRecommendationEngine } from '../../services/recommendationEngine';
import { Step1Commodity } from '../recommendation/Step1Commodity';
import { Step2Properties } from '../recommendation/Step2Properties';
import { Step3Storage } from '../recommendation/Step3Storage';
import { Step4Priorities } from '../recommendation/Step4Priorities';
import { AnalysisScreen } from '../recommendation/AnalysisScreen';
import { ResultView } from '../recommendation/ResultView';
import { Check, Sparkles, Activity, Truck, Sliders } from 'lucide-react';

interface RecommendationPageProps {
  onViewTraceability: (result: RecommendationResult) => void;
  onSaveToHistory: (result: RecommendationResult) => void;
  presetDemo?: boolean;
}

export const RecommendationPage: React.FC<RecommendationPageProps> = ({
  onViewTraceability,
  onSaveToHistory,
  presetDemo = false
}) => {
  const mangoPreset = COMMODITY_PRESETS[0];

  const [currentStep, setCurrentStep] = useState<number>(presetDemo ? 4 : 1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [recommendationResult, setRecommendationResult] = useState<RecommendationResult | null>(null);

  const [foodProps, setFoodProps] = useState<FoodProperties>(mangoPreset.defaultFoodProps);
  const [storageProps, setStorageProps] = useState<StorageConditions>(mangoPreset.defaultStorageProps);
  const [requirements, setRequirements] = useState<PackagingRequirements>(mangoPreset.defaultRequirements);

  // Preload Demo Scenario (Alphonso Mango)
  const handleLoadDemo = () => {
    setFoodProps(mangoPreset.defaultFoodProps);
    setStorageProps(mangoPreset.defaultStorageProps);
    setRequirements(mangoPreset.defaultRequirements);
    setCurrentStep(4);
  };

  const handleGenerate = () => {
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    const result = runRecommendationEngine(foodProps, storageProps, requirements);
    setRecommendationResult(result);
    setIsAnalyzing(false);
  };

  const wizardSteps = [
    { num: 1, title: 'Commodity', icon: Sparkles },
    { num: 2, title: 'Properties', icon: Activity },
    { num: 3, title: 'Storage', icon: Truck },
    { num: 4, title: 'Priorities', icon: Sliders }
  ];

  if (isAnalyzing) {
    return <AnalysisScreen onComplete={handleAnalysisComplete} />;
  }

  if (recommendationResult) {
    return (
      <ResultView
        result={recommendationResult}
        onNewRecommendation={() => {
          setRecommendationResult(null);
          setCurrentStep(1);
        }}
        onViewTraceability={onViewTraceability}
        onSaveToHistory={onSaveToHistory}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Step Indicator Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between">
          {wizardSteps.map((step, idx) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            const Icon = step.icon;

            return (
              <React.Fragment key={step.num}>
                <div
                  onClick={() => isCompleted && setCurrentStep(step.num)}
                  className={`flex items-center space-x-2 cursor-pointer transition-all ${
                    isCurrent
                      ? 'text-emerald-700 font-bold'
                      : isCompleted
                      ? 'text-slate-900 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/20 ring-4 ring-emerald-100'
                        : isCompleted
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : step.num}
                  </div>
                  <span className="hidden sm:inline text-xs">{step.title}</span>
                </div>
                {idx < wizardSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 sm:mx-4 ${currentStep > idx + 1 ? 'bg-slate-900' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Views */}
      {currentStep === 1 && (
        <Step1Commodity
          foodProps={foodProps}
          setFoodProps={setFoodProps}
          setStorageProps={setStorageProps}
          setRequirements={setRequirements}
          onNext={() => setCurrentStep(2)}
          onLoadDemo={handleLoadDemo}
        />
      )}

      {currentStep === 2 && (
        <Step2Properties
          foodProps={foodProps}
          setFoodProps={setFoodProps}
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <Step3Storage
          storageProps={storageProps}
          setStorageProps={setStorageProps}
          onNext={() => setCurrentStep(4)}
          onBack={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 4 && (
        <Step4Priorities
          requirements={requirements}
          setRequirements={setRequirements}
          onGenerate={handleGenerate}
          onBack={() => setCurrentStep(3)}
        />
      )}
    </div>
  );
};
