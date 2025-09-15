export interface TransformedProvider {
  name: string;
  totalFees: number;
  exchangeRate: number;
  receivedAmount: number;
  estimatedArrivalTime: string;
}

// Format delivery duration safely
const formatDeliveryTime = (duration: any): string => {
  if (!duration) return "Unknown";

  const { min, max, unit } = duration;

  // Case 1: numeric min/max with unit
  if (typeof min === "number" && typeof max === "number" && unit) {
    if (min === max) return `${min} ${unit}${min > 1 ? "s" : ""}`;
    return `${min}-${max} ${unit}s`;
  }

  // Case 2: ISO 8601 strings like "PT48H" or "PT30M"
  const parseISODuration = (iso: string) => {
    if (!iso || iso === "PT0S") return "Less than an hour";

    const hoursMatch = iso.match(/PT(\d+)H/);
    if (hoursMatch) return `${hoursMatch[1]} hour${parseInt(hoursMatch[1]) > 1 ? "s" : ""}`;

    const minsMatch = iso.match(/PT(\d+)M/);
    if (minsMatch) return `${minsMatch[1]} minute${parseInt(minsMatch[1]) > 1 ? "s" : ""}`;

    return iso; // fallback
  };

  if (typeof min === "string" && typeof max === "string") {
    if (min === max) return parseISODuration(min);
    return `${parseISODuration(min)} - ${parseISODuration(max)}`;
  }

  return "Unknown";
};


export const transformWiseApiResponse = (apiData: any): TransformedProvider[] => {
  if (!apiData || !Array.isArray(apiData.providers)) return [];

  const results: TransformedProvider[] = [];

  apiData.providers.forEach((provider: any) => {
    if (!provider.quotes || provider.quotes.length === 0) return;

    // Find the best quote (highest receivedAmount)
    const bestQuote = provider.quotes.reduce((best: any, current: any) => {
      if (!best || (current.receivedAmount ?? 0) > (best.receivedAmount ?? 0)) return current;
      return best;
    }, null);

    if (!bestQuote || !bestQuote.receivedAmount) return;

    // Format delivery estimation
    const estimatedArrivalTime = formatDeliveryTime(bestQuote.deliveryEstimation?.duration);

    results.push({
      name: provider.name || provider.alias || "Unknown Provider",
      totalFees: (bestQuote.fee ?? 0) + (bestQuote.markup ?? 0),
      exchangeRate: bestQuote.rate ?? bestQuote.rated ?? 0,
      receivedAmount: bestQuote.receivedAmount ?? 0,
      estimatedArrivalTime,
    });
  });

  // Sort by receivedAmount descending
  return results.sort((a, b) => b.receivedAmount - a.receivedAmount);
};
