"use client";

import React from "react";
import CurrencyResultCard from "./CurrencyResultCard";
import { TransformedProvider } from "@/utils/transformWiseApiResponse";

interface ResultsProps {
  results: TransformedProvider[];
  sourceCurrency: string;
  targetCurrency: string;
}

const CurrencyResults: React.FC<ResultsProps> = ({ results, sourceCurrency, targetCurrency }) => (
  <div className="space-y-6">
    <div className="grid gap-6 md:grid-cols-2">
      {results.map((provider, index) => (
        <CurrencyResultCard
          key={provider.name}
          provider={provider}
          isBest={index === 0}
          sourceCurrency={sourceCurrency}
          targetCurrency={targetCurrency}
        />
      ))}
    </div>
  </div>
);

export default CurrencyResults;
