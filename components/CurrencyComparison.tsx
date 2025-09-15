"use client";

import React, { useState, useEffect } from "react";
import CurrencyForm from "./CurrencyForm";
import CurrencyResults from "./results";
import { transformWiseApiResponse, TransformedProvider } from "@/utils/transformWiseApiResponse";
import { CompareArrows } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const CurrencyComparison = () => {
  const [sourceAmount, setSourceAmount] = useState("1000");
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [results, setResults] = useState<TransformedProvider[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (hasSearched) {
      setResults([]);
      setHasSearched(false);
      setError("");
    }
  }, [sourceAmount, sourceCurrency, targetCurrency]);

  const fetchComparison = async () => {
    if (!/^\d*\.?\d+$/.test(sourceAmount)) {
      setError("Input valid amount");
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError("");

    console.log("Fetching comparison with:", {
      sourceAmount,
      sourceCurrency,
      targetCurrency,
    });

    try {
      const res = await fetch(
        `/api?sourceCurrency=${sourceCurrency}&targetCurrency=${targetCurrency}&sendAmount=${sourceAmount}`
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log("Received data:", data);
      if (data.error) throw new Error(data.error);

      setResults(transformWiseApiResponse(data));
      setHasSearched(true);
    } catch {
      setError("Try a different currency.");
      setResults([]);
      setHasSearched(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <CompareArrows sx={{ fontSize: 52, color: "white" }} />
          </div>
          <h1 className="text-4xl font-bold mb-2">Currency Transfer Comparison</h1>
        </div>

        {/* Form */}
        <CurrencyForm
          sourceAmount={sourceAmount}
          setSourceAmount={setSourceAmount}
          sourceCurrency={sourceCurrency}
          setSourceCurrency={setSourceCurrency}
          targetCurrency={targetCurrency}
          setTargetCurrency={setTargetCurrency}
          onSubmit={fetchComparison}
          isLoading={isLoading}
        />

        {/* Error */}
        {error && (
          <div className="bg-red-800 text-white p-3 rounded-md my-4 text-center">
            {error}
          </div>
        )}

        {/* Loader */}
        {isLoading && (
          <div className="text-center py-6">
            <CircularProgress size={40} />
            <p className="text-gray-200 mt-2">Fetching latest rates...</p>
          </div>
        )}

        {/* Results */}
        {!isLoading && hasSearched && results.length > 0 && (
          <CurrencyResults
            results={results}
            sourceCurrency={sourceCurrency}
            targetCurrency={targetCurrency}
          />
        )}

        {/* No results */}
        {!isLoading && hasSearched && results.length === 0 && !error && (
          <div className="text-center py-12 text-gray-200">
            <p>No comparison data available for this currency pair.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyComparison;
