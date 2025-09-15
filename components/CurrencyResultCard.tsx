"use client";

import React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";
import { Star } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TransformedProvider } from "@/utils/transformWiseApiResponse";

interface CardProps {
  provider: TransformedProvider;
  isBest: boolean;
  sourceCurrency: string;
  targetCurrency: string;
}

const CurrencyResultCard: React.FC<CardProps> = ({
  provider,
  isBest,
  sourceCurrency,
  targetCurrency,
}) => (
  <Card
    className="relative rounded-2xl shadow-xl overflow-hidden"
    sx={{
      background: isBest
        ? "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))"
        : "rgba(30,41,59,0.9)", 
      border: isBest
        ? "1px solid rgba(34,197,94,0.6)"
        : "1px solid rgba(148,163,184,0.2)",
      transition: "all 0.25s ease-in-out",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
      },
    }}
  >
    {isBest && (
      <Chip
        icon={<Star />}
        label="BEST DEAL"
        className="absolute top-4 right-4"
        sx={{
          bgcolor: "#22c55e",
          color: "#fff",
          fontWeight: 600,
          boxShadow: "0 4px 12px rgba(34,197,94,0.4)",
        }}
      />
    )}

    <CardContent>
      {/* Provider name */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 3, color: "#f1f5f9" }}
      >
        {provider.name}
      </Typography>

      {/* Recipient gets */}
      <div
        className="rounded-xl p-4 mb-5"
        style={{
          backgroundColor: "rgba(51,65,85,0.7)",
          border: "1px solid rgba(148,163,184,0.2)",
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "#cbd5e1", marginBottom: "4px" }}
        >
          Recipient gets
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#38bdf8" }} 
        >
          {targetCurrency} {provider.receivedAmount.toFixed(2)}
        </Typography>
      </div>

      {/* Fees & Rate */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        <div>
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
            Total Fees
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "#f1f5f9" }}
          >
            {sourceCurrency} {provider.totalFees.toFixed(2)}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
            Exchange Rate
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "#f1f5f9" }}
          >
            {provider.exchangeRate.toFixed(4)}
          </Typography>
        </div>
      </div>

      {/* Arrival time */}
      <div className="flex items-center gap-2 text-slate-400">
        <AccessTimeIcon sx={{ fontSize: 18 }} />
        <Typography variant="body2">
          Arrives in:{" "}
          <span className="text-slate-200 font-medium">
            {provider.estimatedArrivalTime}
          </span>
        </Typography>
      </div>
    </CardContent>
  </Card>
);

export default CurrencyResultCard;
