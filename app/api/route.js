import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sourceCurrency = searchParams.get("sourceCurrency");
  const targetCurrency = searchParams.get("targetCurrency");
  const sendAmount = searchParams.get("sendAmount");

  try {
    const response = await fetch(
      `https://api.wise.com/v4/comparisons/?sourceCurrency=${sourceCurrency}&targetCurrency=${targetCurrency}&sendAmount=${sendAmount}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.WISE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Wise API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data); 
  } catch (error) {
    console.error("Wise API Error:", error);
    return NextResponse.json({ error: "Failed to fetch comparison data" }, { status: 500 });
  }
}
