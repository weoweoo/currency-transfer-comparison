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

const CurrencyResultCard: React.FC<CardProps> = ({ provider, isBest, sourceCurrency, targetCurrency }) => (
  <Card 
  className={`relative p-2 ${
    isBest
      ? "border-3 border-green-400 bg-green-200"
      : "bg-gray-100"
  }`}>
    {isBest && <Chip icon={<Star />} label="BEST DEAL" color="success" className="absolute top-4 right-4" />}
    <CardContent>
      <Typography 
      variant="h5"
      sx={{ fontWeight: "bold" }} 
      className="font-extrabold  mb-4 pb-2"
      >
        {provider.name}
      </Typography>

      <div className="border-2 border-gray-500 rounded-lg p-4 mb-4">
        <Typography variant="body2" className="text-gray-700">Recipient gets</Typography>
        <Typography variant="h4" className="font-bold text-blue-400">
          {targetCurrency} {provider.receivedAmount.toFixed(2)}
        </Typography>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Typography variant="body2" className="font-medium">Total Fees</Typography>
          <Typography variant="h6" className="font-semibold">{sourceCurrency} {provider.totalFees.toFixed(2)}</Typography>
        </div>
        <div>
          <Typography variant="body2" className="font-medium">Exchange Rate</Typography>
          <Typography variant="h6" className="font-semibold">{provider.exchangeRate.toFixed(4)}</Typography>
        </div>
      </div>

      <div className="flex items-center gap-1 text-gray-500">
        <AccessTimeIcon fontSize="inherit" />
        <Typography variant="overline">
          Arrives in: <span className="font-medium">{provider.estimatedArrivalTime}</span>
        </Typography>
      </div>
    </CardContent>
  </Card>
);

export default CurrencyResultCard;
