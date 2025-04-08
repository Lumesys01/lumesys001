
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calculator, BarChart3, ArrowRight } from 'lucide-react';
import CurrencySelector, { Currency, currencies } from './CurrencySelector';

const ROICalculator: React.FC = () => {
  const [annualEnergyCost, setAnnualEnergyCost] = useState<number>(500000);
  const [facilitySize, setFacilitySize] = useState<number>(50000);
  const [systemComplexity, setSystemComplexity] = useState<number>(3);
  
  // Find ZAR in currencies array and set as default
  const zarCurrency = currencies.find(c => c.code === 'ZAR') || currencies[0];
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(zarCurrency);
  
  // Calculate estimated savings with updated base savings rate
  const calculateSavings = () => {
    // Base savings percentage based on facility complexity (adjusted to align with 15% industry benchmark)
    const baseSavingsRate = 0.11 + (systemComplexity * 0.01); // 12-16% savings range
    
    // Adjust by facility size factor (larger facilities tend to have more optimization potential)
    const sizeFactor = Math.min(1.3, Math.max(0.9, facilitySize / 100000 + 0.8));
    
    // Calculate potential annual savings in USD
    const annualSavingsUSD = annualEnergyCost * baseSavingsRate * sizeFactor;
    
    // Convert to selected currency
    const annualSavings = annualSavingsUSD * selectedCurrency.conversionRate;
    
    // Calculate 5-year savings
    const fiveYearSavings = annualSavings * 5;
    
    // Calculate average payback period (in months)
    const implementationCost = (facilitySize * 2) + (systemComplexity * 5000) + 10000;
    const paybackMonths = (implementationCost / annualSavings) * 12;
    
    // Calculate CO2 reduction (metric tons) - average commercial building: 7.5kg CO2 per sq.ft per year
    const co2ReductionAnnual = (7.5 * (facilitySize / 10.764)) * baseSavingsRate * 0.001;
    
    return {
      annualSavings: Math.round(annualSavings),
      fiveYearSavings: Math.round(fiveYearSavings),
      paybackMonths: Math.round(paybackMonths),
      co2ReductionAnnual: Math.round(co2ReductionAnnual)
    };
  };
  
  const results = calculateSavings();

  return (
    <section id="roi-calculator" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-light mb-4 text-black">
            Calculate Your <span className="gradient-text font-normal">Potential Savings</span>
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            See how Lumesys can generate significant ROI for your facility. Adjust the parameters below to get a customized estimate.
          </p>
          <div className="flex flex-col items-center mt-4">
            <CurrencySelector 
              selectedCurrency={selectedCurrency} 
              onChange={setSelectedCurrency}
              className="mt-2"
            />
            <p className="text-xs text-accent mt-2">
              We are committed to advancing the Just Energy Transition
            </p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8">
            {/* Calculator Input Side */}
            <div className="md:col-span-6 p-6 neo-card">
              <h3 className="text-xl font-medium mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-accent" /> 
                Input Your Facility Details
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="annual-cost" className="block text-sm font-medium text-black/70">
                    Annual Energy Cost ({selectedCurrency.symbol})
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="annual-cost"
                      type="number"
                      min="50000"
                      max="10000000"
                      value={annualEnergyCost}
                      onChange={(e) => setAnnualEnergyCost(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs text-black/60">{selectedCurrency.symbol}50K-{selectedCurrency.symbol}10M</span>
                  </div>
                  <Slider
                    value={[annualEnergyCost]}
                    min={50000}
                    max={10000000}
                    step={10000}
                    onValueChange={(value) => setAnnualEnergyCost(value[0])}
                    className="mt-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="facility-size" className="block text-sm font-medium text-black/70">
                    Facility Size (Square Feet)
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="facility-size"
                      type="number"
                      min="10000"
                      max="1000000"
                      value={facilitySize}
                      onChange={(e) => setFacilitySize(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs text-black/60">10K-1M sq.ft</span>
                  </div>
                  <Slider
                    value={[facilitySize]}
                    min={10000}
                    max={1000000}
                    step={5000}
                    onValueChange={(value) => setFacilitySize(value[0])}
                    className="mt-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black/70">
                    System Complexity
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-black/60">Simple</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setSystemComplexity(value)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            systemComplexity === value 
                              ? 'bg-accent text-white' 
                              : 'border border-gray-200 text-gray-500'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-black/60">Complex</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results Side */}
            <div className="md:col-span-6 p-6 neo-card bg-gradient-to-br from-accent/5 to-highlight/5">
              <h3 className="text-xl font-medium mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                Your Potential Savings
              </h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-white/80 rounded-lg border border-gray-100">
                  <span className="text-sm font-medium text-black/70">Annual Savings</span>
                  <span className="text-2xl font-bold text-accent">
                    {selectedCurrency.symbol}{results.annualSavings.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-white/80 rounded-lg border border-gray-100">
                  <span className="text-sm font-medium text-black/70">5-Year Savings</span>
                  <span className="text-2xl font-bold text-highlight">
                    {selectedCurrency.symbol}{results.fiveYearSavings.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-white/80 rounded-lg border border-gray-100">
                  <span className="text-sm font-medium text-black/70">Payback Period</span>
                  <span className="text-2xl font-bold text-primary">
                    {results.paybackMonths} months
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-white/80 rounded-lg border border-gray-100">
                  <span className="text-sm font-medium text-black/70">Annual CO2 Reduction</span>
                  <span className="text-2xl font-bold text-green-600">
                    {results.co2ReductionAnnual} tons
                  </span>
                </div>
                
                <Button className="w-full mt-4 glow-button font-medium py-6">
                  Get Your Detailed Savings Report <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-black/60">
            <p>Note: This calculator provides estimates based on industry averages and typical implementation costs.</p>
            <p>Contact us for a detailed analysis specific to your facility.</p>
            <p className="mt-2">Response time: Within 24 hours during business days.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
