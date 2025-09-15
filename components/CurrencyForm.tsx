"use client";

import React from "react";
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
    <div className="bg-violet-100 rounded-3xl shadow-lg p-6 md:p-8 mb-8">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-end">
        {/* Amount */}
        <div className="col-span-1 md:col-span-2">
          <TextField
            fullWidth
            label="Amount"
            type="text"
            value={sourceAmount}
            onChange={(e) => setSourceAmount(e.target.value)}
            InputLabelProps={{ sx: { fontSize: "1.3rem", color: "slate-700",  } }}
            sx={{
              "& .MuiInputBase-input": { fontSize: "1.25rem", padding: "14px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: "#f5f5f5",
                "&:hover": { backgroundColor: "#eaeaea" },
                "&.Mui-focused": { backgroundColor: "#fff" },
              },
            }}
          />
        </div>

        {/* From Currency */}
        <TextField
          select
          label="From"
          value={sourceCurrency}
          onChange={(e) => setSourceCurrency(e.target.value)}
          InputLabelProps={{ sx: { fontSize: "1.3rem", color: "slate-700", } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              backgroundColor: "#f5f5f5",
              "&:hover": { backgroundColor: "#eaeaea" },
              "&.Mui-focused": { backgroundColor: "#fff" },
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
              bgcolor: "#f0f0f0",
              color: "#555",
              "&:hover": { bgcolor: "#e0e0e0", transform: "scale(1.05)" },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <SwapHoriz />
          </Fab>
        </div>

        {/* To Currency */}
        <TextField
          select
          label="To"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          InputLabelProps={{ sx: { fontSize: "1.3rem", color: "slate-700", } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              backgroundColor: "#f5f5f5",
              "&:hover": { backgroundColor: "#eaeaea" },
              "&.Mui-focused": { backgroundColor: "#fff" },
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
            background: "linear-gradient(135deg, #6b5bff, #c084fc)",
            color: "#fff",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(135deg, #5a4bff, #b373f8)",
            },
          }}
        >
          {isLoading ? "Comparing..." : "Compare"}
        </Button>
      </div>
    </div>
  );
};

export default CurrencyForm;
