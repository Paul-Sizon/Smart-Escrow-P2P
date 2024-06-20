// app/api/ethPrice.ts
export const dynamic = "force-dynamic";

export async function GET() {
  const url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

  try {
    const apiResponse = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "x-cg-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY || '',
        },
    });
    const data = await apiResponse.json();
    if (apiResponse.ok) {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "Failed to fetch data" }), {
        status: apiResponse.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
