
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Euro, Banknote } from 'lucide-react';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  conversionRate: number; // Conversion rate from USD
  icon: React.ReactNode;
}

export const currencies: Currency[] = [
  { 
    code: 'USD', 
    symbol: '$', 
    name: 'US Dollar', 
    conversionRate: 1, 
    icon: <DollarSign className="h-3.5 w-3.5" /> 
  },
  { 
    code: 'EUR', 
    symbol: '€', 
    name: 'Euro', 
    conversionRate: 0.92, 
    icon: <Euro className="h-3.5 w-3.5" /> 
  },
  { 
    code: 'ZAR', 
    symbol: 'R', 
    name: 'South African Rand', 
    conversionRate: 18.5, 
    icon: <Banknote className="h-3.5 w-3.5" /> 
  },
  { 
    code: 'JPY', 
    symbol: '¥', 
    name: 'Japanese Yen', 
    conversionRate: 150.2, 
    icon: <Banknote className="h-3.5 w-3.5" /> 
  },
  { 
    code: 'GBP', 
    symbol: '£', 
    name: 'British Pound', 
    conversionRate: 0.79, 
    icon: <Banknote className="h-3.5 w-3.5" /> 
  },
];

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onChange: (currency: Currency) => void;
  className?: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ 
  selectedCurrency, 
  onChange,
  className 
}) => {
  return (
    <div className={`flex items-center ${className || ''}`}>
      <Select
        value={selectedCurrency.code}
        onValueChange={(value) => {
          const selected = currencies.find(c => c.code === value);
          if (selected) onChange(selected);
        }}
      >
        <SelectTrigger className="w-[110px] h-8 text-xs bg-white/10 border-none focus:ring-1 focus:ring-accent/40">
          <SelectValue placeholder="Select Currency">
            <div className="flex items-center gap-1.5">
              {selectedCurrency.icon}
              <span>{selectedCurrency.code}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {currencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code} className="cursor-pointer">
              <div className="flex items-center gap-2">
                {currency.icon}
                <span>{currency.name} ({currency.symbol})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
