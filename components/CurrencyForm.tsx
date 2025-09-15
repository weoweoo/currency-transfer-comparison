"use client";

import React, { useState } from "react";
import { TextField, MenuItem, Button, Fab } from "@mui/material";
import { Search, SwapHoriz } from "@mui/icons-material";
import currencies from "@/utils/currencies";

interface FormProps {
  sourceAmount: string;
  setSourceAmount: (val: string) => void;
  sourceCurrency: string;
  setSourceCurrency: (val: string) => void;
  targetCurrency: string;
  setTargetCurrency: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const CurrencyForm: React.FC<FormProps> = ({
  sourceAmount,
  setSourceAmount,
  sourceCurrency,
  setSourceCurrency,
  targetCurrency,
  setTargetCurrency,
  onSubmit,
  isLoading,
}) => {
  const swapCurrencies = () => {
    const temp = sourceCurrency;
    setSourceCurrency(targetCurrency);
    setTargetCurrency(temp);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-3xl shadow-2xl p-6 md:p-8 mb-8 border border-slate-600/20">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-end">
        {/* Amount */}
        <div className="col-span-1 md:col-span-2">
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={sourceAmount}
            onChange={(e) => {
              const value = e.target.value;
              // Allow empty string, numbers, and decimal point
              if (value === '' || /^\d*\.?\d*$/.test(value)) {
                setSourceAmount(value);
              }
            }}
            inputProps={{
              step: "any",
              min: "0",
              inputMode: "decimal"
            }}
            InputLabelProps={{ 
              sx: { 
                fontSize: "1.3rem", 
                color: "#e2e8f0",
                "&.Mui-focused": { color: "#6366f1" }
              } 
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                color: "#f1f5f9",
                "& fieldset": {
                  borderColor: "rgba(148, 163, 184, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(148, 163, 184, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6366f1",
                },
              },
            }}
          />
        </div>

        {/* From Currency */}
        <TextField
          select
          label="From"
          value={sourceCurrency || ""}
          onChange={(e) => setSourceCurrency(e.target.value)}
          InputLabelProps={{ 
            sx: { 
              fontSize: "1.3rem", 
              color: "#e2e8f0",
              "&.Mui-focused": { color: "#6366f1" }
            } 
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(30, 41, 59, 0.8)",
              color: "#f1f5f9",
              "& fieldset": {
                borderColor: "rgba(148, 163, 184, 0.3)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(148, 163, 184, 0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6366f1",
              },
            },
          }}
        >
          {currencies.map((c) => (
            <MenuItem key={c.code} value={c.code}>
              {c.code}
            </MenuItem>
          ))}
        </TextField>

        {/* Swap Button */}
        <div className="flex justify-center col-span-1">
          <Fab
            size="medium"
            onClick={swapCurrencies}
            sx={{
              bgcolor: "rgba(59, 130, 246, 0.9)",
              color: "#fff",
              "&:hover": { 
                bgcolor: "rgba(37, 99, 235, 1)", 
                transform: "scale(1.05)",
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
              },
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.2)",
            }}
          >
            <SwapHoriz />
          </Fab>
        </div>

        {/* To Currency */}
        <TextField
          select
          label="To"
          value={targetCurrency || ""}
          onChange={(e) => setTargetCurrency(e.target.value)}
          InputLabelProps={{ 
            sx: { 
              fontSize: "1.3rem", 
              color: "#e2e8f0",
              "&.Mui-focused": { color: "#6366f1" }
            } 
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(30, 41, 59, 0.8)",
              color: "#f1f5f9",
              "& fieldset": {
                borderColor: "rgba(148, 163, 184, 0.3)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(148, 163, 184, 0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6366f1",
              },
            },
          }}
        >
          {currencies.map((c) => (
            <MenuItem key={c.code} value={c.code}>
              {c.code}
            </MenuItem>
          ))}
        </TextField>

        {/* Compare Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={onSubmit}
          disabled={isLoading}
          startIcon={<Search />}
          sx={{
            height: 56,
            fontSize: "1.15rem",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
            color: "#fff",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #2563eb, #7c3aed, #db2777)",
              boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              background: "rgba(148, 163, 184, 0.5)",
              color: "rgba(248, 250, 252, 0.5)",
            },
            transition: "all 0.3s ease-in-out",
          }}
        >
          {isLoading ? "Comparing..." : "Compare"}
        </Button>
      </div>
    </div>
  );
};

export default CurrencyForm;